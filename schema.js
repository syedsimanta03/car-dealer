exports.typeDefs = `

  type Car {
    _id: ID
    name: String!
    price: Int!
    imageUrl: String!
    category: String!
    description: String!
    features: String!
    createdDate: String
    likes: Int
    username: String
    mileages: String
    rating: Int
    owner: User
  }

  type User {
    _id: ID
    username: String! @unique
    password: String!
    userImage: String
    email: String! @unique
    joinDate: String
    favorites: [Car]
  }

  type Query {

    getAllCars: [Car]
    getCar(_id: ID!): Car
    searchCars(searchTerm: String): [Car]
    
    getCurrentUser: User
    getUserCars(username: String!): [Car]

  }

  type Token {
    token: String!
  }

  type Mutation {

    addCar(
    name: String!,
    price: Int!,
    imageUrl: String!,
    category: String!,
    description: String!,
    features: String!,
    likes: Int,
    mileages: String,
    rating: Int,
    username: String
    ): Car

    deleteUserCar(_id: ID): Car
    
    updateUserCar(
    _id: ID!,
    name: String!,
    price: Int!,
    imageUrl: String!,
    category: String!,
    description: String!,
    features: String!,
    mileages: String,
    rating: Int
    ): Car

    likeCar(_id: ID!, username: String!): Car
    unlikeCar(_id: ID!, username: String!): Car

    signinUser(username: String!, password: String!): Token

    signupUser(username: String!, email: String!, password: String!): Token

  }


`;
