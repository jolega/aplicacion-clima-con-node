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
        opt= await inquirerMenu(); // await espera a que se cumpla 
      // console.log(`${opt}` + "\n ");


       switch(opt){
           case 1: {
            // mostrar mensaje
            const termino = await leerInput('Ciudad: ')

            // buscar los lugares
            const lugares = await busquedas.ciudad( termino );

            // seleccionar el lugar
            const id = await listadoLugares(lugares);
            if(id === '1') continue;
           // console.log({id});
            const lugarSel = lugares.find(l => l.id === id); // devuelve el primer elemento del arreglo
          // console.log(lugarSel);
            //Guardar el historial
            busquedas.agregarHistorial(lugarSel.nombre);
          // selecciona el clima
          const clima = await busquedas.climaLugar (lugarSel)

            console.clear();
            console.log('\nInformacion de la ciudad\n'.green)
            console.log('Ciudad: ',lugarSel.nombre.green)
            console.log('Lat: ',lugarSel.lat)
            console.log('lng: ',lugarSel.lng)
            console.log('Temperatura: ',clima.temp)
            console.log('Minima: ',clima.min)
            console.log('Maxima: ',clima.max)
            console.log('Como esta el clima: ',clima.desc.green)

           break;
           }   

           case 2:{ 
             busquedas.historial.forEach((lugar, i) => {
                 const idx = `${ i+1 }.`.green;
                 console.log(`${ idx } ${lugar} `);
             })
            break;
           }         
      }

    console.log();
     await pausa();
    }while(opt !==0)

}



main();