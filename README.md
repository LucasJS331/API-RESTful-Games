# 🎮 API DE GAMES 🎮

Está é uma api RestFull utilizada para gestão de games cadastrados no banco de dados.

Atenção!

Apenas as EndPoints do verbo GET estão livres de autentificação, por questões de segurança.



## 🚩EndPoints 🚩

## POST/ auth

Esse EndPoint é responsavel por autenticar o usuário.

### Parametros

*Email: Email do usuário cadastrado do sistema

*password: Senha do usuário cadastrado do sistema

```
{
    "password": "123456",
    "email": "@example.com"
}   
```

### Respostas

### Ok! 200

Caso esta resposta acontença você ira receber o token.
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJAbHVjYXMuY29tIiwiaWF0IjoxNjEyMTEwNTg2LCJleHAiOjE2MTIyODMzODZ9.8exL7fMcmShBrthpK15sc9mnU6pVoFOWTvbN6fmTZJg"
}
```

### Erro de autentificação! 401

Este erro ocorre com o problema de autentificação do usuário.
```
{
    "err": "usuário ou senha incorretos!"
}

```



## GET/ games

Esse EndPoint é responsavel por retornar toda a nossa lista de games disponiveis 

### Parametros

Nenhum

### Respostas

### Ok! 200

Caso esta resposta acontença você ira receber a listagem de todos os games
```
{
    "games": [
        {
            "id": 2,
            "title": "LOL s3",
            "year": 2013,
            "price": 0,
            "createdAt": "2021-01-27T04:12:11.000Z",
            "updatedAt": "2021-01-28T18:36:28.000Z"
        },
        {
            "id": 4,
            "title": "Path of Titans",
            "year": 2020,
            "price": 80,
            "createdAt": "2021-01-27T18:33:16.000Z",
            "updatedAt": "2021-01-27T18:33:16.000Z"
        }
    ]
}
```


## GET/ game/ID

Esse EndPoint é responsavel por retornar um game especifico! 

### Parametros

Id: é preciso indicar o ID do game no final da endpoint.

### Respostas

### Ok! 200

Caso esta resposta acontença você ira receber os dados do game escolhido.
```
{
    "game": {
        "id": 2,
        "title": "Lol S4",
        "year": 2013,
        "price": 0,
        "createdAt": "2021-01-27T04:12:11.000Z",
        "updatedAt": "2021-07-19T14:47:50.000Z"
    }
```

### Bad request! 400

Acontece quando o ID for de um formato invalido.
```
{
    "err": "ID invalido!"
}

```

## POST/ game

Esse EndPoint é responsavel por registrar um novo game! 

### Parametros

*title: titulo do game

*year: ano de lançamento do game

*price: preço atual do game

### Respostas

### Ok! 200

Caso esta resposta acontença você ira receber um sinal de sucesso!
```
{sucesso: "o game foi cadastrado com sucesso!"}
```

### Bad request! 400

Acontece quando um dos parametros for invalido.
```
{
    "err": "parametros invalidos!"
}

```


### Erro de autorização! 401

```
{
    "err": "você precisa estar autenticado!"
}

```

## PUT/ game/ID

Essa EndPoint é responsavel por editar um  game! 

### Parametros
*ID: ID do game selecionado

title: novo titulo do game

year: ano de lançamento do game

price: preço atualizado do game

### Respostas

### Ok! 200

Caso esta resposta acontença você ira receber um sinal de sucesso!
```
{sucesso: "o game foi editado com sucesso!"}
```

### Bad request! 400

Acontece quando ID for invalido.
```
{
    "err": "ID invalido!"
}

```

### Erro de autorização! 401

```
{
    "err": "você precisa estar autenticado!"
}

```

## DELETE/ game/ID

Esse EndPoint é responsavel por deletar um  game! 

### Parametros

*ID: ID do game selecionado

### Respostas

### Ok! 200

Caso esta resposta acontença você ira receber um sinal de sucesso!
```
{sucesso: "o game foi editado com sucesso!"}
```

### Bad request! 400

Acontece quando o ID for invalido.
```
{
    "err": "ID invalido!"
}

```

### Erro de autorização! 401

```
{
    "err": "você precisa estar autenticado!"
}

```

## POST/ user

Esse EndPoint é responsavel por registrar um novo usuário no banco de dados! 

### Parametros

*email: email do usuário

*password: senha do usuário

### Respostas

### Ok! 200

Caso esta resposta acontença você ira receber um sinal de sucesso!
```
{sucesso: "o usuário foi cadastrado com sucesso!"}
```

### Bad request! 400

Acontece quando um dos parametros for invalido.
```
{
    "err": "parametros invalidos!"
}

```

### Erro de autorização! 401

```
{
    "err": "você precisa estar autenticado!"
}

```





