//hacer import de express tradicional
//const express = require('express');
//forma nueva de import en express
import Express from "express";

const app = Express();
app.use(Express.json());

app.get('/vehiculos',(req, res)=>{
    console.log("Alguien hizo get en la ruta /vehiculos");
    const vehiculos =[
        {nombre: 'corola', marca: 'toyota', modelo:'2014'},
        {nombre: 'yaris', marca: 'toyota', modelo:'2016'},
        {nombre: 'festa', marca: 'ford', modelo:'2018'},
        {nombre: 'cx30', marca: 'mazda', modelo:'2020'}
    ];
    res.send(vehiculos);
});

app.post('/vehiculos/nuevo', (req, res)=>{
    const datosVehiculo = req.body;
    console.log('llaves', Object.keys(datosVehiculo));
    try {
        if(
            Object.keys(datosVehiculo).includes('name') &&
            Object.keys(datosVehiculo).includes('brand') &&
            Object.keys(datosVehiculo).includes('model')
            ){
            //implementar código para crear vehiculo en la DB
            res.sendStatus(200);

            }else{
                res.sendStatus(500);
            }
    } catch {
        res.sendStatus(500);
    }
});



app.listen(5000,()=>{
    console.log('escuchando puerto 5000')
})