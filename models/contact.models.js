import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema ({
name: {
    type: String,
    require: true, 
},
lastName: {
    type:String,
    require: true 
},
email: {
    type: String,
    require: true 
}, 
message:{
    type: String,
    require: true 
}
}, { versionKey: false } );

const Contact = mongoose.model('Contact', ContactSchema);
export default Contact
