import React from 'react'

function CheckBoxSelect({ productId, isChecked, onCheckboxChange }) {


  return (
    <>
      <input
        type="checkbox"
        className="form-check-input"
        checked={isChecked}
        onChange={() => onCheckboxChange(productId)}
      >
      </input>
    </>
  )
}

export default CheckBoxSelect









