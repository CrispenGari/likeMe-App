import "./Register.css";

const Register = ({ setHasAccount }) => {
  return (
    <form className="register">
      <h1>Register</h1>
      <div className="register__input">
        <label>
          username <span>*</span>
        </label>
        <input type="text" placeholder="username" />
      </div>
      <div className="register__input">
        <label>
          email <span>*</span>
        </label>
        <input type="text" placeholder="email" />
      </div>
      <div className="register__input">
        <label>
          phone <span>?</span>
        </label>
        <input type="text" placeholder="phone number" />
      </div>
      <div className="register__input">
        <label>
          password <span>*</span>
        </label>
        <input type="text" placeholder="password" />
      </div>
      <div className="register__input">
        <label>
          confirm password<span>*</span>
        </label>
        <input type="text" placeholder="password" />
      </div>
    </form>
  );
};

export default Register;
