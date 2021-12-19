const Stripe = require('stripe'); 

const stripeSecret = 'sk_test_51K4IeYSFYc3x0FqP2BAIDl256UnHW3K2yPHYqvbGSey5kyN6mo3UbUWfrFhm4FPplBtf425080zPnVlhIXvO1BeH00nFuUc7xC';

var stripe = new Stripe(stripeSecret);

module.exports = { stripe };