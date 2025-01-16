import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { showAlert } from './alert';

// Load Stripe asynchronously
let stripePromise = loadStripe(
  'pk_test_51QgoemLrE4OD95QQPrGWW7vBhGODVvHzBxsP4TLgHWz5xvuSlN7rnMscMjQ7p4WHjDpZy4cQjaabyCuyzKauQWlk007sNyQA2K'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Get Stripe instance
    const stripe = await stripePromise;

    // 3) Redirect to checkout
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', 'Something went wrong. Please try again.');
  }
};
