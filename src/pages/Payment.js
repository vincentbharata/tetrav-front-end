// App.js
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// Make sure to replace with your own Stripe public key
const stripePromise = loadStripe('pk_test_51L0fDhGcs5kSb2FxB58ynuBgFpQl1hypWJFtT0VJT8Tq6MJXgZEWIkDscFFPDpuDvMhN5Kr50a8WMwvtNbQxzssT003szQG7E0');

function Payment() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <CheckoutForm stripe={stripePromise} />
      </Elements>
    </div>
  );
}

export default Payment;
