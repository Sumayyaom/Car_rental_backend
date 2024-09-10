import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

const CheckoutPayment = async(req,res) => {
    const { totalPrice } = req.body;  // Get totalPrice from frontend
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPrice * 100, // Convert to cents
        currency: 'inr',
        automatic_payment_methods: {
          enabled: true,
        },
      });
  
      // Send the client secret to the frontend
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).send('Payment failed');
    }
  };
  export {CheckoutPayment}
