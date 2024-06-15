import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "pages/CheckoutForm.css";
import { useLocation } from "react-router-dom";
import { LoginContext } from "helpers/LoginContext";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const { payment, tourGuide } = location.state;
  const { loginData } = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  console.log(tourGuide);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const response = await axios.post('https://api.stripe.com/v1/checkout/sessions', {
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'idr',
          product_data: {
            name: tourGuide.tourLocation,
          },
          unit_amount: tourGuide.tourPrice * 100, // Stripe expects amount in cents
        },
        quantity: payment.qty,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    }, {
      headers: {
        'Authorization': `Bearer sk_test_51L0fDhGcs5kSb2FxmqjiwT0PZSK3w0Sal10lG3zwJXNkjwtRR0z2hTgZOWZnGZZSk6YyCQB4x8yFkJ23ajGdvpZy00lTn7HAn3`, // Replace with your Stripe secret key
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const sessionId = response.data.id;

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error(error);
      setIsProcessing(false);
      return;
    }

    // Send paymentMethod.id and other details to your server for processing payment

    // console.log("Payment Method:", paymentMethod);
    setIsProcessing(false);
    // Handle payment confirmation and other post-payment actions here
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Checkout</h2>
      <div className="items">
        <div key={tourGuide.id} className="item">
          <span>{tourGuide.tourLocation}</span>
          <span>{payment.qty}x</span>
          <span>IDR {tourGuide.tourPrice}</span>
        </div>
      </div>
      <div className="total">
        <span>Total:</span>
        <span>IDR {payment.amount}</span>
      </div>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={loginData.userName}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="card">Card Details</label>
        <CardElement id="card" />
      </div>
      
      <button type="submit" disabled={isProcessing}>
        {isProcessing ? "Processing…" : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;