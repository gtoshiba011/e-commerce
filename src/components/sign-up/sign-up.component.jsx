import React, { Component } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-up.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  changeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitHandler = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with your email and password</span>

        <form className="sign-up-form" onSubmit={this.submitHandler}>
          <FormInput
            name="displayName"
            type="text"
            value={displayName}
            doChange={this.changeHandler}
            required
            label="Display Name"
          />
          <FormInput
            name="email"
            type="email"
            value={email}
            doChange={this.changeHandler}
            required
            label="Email"
          />
          <FormInput
            name="password"
            type="password"
            value={password}
            doChange={this.changeHandler}
            required
            label="Password"
          />
          <FormInput
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            doChange={this.changeHandler}
            required
            label="Confirm Password"
          />
          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
