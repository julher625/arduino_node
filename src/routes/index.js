const router = require('express').Router();
const Sensor = require('../models/sensor')
router.get('/',(req,res)=>{
    res.render('index')
})

var go = false

var rRouter = function(io){
    router.get('/send',(req,res)=>{
        
        var {data,name} = req.query
        
        //res.send(data)


        Sensor.findOne({name:name},(err,foundObject)=>{
            
            if(err){
                console.log(err)
                res.status(500).send()
            }else{
                if(!foundObject){
                    console.log('NotObject')
                    res.status(404).send()
                }else{
                    if(foundObject.data.length > 99){
                        foundObject.data.shift()
                    }
                    foundObject.data.push(data)
                    foundObject.save(function(err,updatedObject){
                        if(err){
                            console.log(err)
                            res.status(500).send()
                        }else{

                            io.sockets.emit('update',{data:updatedObject.data})
                            
                            res.send('ok')
                        }
                    })
                }

            }
        })

    })

    router.get('/view',(req,res)=>{
        
        var {name} = req.query
        
        
        Sensor.findOne({name:name},(err,foundObject)=>{
            
            if(err){
                console.log(err)
                res.status(500).send()
            }else{
                if(!foundObject){
                    console.log('NotObject')
                    res.status(404).send()
                }else{
                    foundObject.save(function(err,updatedObject){
                        if(err){
                            console.log(err)
                            res.status(500).send()
                        }else{
                            res.render("index",{data:foundObject.data});
                        }
                    })
                }

            }
        })



    })
    return router
}

module.exports = rRouter;
