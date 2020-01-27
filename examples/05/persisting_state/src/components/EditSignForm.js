import React from 'react';

const EditSignForm = props => {
  const { index, sign } = props;

  const handleChange = event => {
    console.log(event.currentTarget.value);
    console.log(event.currentTarget.name);

    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    // Take a copy of the current fish
    const updateSign = {
      ...sign,
      /*
        ES6 dynamically get the 'name' attribute of the
        input element that is being updated.
        [event.currentTarget.name]
        Then set the value to whatever is entered in that input:
      */
      [name]: value
    };
    console.log('updateSign:', updateSign);
    props.updateSign(index, updateSign);
  };

  return (
    <div className="sign-edit">
      <div className="controlgroup">
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          type="text"
          value={sign.name}
          onChange={handleChange}
        />
      </div>
      <div className="controlgroup">
        <label htmlFor="status">Status</label>
        <select name="status" onChange={handleChange} value={sign.status}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="cotnrolgroup">
        <textarea name="desc" onChange={handleChange} value={sign.desc} />
      </div>
    </div>
  );
};

export default EditSignForm;
