// CheckoutForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import 'pages/CheckoutForm.css';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const { payment } = location.state;


  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const pr = stripe.paymentRequest({
        country: 'ID',
        currency: 'idr',
        total: {
          label: `Payment-${payment.bookingDate}`,
          amount: payment.amount,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    setIsProcessing(true);


    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name,
        email,
      }
    });

    if (error) {
      console.error(error);
      setIsProcessing(false);
      return;
    }

    // Send paymentMethod.id and other details to your server for processing payment

    console.log('Payment Method:', paymentMethod);
    setIsProcessing(false);
    // Handle payment confirmation and other post-payment actions here
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Checkout</h2>
      <div className="items">
        {items.map((item) => (
          <div key={item.id} className="item">
            <span>{item.name}</span>
            <span>${(item.price / 100).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="total">
        <span>Total:</span>
        <span>${(calculateTotal() / 100).toFixed(2)}</span>
      </div>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
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
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

export default CheckoutForm;
