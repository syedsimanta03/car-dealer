import React from 'react'
import { Link } from 'react-router-dom';
import { Icon, Badge, Tag } from 'antd';

// props from userInfo.js
const UserCars = ({session}) => {
 const { username, favorites } = session.getCurrentUser;
  return (
    <div className='container-fluid'>
      <h3 className='text-center text-uppercase aqua-gradient p-3 mb-5'>
        {username}'s Favorites
      </h3>
      <div className='row'>
        {favorites.map(favorite => (
          <div
            key={favorite._id}
            className='col-lg-4 col-md-12 col-sm-12 mb-5'
          >
            <div className='card card-cascade narrower mx-4'>
              {/* Card image */}
              <div className='view view-cascade overlay'>
                <img
                  className='card-img-top img-shadow'
                  src={favorite.imageUrl}
                  alt='Card image cap'
                  height='300'
                />
                <a>
                  <div className='mask rgba-white-slight' />
                </a>
              </div>
              <a className='btn-floating btn-action ml-auto mr-4'>
                <Badge
                  title='Likes'
                  text='Likes'
                  count={favorite.likes}
                  style={{ backgroundColor: '#52c41a' }}
                />
              </a>
              {/* Card content */}
              <div className='card-body card-body-cascade'>
                {/* Label */}
                <h5 className='pink-text pt-1 d-flex justify-content-start'>
                  <Icon
                    type='safety-certificate'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                  <p className='ml-2'>{favorite.category}</p>
                </h5>
                {/* Title */}
                <h4 className='font-weight-bold card-title'>{favorite.name}</h4>
                <Tag className='p-1 mb-4' color='blue'>
                  ${favorite.price}
                </Tag>
                {/* Text */}
                <p className='card-text text-truncate'>
                  {favorite.description}
                </p>
                {/* Button */}
                <Link to={`/cars/${favorite._id}`}>
                  <button
                    type='button'
                    className='btn btn-outline-info btn-rounded waves-effect shadow-none'
                  >
                    Detail
                  </button>
                </Link>
              </div>
            </div>
          </div>
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
