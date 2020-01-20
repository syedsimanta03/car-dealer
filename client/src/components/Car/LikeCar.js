import React, { Component } from 'react';

import withSession from '../withSession';
import { Mutation } from 'react-apollo';
import { LIKE_CAR, UNLIKE_CAR, GET_CAR } from '../../queries';

class LikeCar extends Component {
  state = {
    liked: false,
    username: ''
  };

  componentDidMount() {
    // Get loggedin user & set to state
    if (this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser;
      // Check previously liked recipe
      const { _id } = this.props;
      const prevLiked =
        favorites.findIndex(favorite => favorite._id === _id) > -1;
      this.setState({
        username: username,
        liked: prevLiked
      });
    }
  }

  // Handle car like/unlike
  handleClick = (likeCar, unlikeCar) => {
    this.setState(
      prevState => ({
        // Toggle like
        liked: !prevState.liked
      }),
      () => this.handleLike(likeCar, unlikeCar)
    );
  };
  //  Add like/unlike frontend + backend
  handleLike = (likeCar, unlikeCar) => {
    if (this.state.liked) {
      likeCar().then(async ({ data }) => {
        // console.log(data);
        await this.props.refetch();
      });
    } else {
      //  unlike mutation
      unlikeCar().then(async ({ data }) => {
        // console.log(data);
        await this.props.refetch();
      });
    }
  };

  //  Update like after like
  updateLike = (cache, { data: { likeCar } }) => {
    const { _id } = this.props;
    const { getCar } = cache.readQuery({
      query: GET_CAR,
      variables: { _id }
    });
    //  Got old data & now write to the new query +1
    cache.writeQuery({
      query: GET_CAR,
      variables: { _id },
      data: {
        getCar: { ...getCar, likes: likeCar.likes + 1 }
      }
    });
  };
  //  Update unlike after unlike
  updateUnlike = (cache, { data: { unlikeCar } }) => {
    const { _id } = this.props;
    const { getCar } = cache.readQuery({
      query: GET_CAR,
      variables: { _id }
    });
    //  Got old data & now write to the new query -1
    cache.writeQuery({
      query: GET_CAR,
      variables: { _id },
      data: {
        getCar: { ...getCar, likes: unlikeCar.likes - 1 }
      }
    });
  };

  // Conditionally show the button if there is a user loggedin
  render() {
    const { liked, username } = this.state;
    const { _id } = this.props;

    return (
      <Mutation
        mutation={UNLIKE_CAR}
        variables={{ _id, username }}
        update={this.updateUnlike}
      >
        {unlikeCar => (
          <Mutation
            mutation={LIKE_CAR}
            variables={{ _id, username }}
            update={this.updateLike}
          >
            {likeCar => {
              return (
                username && (
                  <i
                    className={
                      liked
                        ? 'fas fa-heart fa-2x red-text animated fadeIn'
                        : 'far fa-heart fa-2x red-text'
                    }
                    onClick={() => this.handleClick(likeCar, unlikeCar)}
                  ></i>
                )
              );
            }}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default withSession(LikeCar);
