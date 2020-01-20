import React from 'react';
import Header from './components/Header/Header';
import Services from './components/Services/Services';
import Subscribe from './components/Subscribe/Subscribe';
import Map from './components/Map/Map';
// Apollo Query
import { Query } from 'react-apollo';
import { GET_ALL_CARS } from './queries';
import CarItem from './components/Car/CarItem';
import Spinner from './components/Spinner';
import OurFeature from './components/Ourfeature/OurFeature';

const App = () => {
  return (
    <div>
      <Header />
      <Services />
      <div>
        <h3 className='display-4 text-center text-light myy'>
          Get Your Dream <strong>Car</strong>
        </h3>

        <Query query={GET_ALL_CARS}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return <div>Error</div>;
            return (
              <div className='row m-5'>
                {data.getAllCars.map(car => (
                  <CarItem key={car._id} {...car} />
                ))}
              </div>
            );
          }}
        </Query>
      </div>
      <OurFeature/>
      <Subscribe />
      <Map />
    </div>
  );
};

export default App;
