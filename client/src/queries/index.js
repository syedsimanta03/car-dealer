import { gql } from 'apollo-boost';

/**
|--------------------------------------------------
| QUERIES
|--------------------------------------------------
*/

/* Car Queries */
export const GET_ALL_CARS = gql`
  query {
    getAllCars {
      _id
      name
      price
      imageUrl
      category
      description
      features
      likes
      username
      mileages
      rating
    }
  }
`;
export const GET_CAR = gql`
  query($_id: ID!) {
    getCar(_id: $_id) {
      _id
      name
      price
      imageUrl
      category
      description
      features
      likes
      username
      mileages
      rating
    }
  }
`;

/* User Queries */
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
      favorites {
        _id
        name
        price
        imageUrl
        category
        description
        features
        likes
        mileages
        rating
      }
    }
  }
`;

/* Get User Car */
export const GET_USER_CARS = gql`
  query($username: String!) {
    getUserCars(username: $username) {
      _id
      name
      price
      imageUrl
      category
      description
      features
      likes
      username
      mileages
      rating
    }
  }
`;

export const SEARCH_CARS = gql`
  query($searchTerm: String) {
    searchCars(searchTerm: $searchTerm) {
      _id
      name
      price
      imageUrl
      category
      description
      features
      likes
      username
      mileages
      rating
    }
  }
`;
/**
|--------------------------------------------------
| MUTATIONS
|--------------------------------------------------
*/

/* Car mutations */
// Add a car
export const ADD_CAR = gql`
  mutation(
    $name: String!
    $price: Int!
    $imageUrl: String!
    $category: String!
    $description: String!
    $features: String!
    $likes: Int
    $mileages: String
    $rating: Int
    $username: String
  ) {
    addCar(
      name: $name
      price: $price
      imageUrl: $imageUrl
      category: $category
      description: $description
      features: $features
      likes: $likes
      mileages: $mileages
      rating: $rating
      username: $username
    ) {
      name
      price
      imageUrl
      category
      description
      features
      likes
      username
      mileages
      rating
    }
  }
`;
/* User Mutations */
export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

//  Like car by any user
export const LIKE_CAR = gql`
  mutation($_id: ID!, $username: String!) {
    likeCar(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

//  Unlike car by any user
export const UNLIKE_CAR = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeCar(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

// Update specific user's car
export const UPDATE_USER_CAR = gql`
  mutation(
    $_id: ID!
    $name: String!
    $price: Int!
    $imageUrl: String!
    $category: String!
    $description: String!
    $features: String!
    $mileages: String
    $rating: Int
  ) {
    updateUserCar(
      _id: $_id
      name: $name
      price: $price
      imageUrl: $imageUrl
      category: $category
      description: $description
      features: $features
      mileages: $mileages
      rating: $rating
    ) {
      _id
      name
      price
      imageUrl
      category
      description
      features
      likes
      username
      mileages
      rating
    }
  }
`;

// Delete specific user's car
export const DELETE_USER_CAR = gql`
  mutation($_id: ID!) {
    deleteUserCar(_id: $_id) {
      _id
    }
  }
`;
