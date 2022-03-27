require('dotenv').config()
const {
    inquirerMenu, 
    pausa,
    leerInput,
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

            const lugar = await leerInput('Ciudad: ')
            await busquedas.ciudad( lugar );


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