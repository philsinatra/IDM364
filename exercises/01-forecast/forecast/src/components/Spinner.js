import React from 'react';

const Spinner = props => {
  return (
    <>
      <p>{props.message}</p>
      <div class="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </>
  );
};

Spinner.defaultProps = {
  message: 'Loading...'
};

export default Spinner;
