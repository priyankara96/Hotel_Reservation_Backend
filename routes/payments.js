const router = require("express").Router();
const stripe = require("stripe")(process.env.SECRET_KEY);

const smsSend = require("./text")


router.post("/payments", async (req, res) => {
  await smsSend.sendSms()
  let status, error;
  const { token, amount } = req.body;
  // console.log(token);
  try {
    await stripe.charges.create({
      source: token.id,
      amount,
      currency: "USD",
      
    });
    status = "success";
  } catch (error) {
    console.log(error);
    status = "failure";
  }
  res.json({ error, status });
});

module.exports = router;
