import React from 'react';
import Avatar from 'react-avatar';


// Date format manually
const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString('en-US');
  const newTime = new Date(date).toLocaleTimeString('en-US');
  return `${newDate} at ${newTime}`;
};

// session is coming from Profile component props
const UserInfo = ({ session }) => {

console.log(session.getCurrentUser);

  const { username, email, joinDate, favorites } = session.getCurrentUser;
  return (
    <div className='myy'>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-8 col-lg-12 mx-auto'>
            {/* Section: Block Content */}
            <section>
              {/* Card */}
              <div className='card testimonial-card'>
                {/* Background color */}
                <div className='card-up aqua-gradient p-3'>
                  <h5 className='font-weight-light mb-0'>
                    User Name:{' '}
                    {username.charAt(0).toUpperCase() + username.slice(1)}
                  </h5>
                  <strong className='small mb-0 dark-text'>User Info:</strong>
                </div>
                {/* Avatar */}
                <div className='avatar mx-auto white mt-4'>
                  <Avatar name={username} size='100' round={true} />
                </div>
                {/* Content */}
                <div className='card-body px-3 py-4'>
                  <div className='row'>
                    <div className='col-4 text-center'>
                      <p className='font-weight-bold mb-0'>Email</p>
                      <p className='lead mb-0'>{email}</p>
                    </div>
                    <div className='col-4 text-center border-left border-right'>
                      <p className='font-weight-bold mb-0'>Join Date</p>
                      <p className='lead mb-0'>{formatDate(joinDate)}</p>
                    </div>
                    <div className='col-4 text-center'>
                      <p className='font-weight-bold mb-0'>Favorites</p>
                      <p className='lead mb-0'>{favorites.length}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card */}
            </section>
            {/* Section: Block Content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
