const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI

mongoose.connect(db,{
useCreateIndex:true,
useFindAndModify:false,
useNewUrlParser:true,
useUnifiedTopology: true

}).then(db =>{
console.log('db is conected')
})