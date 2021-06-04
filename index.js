require("dotenv").config()
const express = require("express")
const formidable = require("express-formidable")
const animals = require("./routes/animals")
const foods = require("./routes/foods")

//set up express app
const app = express();

//import db-connection
require("./database")

//parse http form data
app.use(formidable())

//set up app routes
app.use("/api/v1", animals)
app.use("/api/v1", foods)


// app.get("/", function(request,response,next){
//     response.send({"firstname": "Gayathrey", "lastname": "Pulantrin", "email": "6337819@rts.dk"})
// })


app.listen(process.env.PORT || 4000, function() {
    console.log("now listening for requests on port 4000")
})