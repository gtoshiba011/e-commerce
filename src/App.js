import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth } from "./firebase/firebase.utils";

const Page = (props) => {
  return (
    <div>
      <h1>{props.item} PAGE</h1>
    </div>
  );
};

// only HomePage gets history and match property, so we need to pass it to MenuItem
class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // add a observer in componentDidMount
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            path="/hats"
            component={(props) => <Page item="HATS" {...props} />}
          />
          <Route
            path="/jackets"
            component={(props) => <Page item="JACKETS" {...props} />}
          />
          <Route
            path="/sneakers"
            component={(props) => <Page item="SNEAKERS" {...props} />}
          />
          <Route
            path="/womens"
            component={(props) => <Page item="WOMENS" {...props} />}
          />
          <Route
            path="/mens"
            component={(props) => <Page item="MENS" {...props} />}
          />
          <Route path="/signin" component={SignInAndSignUpPage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
