import React from "react";
import "./Welcome.css";
import { useHistory } from "react-router-dom";

import { logos } from "../../utils/logos";
interface Props{
  setWelcome?: string
}
const Welcome:React.FC<Props> = ({ setWelcome }) => {
  document.title = `LikeMe • Welcome`;
  const history = useHistory();
  const next = () => {
    setWelcome(false);
  };
  return (
    <div className="welcome">
      <div className="welcome__main">
        <p>Welcome to our application where you will find your love partner.</p>
        {/* <h1>LIKE ME</h1> */}

        <img src={logos.main_logo} alt="" />
        <button onClick={next}>CONTINUE</button>
        <small>Developed by Crispen Gari</small>
        <p>
          By using this application you are automatically accepting{" "}
          <span onClick={() => history.push("/terms")}>
            Terms and Conditions
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default Welcome;
