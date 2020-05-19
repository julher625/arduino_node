const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const SocketIO = require('socket.io')







//Initializations
const app = express()
require('./database')


// static files
app.use("/public", express.static(__dirname + '/public'));

console.log(path.join(__dirname, 'public'))
//Settings
app.set('port',process.env.PORT || 8001);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs');

// middlewares



//Routes
//app.use(require('./routes/index'));


//Server 


const server = app.listen(app.get('port'),()=>{
console.log('server on port',app.get('port'))
});


//Web Sockets
io = SocketIO(server)
// io.on('connection',(socket)=>{
//     console.log('New Client whit ID:',socket.id)
//     io.sockets.emit('update',{data:'prueba'})
// })
//require('./routes/index')(io)
app.use(require('./routes/index')(io));
