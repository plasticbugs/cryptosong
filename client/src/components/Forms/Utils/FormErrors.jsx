import React from 'react';
import PropTypes from 'prop-types';

const FormErrors = ({ formErrors }) => (
  <div className="formErrors">
    {Object.keys(formErrors).map((fieldName) => {
      if (formErrors[fieldName].length > 0) {
      return <p key={fieldName}>{fieldName} {formErrors[fieldName]}</p>;
      }
      return '';
    })}
  </div>
);

FormErrors.defaultProps = {
  formErrors: { email: '', username: '', password: '' },
};

FormErrors.propTypes = {
  formErrors: PropTypes.objectOf(PropTypes.string),
};
 export default FormErrors;