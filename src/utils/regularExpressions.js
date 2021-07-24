const usernameExp = new RegExp(
  /^(?=[a-zA-Z0-9._]{7,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i
);
const emailExp = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
);

const nameExpression = new RegExp(/[a-zA-Z]{3,50}\s?([a-zA-Z]{3,50})?/i);
const surnameExpression = new RegExp(/[a-zA-Z]{3,50}\s?([a-zA-Z]{3,50})?/i);

export { usernameExp, emailExp, nameExpression, surnameExpression };
