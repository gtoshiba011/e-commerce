import React from "react";

import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51GyWzKEK568DMuotTkkmYXvYWW3KzjxgL1pdbHfPRqt8klwfiGxsBmmrq974F4hlPHTInaqDD7JAS3NLJ2KTL0AI00LvzagJEf";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successfull!");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      description={`Your total price is $${price}`}
      image="https://sendeyo.com/up/d/f3eb2117da"
      panelLabel="Pay Now"
      amount={priceForStripe}
      stripeKey={publishableKey}
      billingAddress
      shippingAddress
      token={onToken}
    />
  );
};

export default StripeCheckoutButton;
