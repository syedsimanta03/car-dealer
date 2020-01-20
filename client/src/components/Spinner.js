import React from 'react'
import { Spin } from 'antd';


const Spinner = () => {
  return (
    <div className='row center'>
      <Spin tip='Loading...' size='large' />
    </div>
  );
}

export default Spinner
