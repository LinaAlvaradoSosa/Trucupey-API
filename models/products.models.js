import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema ({
name: {
    type: String,
    require: true, 
},
size: {
    type:String
},
type: {
    type: String,
    require: true 
}, 
imagen:{
    type: String
},
price: {
    type: Number,
    require: true
}
}, { versionKey: false } );

const Product = mongoose.model('Product', ProductsSchema);
export default Product

// {
//     "name": "agenda Trucupey",
//     "size": "",
//     "type": "Libreta"
//     "price": 30000
// }