import React, { Component } from 'react';

import { ApolloConsumer } from 'react-apollo';
import { SEARCH_CARS } from '../../queries';
import CarItem from '../Car/CarItem';


class Search extends Component {
  state = {
    searchResults: []
  };

  handleChange = ({ searchCars }) => {
    this.setState({
      searchResults: searchCars
    });
  };

  render() {
    const { searchResults } = this.state;
    return (
      <ApolloConsumer>
        {client => {
          return (
            <React.Fragment>
              <div className='col-md-5 my-5 mx-auto'>
                {/*Card*/}
                <div className='card'>
                  {/*Card content*/}
                  <div className='card-body'>
                    <form className='d-flex justify-content-center'>
                      {/* Default input */}
                      <input
                        type='search'
                        name='search'
                        placeholder='Search your car ex: audi'
                        aria-label='Search'
                        className='form-control'
                        onChange={async event => {
                          event.persist();
                          // Perform query
                          const { data } = await client.query({
                            query: SEARCH_CARS,
                            variables: { searchTerm: event.target.value }
                          });
                          this.handleChange(data);
                        }}
                      />
                    </form>
                  </div>
                </div>
                {/*/.Card*/}
              </div>
              <div className='container-fluid'>
                <div className='row'>
                  {searchResults.map(car => (
                    <CarItem key={car._id} {...car} />
                  ))}
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default Search;
