//models/accesories

const { Schema, model, SchemaTypes} = require ("mongoose")

const AccesoriesSchema = new Schema({
    brand: SchemaTypes.String,
    product_name: SchemaTypes.String,
    price:SchemaTypes.Decimal128,
    weight: SchemaTypes.Number

})

const Accesories = model("Accesories", AccesoriesSchema);

module.exports = Accesories;