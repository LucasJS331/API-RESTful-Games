const express          = require('express');
const app              = express();
const bodyParser       = require('body-parser');
const port             = 3000;
const db               = require('./db/connection');
const Games            = require('./models/Games');
const cors             = require('cors');
const User             = require('./models/User');
const bcrypt           = require('bcrypt');
const jwt              = require('jsonwebtoken');
const authMidleware    = require('./middleware/auth');


// basic configuration
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// jwt secret
const secret = "kwnrwrnwk";


app.listen(port,() => {
    console.log('app está rodando');
});

db.authenticate()
.then(()=> console.log('conectou com sucesso'))
.catch(err => console.log(err));



app.get("/games", authMidleware, (req,res)=> {
    // rota que retorna uma lista de games

    const hateoas = [
        {
            href: "http://localhost:3000/game/id",
            method: "GET",
            rel: "get_game"
        },
        {
            href: "http://localhost:3000/game",
            method: "POST",
            rel: "post_game"
        },

        {
            href: "http://localhost:3000/game/id",
            method: "GET",
            rel: "delete_game"
        },

    ]

    async function List(){
        try{
            let games = await Games.findAll({raw: true});

            res.status(200);
            res.json({games, _link: hateoas});
            
        }

        catch(err){
            res.sendStatus(409);
        }
    }

    List();
});

app.get("/game/:id", authMidleware, (req,res)=>{
    // rota que retorna apenas um game


    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }
    else{
        let id = parseInt(req.params.id);

        async function game(){
            let game = await Games.findByPk(id);

            if(game != undefined){
                const hateoas = [
                    {
                        href: "http://localhost:3000/games",
                        method: "GET",
                        rel: "get_games"
                    },
                    {
                        href: "http://localhost:3000/game",
                        method: "POST",
                        rel: "post_game"
                    },
            
                    {
                        href: "http://localhost:3000/game/" + id,
                        method: "PUT",
                        rel: "put_game"
                    },

                    {
                        href: "http://localhost:3000/game/" + id,
                        method: "DELETE",
                        rel: "delete_game"
                    },
            
                ]
                res.json({game, _Links: hateoas});
                res.statusCode = 200;
            } else{
                res.sendStatus(404);
            }
        }

        game();
    }
})

app.post('/game', authMidleware, (req,res)=>{
    // rota para criar coisas
    let {title, year, price} = req.body;
    
    if((price == undefined) || (title == undefined || year == undefined)){

        res.sendStatus(400);

    }
    else{
        if(isNaN(price) || isNaN(year)){
            res.sendStatus(400);
        }
        else{
            let priceV = parseInt(price);
            let yearV = parseInt(year)

            Games.create({
                title,
                price: priceV,
                year: yearV
            });

            res.sendStatus(200);

        }
    }
})

app.delete("/game/:id", authMidleware, (req,res)=>{
    // rota para deletar game
    if(isNaN(req.params.id)){
        // nao for um numero

        res.sendStatus(400);
    } else{
        let id = parseInt(req.params.id);

        Games.destroy({where: {id: id}});

        

        res.sendStatus(200);
        
    }
});

app.put("/game/:id", authMidleware, (req,res)=>{
    // rota para editar um game

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }
    else{
        let id = parseInt(req.params.id);

            let {title,year, price} = req.body;

            if(title != undefined){
              Games.update({title}, {where: {id: id}});
            }

            if(year != undefined){
                if(!isNaN(year)){
                    Games.update({year}, {where: {id: id}});
                }
            }

            if(price != undefined){
                if(!isNaN(price)){
                    Games.update({price}, {where: {id: id}});
                }
            }

            res.sendStatus(200);
        }
})


app.post("/auth", (req,res)=>{
    // rota de autenticação

    let { email, password} = req.body;

    if( email == undefined || password == undefined){
        res.statusCode = 400;
        res.json({err: "campos não podem ser nulos"});
    }
    else{
       async function verificar(){
           try{
               let user = await User.findOne({where: {email: email}});

               if(user != undefined){
                   if(user.password == password){
                       
                    jwt.sign({id: user.id, email: user.email},secret,{expiresIn: "48h"}, (err, token)=>{
                        if(err){
                            res.status(400);
                            res.json({err: "falha interna"});
                        }
                        else{
                            res.status(200);
                            res.json({token: token});
                        }
                    })
                   }else{
                       res.statusCode = 401;
                       res.json({err: "usuario ou senha invalido!"});
                   }
               }
           }
           catch(err){
            res.sendStatus(400);
           }
       }

       verificar();
    }

})

app.post("/user", (req,res)=>{
    let {nome, email, password} = req.body;

    if((nome == undefined) || (email == undefined || password == undefined)){
        res.sendStatus(400);
    }
    else{
        res.sendStatus(200);

        User.create({
            nome,
            email,
            password
        })
    }
})