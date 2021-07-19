const express = require('express');
const app = express();
const port = 3000;
const db = require('../db/connection');
const cors = require('cors');
const gamesRouter = require("../routes/gamesRoute");
const userRouter = require("../routes/userRoute");


db.authenticate()
.then(()=> console.log('conectou com sucesso'))
.catch(err => console.log(err));

// basic configuration
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use("/", gamesRouter);
app.use("/", userRouter);

app.listen(port,() => {
    console.log('app está rodando');
});


