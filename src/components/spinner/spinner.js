import React from 'react';

import './spinner.css';

const spinner = () => (
  <div className='spinner'>
    <div className='lds-ripple'>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default spinner;
