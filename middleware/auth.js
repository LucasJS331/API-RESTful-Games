const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const authToken = req.headers["authorization"];

    if(authToken != undefined){
        let baarer = authToken.split(" ");
        const token = baarer[1];

        jwt.verify(token,process.env.TOKEN_SECRET, (err, data)=>{
            if(err){
                res.status(401).send("token não autorizado!");
            }
            else{
                res.status(200);
                
                //cria uma variavel dentro do objeto de requisição
                req.userStatus = {id: data.id, email: data.email};
                next();
            }
        });
    }
    else{
        res.status(401).send("token requerido!");
    }
      
}

module.exports = auth;