import React from 'react'
import CarItem from '../Car/CarItem';

// props from userInfo.js
const UserCars = ({session}) => {
 const { username, favorites } = session.getCurrentUser;
  return (
    <div className='container-fluid'>
      <h3 className='text-center text-white text-uppercase aqua-gradient p-3 mb-5'>
        {username}'s Favorites
      </h3>
      <div className='row'>
        {favorites.map(favorite => (
          <CarItem key={favorite._id} {...favorite} />
        ))}
      </div>

      {!favorites.length && (
        <strong className='text-center'>
          You have no favorites currently. Go add some!
        </strong>
      )}
    </div>
  );
};

export default UserCars
