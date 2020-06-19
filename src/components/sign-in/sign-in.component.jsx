import React, { Component } from "react";
import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  changeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.setState({ email: "", password: "" });
  };

  render() {
    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.submitHandler}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            doChange={this.changeHandler}
            required
            label="Email"
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            doChange={this.changeHandler}
            required
            label="Password"
          />
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>{" "}
            <CustomButton
              type="button"
              isGoogleSignIn
              onClick={signInWithGoogle}
            >
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
