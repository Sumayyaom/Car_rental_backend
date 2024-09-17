import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();  

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

const CheckoutPayment = async(req,res) => {
    const { totalPrice } = req.body; 
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPrice * 100, 
        currency: 'inr',
        automatic_payment_methods: {
          enabled: true,
        },
      });
  
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).send('Payment failed');
    }
  };
  export {CheckoutPayment}
