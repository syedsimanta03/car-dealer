import React, { Component } from 'react';
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

class App extends Component {
  state = {
    visible: 3
  };
  // Load more cards
  loadMore = () => {
    this.setState(prev => {
      return { visible: prev.visible + 3 };
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Services />
        <div>
          <h2 className='text-center text-gray myy'>
            Get Your Dream Car
          </h2>

          <Query query={GET_ALL_CARS}>
            {({ data, loading, error }) => {
              if (loading) return <Spinner />;
              if (error) return <div>Error</div>;
              return (
                <div className='row m-5'>
                  {data.getAllCars.slice(0, this.state.visible).map(car => (
                    <CarItem key={car._id} {...car} />
                  ))}
          {this.state.visible < data.getAllCars.length && (
            <button
              onClick={this.loadMore}
              type='button'
              className='btn btn-info mx-auto mt-5'
            >
              Load more
            </button>
          )}
                </div>
              );
            }}
          </Query>
        </div>
        <OurFeature />
        <Subscribe />
        <Map />
      </div>
    );
  }
}

export default App;
