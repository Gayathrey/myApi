const express = require("express");
const router = express.Router();
const Food = require("../models/foods.model")
const auth =  require("../auth-middleware")


// middleware example
// router.get ("/",
// function(req,res,next) {
// },
// function(req,res,next) {
// },
// function(req,res,next){
// }
// )

// get all the foods
// router.get("/foods", auth, async function(request, response, next) {

//     try {
//         let result = await Food.find()
//         response.json(result);
        
//     } catch (error) {
//         return next(error)        
//     }
// })

// reponse:
// {
//     count: 12
//     next: localhost:4000/api/v1/foods?offset=5&limit=5
//     previous: null
//     results: []
//     url: localhost:4000/api/v1/foods?offset=0&limit=5
// }

//http://localhost:4000/api/v1/foods?offset=5&limit=5
router.get("/foods",  async function(request, response, next) {

    let limit = parseInt(request.query.limit) || 5;
    let offset = parseInt(request.query.offset) || 0;
    try {

        let count = (await Food.find()).length
        let result = await Food.find().limit(limit).skip(offset)

        let queryStringNext = `?offset=${offset+limit}&limit=${limit}`
        let queryStringPrevious;

        if(offset >= limit ) {
            queryStringPrevious = `?offset=${offset - limit}&limit=${limit}`
        }

        let apiUrl = `${request.protocol}://${request.hostname}${request.hostname==="localhost" ? ":" + process.env.PORT : ''}`
        let apiPath = `${request.baseUrl}${request.path}`
        console.log(apiUrl)

        let output = {
            count,
            next: (offset + limit < count) ? apiUrl + apiPath + queryStringNext : null,
            previous: offset > 0 ? apiUrl + apiPath + queryStringPrevious : null,
            result,
            url: apiUrl + request.originalUrl
        }

        response.json(output)
    } catch (error) {
        return next(error)        
    }
})


// get single food by ID
router.get("/foods/:foodId", async function(request, response, next) {

    try {
        let result = await Food.findOne({_id: request.params.foodId})

        //return 404 if no result is found
        if(!result) {
            response.status(404)
            response.end()
            return
        }

        response.status(200)
        response.json(result)

    } catch (error) {
        return next(error)
    }
})

router.post("/foods", auth, function(request, response, next) {
    try {
        let food = new Food({
            type: request.fields.type,
            breed: request.fields.breed,
            name: request.fields.name,
            age: request.fields.age,
            sex: request.fields.sex,
            colors: request.fields.colors,
        })
        food.save();

        response.status(201);
        response.json(food)

    } catch (error) {
        return next(error)
    }
})

router.patch("/foods/:foodId", auth, async function(request, response, next) {

    let { type, breed, name, age, sex, colors } = request.fields
    let updateObject = {}

    if (type) updateObject.type = type;
    if (breed) updateObject.breed = breed;
    if (name) updateObject.name = name;
    if (age) updateObject.age = age;
    if (sex) updateObject.sex = sex;
    if (colors) updateObject.colors = colors;


    let food = await Food.findByIdAndUpdate(request.params.foodId, updateObject, {new:true})
    //let food = Food.findById()

    response.json(food)
    // response.send("patch request foods")
})

router.delete("/foods/:foodId", async function(request, response, next) {

    try {
        await Food.findByIdAndDelete(request.params.foodId)

        response.status(200)
        response.end()

    } catch (error) {
        return next(error)
    }
    // response.send("delete request foods")
})

module.exports = router;