//models/animals

const { Schema, model, SchemaTypes} = require ("mongoose")

const FoodSchema = new Schema({
    brand: SchemaTypes.String,
    product_name: SchemaTypes.String,
    price:SchemaTypes.Decimal128,
    weight: SchemaTypes.Number

})

const Food = model("Food", FoodSchema);

module.exports = Food;