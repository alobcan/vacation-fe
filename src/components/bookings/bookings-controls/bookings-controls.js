import React from 'react';

import './bookings-controls.css';

const bookingsControls = (props) => {
  return (
    <div className='bookings-controls'>
      <button
        onClick={props.onChange.bind(this, 'list')}
        className={props.activeOutputType === 'list' ? 'active' : ''}>
        List
      </button>
      <button
        onClick={props.onChange.bind(this, 'chart')}
        className={props.activeOutputType === 'chart' ? 'active' : ''}>
        Chart
      </button>
    </div>
  );
};

export default bookingsControls;
