const Games = require('../models/Games');

class GamesController{
   async getAll(req,res){
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
            try{
                let games = await Games.findAll({raw: true});
    
                res.status(200).json({games, _link: hateoas});
                
            }
    
            catch(err){
                res.sendStatus(500);
                console.log(err);
            }
        
    
    }

   async getOne(req,res){
        if(isNaN(req.params.id)){
            res.sendStatus(400);
        }
        else{
            let id = parseInt(req.params.id);

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
                } else{
                    res.sendStatus(404);
                }
          
        }
    }

   async postGame(req,res){
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

                let result = await Games.create({
                    title,
                    price: priceV,
                    year: yearV
                })

                result = result.dataValues.id ? res.sendStatus(200) : res.sendStatus(500);

            }
        }
    }

    deleteGame(req,res){
         // rota para deletar game
        if(isNaN(req.params.id)){
            // nao for um numero
            res.sendStatus(400);

        } else{
            let id = parseInt(req.params.id);

            Games.destroy({where: {id: id}});
            res.sendStatus(200);
            
        }
    }

   async editGame(req,res){
          // rota para editar um game
        if(isNaN(req.params.id)){
            res.sendStatus(400);
        }
        else{
            try {
                let id = parseInt(req.params.id);

                let {title,year, price} = req.body;

                if(title != undefined){
                   await Games.update({title}, {where: {id: id}});
                }

                if(year != undefined){
                    if(!isNaN(year)){
                      await  Games.update({year}, {where: {id: id}});
                    }
                }

                if(price != undefined){
                    if(!isNaN(price)){
                       await Games.update({price}, {where: {id: id}});
                    }
                }

                res.sendStatus(200);
            } catch (error) {
                res.sendStatus(500);
            }    
        }
    }

}

module.exports = new GamesController();