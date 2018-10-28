export const escapeInput = input => encodeURI(input);

export const validateRegistry = (username, password, confirmPassword) => {};

export const validateInput = () => true;

export const validateUsername = input => {
  let result;
  if (input.length > 25) {
    result = {
      isValid: false,
      error: "Username must be less than 25 characters."
    };
  } else {
    result = { isValid: true };
  }
  return result;
};

export const validatePasswordRegistry = (input, confirmInput) => {
  let result;
  if (input.length > 25 || confirmInput.length > 25) {
    result = {
      isValid: false,
      error: "Password must be less than 25 characters."
    };
  } else if (input !== confirmInput) {
    result = { isValid: false, error: "Passwords do not match." };
  } else {
    result = { isValid: true };
  }
  return result;
};
