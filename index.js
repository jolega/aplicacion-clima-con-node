require('dotenv').config()
const {
    inquirerMenu, 
    pausa,
    leerInput,
    listadoLugares,
    } = require ('./helpers/inquirer.js');
const Busquedas = require('./models/busquedas.js');

//console.log(process.env.MAPBOX_KEY)

const main = async () => {

    const busquedas = new Busquedas();
    let opt = ''

    do{
        opt= await inquirerMenu(); // await espera a que se cumppla 
      // console.log(`${opt}` + "\n ");


       switch(opt){
           case 1: {
            // mostrar mensaje
            const termino = await leerInput('Ciudad: ')

            // buscar los lugares
            const lugares = await busquedas.ciudad( termino );

            // seleccionar el lugar
            const id = listadoLugares(lugares);
            console.log({id});


            console.log('\nInformacion de la ciudad\n'.green)
            console.log('Ciudad: ',)
            console.log('Lat: ',)
            console.log('lng: ',)
            console.log('Temperatura: ',)
            console.log('Minima: ',)
            console.log('Maxima: ',)

           break;
           }   

           case 2:{ 
            break;
           }         
      }

    console.log();
     await pausa();
    }while(opt !==0)

}



main();