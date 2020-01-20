import React from 'react';

const Error = ({ error }) => {
  return (
    <div className="text-center">
      <p>{error.message}</p>
    </div>
  );
};

export default Error;
