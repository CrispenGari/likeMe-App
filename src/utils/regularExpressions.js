const usernameExp = new RegExp(
  /^(?=[a-zA-Z0-9._]{7,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/gim
);
const emailExp = RegExp(/[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/gim);

const nameExpression = new RegExp(/[a-zA-Z]{3,50}\s?([a-zA-Z]{3,50})?/gim);
const surnameExpression = new RegExp(/[a-zA-Z]{3,50}\s?([a-zA-Z]{3,50})?/gim);

export { usernameExp, emailExp, nameExpression, surnameExpression };
