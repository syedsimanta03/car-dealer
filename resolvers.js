const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  /**
  |--------------------------------------------------
  | QUERIES
  |--------------------------------------------------
  */

  Query: {
    /* GET ALL CARS */
    getAllCars: async (root, args, { Car }) => {
      const allCars = await Car.find().sort({ createdDate: 'desc' });
      return allCars;
    },
    /* GET A CAR */
    getCar: async (root, { _id }, { Car }) => {
      const car = await Car.findOne({ _id }).populate({
        path: 'owner',
        model: 'User'
      });
      return car;
    },

    /* SEARCH CAR */
    searchCars: async (root, { searchTerm }, { Car }) => {
      // If searchTerm matches Car(s) return it/them
      if (searchTerm) {
        const searchResults = await Car.find(
          {
            $text: { $search: searchTerm }
          },
          {
            score: { $meta: 'textScore' }
          }
        ).sort({
          score: { $meta: 'textScore' }
        });
        return searchResults;
        // When searchTerm doesn't match show all Cars
      } else {
        const Cars = await Car.find().sort({
          likes: 'desc',
          createdDate: 'desc'
        });
        return Cars;
      }
    },
    /* GET USER Cars -> but this just not returns username but 
      all cars by a specific user as it described by Scehma 
      getUserCars(username: String!): [Car] v
    */
    getUserCars: async (root, { username }, { Car }) => {
      const userCars = await Car.find({ username }).sort({
        createdDate: 'desc'
      });

      return userCars;
    },

    /*  GET ALL USERS with Ref field  */
    getCurrentUser: async (root, args, { currentUser, User }) => {
      // If no currentuser return null
      if (!currentUser) {
        return null;
      }
      // Otherwise,  find currentUser
      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path: 'favorites',
        model: 'Car'
      });

      return user;
    }
  },

  /**
  |--------------------------------------------------
  | MUTATIONS
  |--------------------------------------------------
  */

  Mutation: {
    /* Add a Car */
    addCar: async (
      root,
      {
        name,
        price,
        imageUrl,
        description,
        features,
        category,
        likes,
        mileages,
        rating,
        username
      },
      { Car }
    ) => {
      const newCar = await new Car({
        name,
        price,
        imageUrl,
        description,
        features,
        category,
        likes,
        mileages,
        rating,
        username
      }).save();

      return newCar;
    },

    /* Update specific user Car */
    updateUserCar: async (
      root,
      {
        _id,
        name,
        price,
        imageUrl,
        description,
        features,
        category,
        mileages,
        rating
      },
      { Car }
    ) => {
      const updatedCar = await Car.findOneAndUpdate(
        { _id },
        {
          $set: {
            name,
            price,
            imageUrl,
            description,
            features,
            category,
            mileages,
            rating
          }
        },
        { new: true }
      );
      return updatedCar;
    },

    /* SignIN User */
    signinUser: async (root, { username, password }, { User }) => {
      // 1)check if user exists
      const user = await User.findOne({
        username
      });

      // 2)if no user found thow error
      if (!user) {
        throw new Error('User not found');
      }
      // 3)Otherwise, compare user DB saved password with user just typed password
      const isValidPassword = await bcrypt.compare(password, user.password);

      // 4) if invalid user thow error
      if (!isValidPassword) {
        throw new Error('Invalid Password');
      }
      // 5) Otherwise, give this user a token and authorization
      return {
        token: createToken(user, process.env.SECRET, '365d')
      };
    },

    /*  SignUP User */
    signupUser: async (root, { username, email, password }, { User }) => {
      // 1)check if user already exists
      const user = await User.findOne({
        username
      });
      // 2)if already exists thow error
      if (user) {
        throw new Error('User already exists');
      }
      // 3)Otherwise, If not create a fresh unique user
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      // 4) finally, give this user a token and authorization
      return {
        token: createToken(newUser, 'process.env.SECRET', '1hr')
      };
    },

    /* DELETE SPPECIFIC USER'S Car */
    deleteUserCar: async (root, { _id }, { Car }) => {
      const car = await Car.findOneAndRemove({ _id });
      return car;
    },

    /* LOGGEDIN USER CAN LIKE ANY Car */
    likeCar: async (root, { _id, username }, { Car, User }) => {
      // Increase Car's like number
      const car = await Car.findOneAndUpdate({ _id }, { $inc: { likes: 1 } });

      // User -> addToSet will add that above liked car to favorites array list
      const user = await User.findOneAndUpdate(
        { username },
        { $addToSet: { favorites: _id } }
      );

      return car;
    },
    /* LOGGEDIN USER CAN UNLIKE ANY Car */
    unlikeCar: async (root, { _id, username }, { Car, User }) => {
      // Decrease Car's like number
      const car = await Car.findOneAndUpdate({ _id }, { $inc: { likes: -1 } });

      // User -> $pull will remove that above unliked car from favorites array list
      const user = await User.findOneAndUpdate(
        { username },
        { $pull: { favorites: _id } }
      );

      return car;
    }
  }
};
