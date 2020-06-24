import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";

const Page = (props) => {
  return (
    <div>
      <h1>{props.item} PAGE</h1>
    </div>
  );
};

// only HomePage gets history and match property, so we need to pass it to MenuItem
class App extends Component {
  // method 1: not Redux
  // constructor() {
  //   super();
  //   this.state = {
  //     currentUser: null,
  //   };
  // }

  // onAuthStateChanged and onSnapshot return unsubscribe
  // Calling the unsubscribe function when the component is about to unmount
  // is the best way to make sure we don't get any memory leaks in our application
  // related to listeners still being open even if the component
  // that cares about the listener is no longer on the page.
  unsubscribeFromAuth = null;
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // add a observer to listen to userAuth change in componentDidMount
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userDocRef = await createUserProfileDocument(userAuth);

        // listen to userAuth if any change in doc
        this.unsubscribeFromSnapshot = userDocRef.onSnapshot((snapshot) => {
          // method 1: not Redux
          // this.setState({
          //   currentUser: { id: snapshot.id, ...snapshot.data() },
          // });

          // method 2: using Redux
          setCurrentUser({ id: snapshot.id, ...snapshot.data() });
        });
      } else {
        // userAuth should be null here
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.unsubscribeFromSnapshot();
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
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route path="/shop" component={ShopPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

// setCurrentUser will be the props of App
// it is a function whose input is user
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
