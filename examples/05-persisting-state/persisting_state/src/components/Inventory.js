import React from 'react';
import EditSignForm from './EditSignForm';

const Inventory = props => {
  const { signs, deleteSign, updateSign } = props;
  return (
    <div className="inventory">
      <h2>Signs Inventory</h2>
      {Object.keys(signs).map(key => (
        <EditSignForm
          key={key}
          index={key}
          sign={signs[key]}
          updateSign={updateSign}
          deleteSign={deleteSign}
        />
      ))}
    </div>
  );
};

export default Inventory;
