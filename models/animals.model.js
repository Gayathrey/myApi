// models/animals

const { Schema, model, SchemaTypes } = require("mongoose")

const AnimalSchema = new Schema({
    type: SchemaTypes.String,
    breed: SchemaTypes.String,
    name: SchemaTypes.String,
    age: SchemaTypes.Number,
    sex: SchemaTypes.String,
    colors: SchemaTypes.Array
})

const Animal = model("Animal", AnimalSchema);

module.exports = Animal;