import React from "react";
import "./form-input.styles.scss";

const FormInput = ({ doChange, label, ...restProps }) => {
  return (
    <div className="group">
      <input className="form-input" onChange={doChange} {...restProps} />
      {label ? (
        <label
          className={`${
            restProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
