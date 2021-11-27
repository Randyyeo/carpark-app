const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51JlugcB1RioPFXqAOnp4cp512PvoN640mv179lcGvuJWvIVSqDkkrEW1bl2SzJpboMitBvk1Lp00DBwoKd2eycCh00wfcZPNDs"
);
const { Router } = require("express");

const auth = require("../middleware/auth.js");
const Stripes = require("../models/stripe")


const router = Router();
router.use(auth);

router.get("/", async (req, res) => {
    const {userId} = req.body
  try {
    /* var charge = await stripe.charges.retrieve(
            'ch_3JluhnB1RioPFXqA0f6cGKUq',
            {
              apiKey: 'sk_test_51JlugcB1RioPFXqAOnp4cp512PvoN640mv179lcGvuJWvIVSqDkkrEW1bl2SzJpboMitBvk1Lp00DBwoKd2eycCh00wfcZPNDs'
            }
        ); */
    var extracted = []
    const results = await Stripes.find({userId})
    
    for (var i = 0; i < 12; i++){
        
        const price = await stripe.prices.retrieve(
            results[0].prices[i].price
        );
        const product = await stripe.products.retrieve(price.product);
        if (results[0].prices[i].date){
          var val = {name: product.name, price: price.unit_amount, link: results[0].prices[i].link, date: results[0].prices[i].date, paid: results[0].prices[i].paid}
        } else {
          var val = {name: product.name, price: price.unit_amount, link: results[0].prices[i].link, date: "NIL", paid: false}
        }
        
        extracted.push(val)
    }
    
    res.status(200).send({ extracted });
  } catch (error) {
    console.log(error);
  }
});

router.post("/add", async (req, res) => {
    const {userId, prices} = req.body
    try {
    /* var charge = await stripe.charges.retrieve(
            'ch_3JluhnB1RioPFXqA0f6cGKUq',
            {
              apiKey: 'sk_test_51JlugcB1RioPFXqAOnp4cp512PvoN640mv179lcGvuJWvIVSqDkkrEW1bl2SzJpboMitBvk1Lp00DBwoKd2eycCh00wfcZPNDs'
            }
        ); */
    const result = Stripes.create({userId, prices})
    
  } catch (error) {
    console.log(error);
  }
});

router.post("/update", async (req, res) => {
    const {userId, count, date} = req.body
    try {
        const results = await Stripes.find({userId})
        const filter = { userId:userId };
        results[0].prices[count].paid = true
        results[0].prices[count].date = date
        const update = { prices: results[0].prices };
        let result = await Stripes.findOneAndUpdate(filter, update);
    
    
    } catch (error) {
        console.log(error);
    }
});








  


module.exports = router;
