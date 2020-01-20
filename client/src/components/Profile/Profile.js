import React from 'react';
import UserInfo from './UserInfo';
import UserCars from './UserCars';
import withAuth from '../withAuth';
import UserAddedCars from './UserAddedCars';

// session is coming from index.js props
const Profile = ({ session }) => {
  //console.log(session);

  return (
    <div>
      <UserInfo session={session} />
      <UserCars session={session} />
      <UserAddedCars username={session.getCurrentUser.username} />
    </div>
  );
};

export default withAuth(session => session && session.getCurrentUser)(Profile);
