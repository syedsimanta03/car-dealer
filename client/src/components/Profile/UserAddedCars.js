import React from 'react';
// Apollo Query
import { Query } from 'react-apollo';
import { GET_USER_CARS } from '../../queries';
import CarItem from '../Car/CarItem';
import Spinner from '../Spinner';

const UserAddedCars = () => {
  return (
    <div>
      <div>
        <h3 className='display-4 text-center text-light myy'>
          Working on <strong>Cars</strong>
        </h3>

        <Query query={GET_USER_CARS}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return <div>Error</div>;
            return (
              <div className='row m-5'>
                {data.getUserCars.map(car => (
                  <CarItem key={car._id} {...car} />
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    </div>
  );
};

export default UserAddedCars;
