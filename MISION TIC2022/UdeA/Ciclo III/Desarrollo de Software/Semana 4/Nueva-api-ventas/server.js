//hacer import de express tradicional
//const express = require('express');
//forma nueva de import en express
import Express from "express";
import { MongoClient } from "mongodb";
import Cors from 'cors';

const stringConexion="mongodb+srv://nairor:4029@lanevada.ypfte.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(stringConexion, {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const app = Express();
app.use(Express.json());
app.use(Cors());

app.get('/Productos',(req, res)=>{
    console.log("Alguien hizo get en la ruta /productos");
    conexion.collection('Productos').find({}).limit(50).toArray((err, result)=>{
            if (err) {
                res.status(500).send('Error consultando los productos');
            }else{
                res.json(result);
            }
        });
  });

app.post('/Productos/nuevo', (req, res)=>{
    const datosProducto = req.body;
    console.log('llaves', Object.keys(datosProducto));
    
        if(
            Object.keys(datosProducto).includes('name') &&
            Object.keys(datosProducto).includes('type') &&
            Object.keys(datosProducto).includes('amount')
            ){
            //implementar código para crear Producto en la DB
            conexion.collection('Productos').insertOne(datosProducto, (err, result)=>{
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                }else{
                    console.log(result);
                    res.sendStatus(200);
            }
        });
    
    }
});

let conexion;

const main = ()=>{
    client.connect((err, db)=>{
        if(err){
            console.error("Error conectando a la base de datos");
        }
        conexion = db.db('La-Nevada');
        console.log('Conexión exitosa');
        return app.listen(5000,()=>{
            console.log('escuchando puerto 5000')
    })
    })

}

main();