const mongoose = require('mongoose')


var schema = mongoose.Schema;

const SensorSchema = new schema({
name:{type: String,required:true},
data: [{type: Number ,required:true}],
date: {type:Date,default:Date.now},
versionKey: false
})


module.exports = mongoose.model('Sensor',SensorSchema)