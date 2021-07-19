const User             = require('../models/User');
const bcrypt           = require('bcrypt');
const jwt              = require('jsonwebtoken');

class UserController{
   async auth(req,res){
        let { email, password} = req.body;

        if( email == undefined || password == undefined){
            res.status(400).send("os campos não podem ser nulos!");
        }
        else{
            try{
                let user = await User.findOne({where: {email: email}});

                if(user != undefined){

                    if(bcrypt.compareSync(password,user.password)){
                        
                        jwt.sign({id: user.id, email: user.email},process.env.TOKEN_SECRET,{expiresIn: "48h"}, (err, token)=>{
                            if(err){
                                res.sendStatus(500);
                            }
                            else{
                                res.status(200).send(token);
                            }
                        })
                    }else{
                        res.status(400).send("usuario ou senha invalidas");
                    }
                }
            }
            catch(err){
                    res.sendStatus(500);
                    console.log(err);

            }
    }
    }

   async user(req,res){
    let{nome, email, password} = req.body;

       try {
            if((nome == undefined) || (email == undefined || password == undefined)){
                res.sendStatus(400);
            }
            else{
               let salt = await bcrypt.genSalt(10);
               let password_hash = await bcrypt.hash(password,salt);

               let result = await User.create({
                    nome,
                    email,
                    password: password_hash
                })

                result = result.dataValues.id ? res.sendStatus(200) : res.sendStatus(500);
                        

            }
       } catch (error) {
           res.sendStatus(500);
           console.log(error);
       }
    }
}

module.exports = new UserController();