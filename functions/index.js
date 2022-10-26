const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { response } = require("express");
const screat_key =
  "sk_test_51LwrwHL0uAH7L9TAoXNB2LfxUZQd5hEZrBcPbhZ4o7mhzeArL2D1x87D0PFJTW7UlGgnFhoTMrBnsEltZiWj8iYt00XbRjyR8L";
const stripe = require("stripe")(screat_key);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// API

// App config
const app = express();

// Middlewares

// var allowlist = ["http://localhost:3000"];
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header("Origin")) !== -1) {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment request received", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits of the currency
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command

exports.api = functions.https.onRequest(app);
// http://127.0.0.1:5001/clone-1fdd7/us-central1/api
