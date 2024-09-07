const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    products: [{
            productId : {type : String},
            quntity : {type : Number, default : 1}
        }],
    address : {type : String, required : true},
    amount : {type : Number, required : true},
    status : {type : String, default: 'Pending', required : true},
}, {timestamps : true});

export default mongoose.model("Order", OrderSchema);


// just for information.
// async function main() {
//     await mongoose.connect('mongodb://localhost:27017/')
// }