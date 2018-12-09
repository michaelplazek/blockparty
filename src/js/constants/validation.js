
export const USERNAME = {
  VALIDATORS: ['required'],
  MESSAGES: ['this field is required']
};

export const PASSWORD = {
  VALIDATORS: ['required'],
  MESSAGES: ['this field is required']
};

export const PASSWORD_CONFIRM = {
  VALIDATORS: ['isPasswordMatch', 'required'],
  MESSAGES: ['passwords must match', 'this field is required']
};

export const cleanInputs = (...args) => {
  let items = {};
  args.forEach(item => Object.assign(items, { [item]: encodeURI(item) } ));
  return items;
};