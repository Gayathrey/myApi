const express = require("express");
const router = express.Router();
const Animal = require("../models/animals.model");
const Food = require("../models/foods.model")

router.get("/foods", async function(request, response, next) {

    try {
        let result = await Food.find()
        console.log(result)
        response.json(result);

    } catch (error) {
        next(error)
    }

})


router.post("/foods", function(request, response, next) {

    try {
        let food = new Food({
            brand: request.fields.brand,
            product_name: request.fields.product_name,
            price: request.fields.price,
            weight: request.fields.weight          
        })
        food.save();

        response.status(201)
        response.json(food)

    } catch (error) {
        next (error)
    }

})

router.patch("/foods", function(request, response, next) {

    response.send("patch request foods")

})

router.delete("/foods", async function(request, response, next) {

    response.send("delete request foods")

})

module.exports = router;