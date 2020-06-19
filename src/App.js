import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";

const Page = (props) => {
  return (
    <div>
      <h1>{props.item} PAGE</h1>
    </div>
  );
};

// only HomePage gets history and match property, so we need to pass it to MenuItem
function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/hats" component={(props) => <Page item="HATS" {...props} />} />
        <Route path="/jackets" component={(props) => <Page item="JACKETS" {...props} />} />
        <Route path="/sneakers" component={(props) => <Page item="SNEAKERS" {...props} />} />
        <Route path="/womens" component={(props) => <Page item="WOMENS" {...props} />} />
        <Route path="/mens" component={(props) => <Page item="MENS" {...props} />} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
