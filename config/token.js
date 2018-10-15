const jwt = require('jsonwebtoken');
const secretekey = "myapplicationsecretekey";
const datamodelsUser = require("../datamodels/token");
const datamodelds = require('../datamodels/user');

module.exports = {
    "secrete" : secretekey,
}

module.exports.verifytoken =function (req,res,next){
    const bearerHeader = req.headers['authorization'];
    //console.log(bearerHeader);
    if(typeof bearerHeader != 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token,secretekey,(err,userdata)=>{
            if(err){
                res.sendStatus(401);
            } 
            else{
                datamodelsUser.matchtoken(bearerToken,(err,mached)=>{
                    //console.log(mached);
                    if(err) throw err;
                    else if(mached){
                        //console.log("token mached");
                        req.user=userdata;
                        next();
                    }else{
                        res.json({state:false,msg:"token expired!"})
                    }
                })
                
            }
        });

        
    } else{
        res.sendStatus(401);

    }
};

//recipe view ekata
module.exports.verifytoken2 =function (req,res,next){
    const bearerHeader = req.headers['authorization'];
    //console.log(bearerHeader);
    if(typeof bearerHeader != 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token,secretekey,(err,userdata)=>{
            if(err){
                res.json({state:false,msg:"no user!"});
            } 
            else{
                datamodelsUser.matchtoken(bearerToken,(err,mached)=>{
                    //console.log(mached);
                    if(err) throw err;
                    else if(mached){
                        //console.log("token mached");
                        req.user=userdata;
                        next();
                    }else{
                        res.json({state:false,msg:"token expired!"})
                    }
                })
                
            }
        });

        
    } else{
        res.json({state:false,msg:"no user!"});

    }
};
//this is for send token with files
module.exports.verifyfiletoken =function (req,res,next){
    const bearerHeader = req.body.Authorization;
    //console.log(bearerHeader);
    if(typeof bearerHeader != 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token,secretekey,(err,userdata)=>{
            if(err){
                res.sendStatus(401);
            } 
            else{
                datamodelsUser.matchtoken(bearerToken,(err,mached)=>{
                    //console.log(mached);
                    if(err) throw err;
                    else if(mached){
                        //console.log("token mached");
                        req.user=userdata;
                        next();
                    }else{
                        res.json({state:false,msg:"token expired!"})
                    }
                })
                
            }
        });

        
    } else{
        res.sendStatus(401);

    }
};

module.exports.isAdminUser =function (req,res,next){
    const bearerHeader = req.headers['authorization'];
    //console.log(bearerHeader);
    if(typeof bearerHeader != 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token,secretekey,(err,userdata)=>{
            if(err){
                res.sendStatus(401);
            } 
            else{
                datamodelsUser.matchtoken(bearerToken,(err,mached)=>{
                    //console.log(mached);
                    if(err) throw err;
                    else if(mached){
                        //console.log("token mached");
                        req.user=userdata;
                        datamodelds.searchUser(userdata.username,(err,user)=>{
                            if(err){
                              res.send({state:false,msg:"Server Error!"});
                            }else{
                              if(user.usertype=="admin"){
                                
                                next();
                              }else{
                                res.send({state:false,msg:"not admin user!"});
                              } 
                            }
                          })

                        
                    }else{
                        res.json({state:false,msg:"token expired!"})
                    }
                })
                
            }
        });

        
    } else{
        res.sendStatus(401);

    }
};