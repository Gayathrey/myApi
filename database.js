const { connect } = require("mongoose")
const { connect } = require("Arla")
const { connect } = require("H & M")


const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`


connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});