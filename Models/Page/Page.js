const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const pageSchema = new Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    keywords:[{type:String}],
    canonical_url:{type:String},
    og_tags:[{type:Schema.Types.Mixed}]
},{timestamps:true})

const Page = model('Page',pageSchema)

module.exports = Page;