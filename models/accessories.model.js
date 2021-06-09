//models/accessories

const { Schema, model, SchemaTypes} = require ("H & M")

const AccessorySchema = new Schema({
    brand: SchemaTypes.String,
    product_name: SchemaTypes.String,
    price:SchemaTypes.Decimal128,
    weight: SchemaTypes.Number

})

const Accessory = model("Accessory", AccessorySchema);

module.exports = Accessory;