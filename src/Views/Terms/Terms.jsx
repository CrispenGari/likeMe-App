import React from "react";
import "./Terms.css";
import { useHistory, useLocation } from "react-router-dom";
import { logos } from "../../utils/logos";

const Terms = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  document.title = `LikeMe • ${pathname.split(/\//)[1]} `;

  return (
    <div className="termsandconditions">
      <div className="termsandconditions__app__logo">
        {/* <h1>LIKE ME</h1> */}

        <img src={logos.header_logo} alt="" />
        <p>Welcome to our application where you will find your love partner.</p>
      </div>
      <div className="termsandconditions__body">
        <h1>Terms of Service</h1>
        <h2>Welcome to LikeMe!</h2>
        LikeMe builds technologies and services that enable people to connect
        with each other. By using this app, you agree that we can show you ads
        that we think will be relevant to you and your interests. We use your
        personal data <strong>(that you provide to us)</strong> to help
        determine which ads to show you.
        <p>
          We don't sell your personal data to advertisers, and we don't share
          information that directly identifies you (such as your name, email
          address or other contact information) with advertisers unless you give
          us specific permission. Instead, advertisers can tell us things such
          as the kind of audience that they want to see their ads, and we show
          those ads to people who may be interested.
        </p>
        <p>
          We provide advertisers with reports about the performance of their ads
          that help them understand how people are interacting with their
          content. The services we provide Our mission is to give people the
          power to build community and bring the world closer together.
        </p>
        <img src={logos.main_logo} alt="" />
        <p>
          <h2>Application</h2>
          This application will allow all the users that are using this
          application to see your:
          <ul>
            <li>Google Profile</li>
            <li>Your Posts</li>
            <li>Your Followers and Followings</li>
            <li>
              The location of you post <strong>(if you didn't hide it)</strong>
            </li>
          </ul>
        </p>
        <p>
          If you agree with these terms and Conditions Click the{" "}
          <strong> Agree Button</strong>, and go ahead and Authenticate to the
          Application. If you don't agree with these terms and conditions click
          the <strong>Reject Button</strong>.
          <h5>~~Developed By Crispen Gari</h5>
        </p>
      </div>
      <div className="termsandconditions__buttons">
        <div className=""></div>
        <div className="termsandconditions__buttons__left">
          <button onClick={() => history.replace("/")}>Reject</button>
          <button onClick={() => history.push("/")}>Accept</button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
