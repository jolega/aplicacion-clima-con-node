const inquirer = require('inquirer'); // leer campos de consola 
require('colors');

const preguntas= [
    {
        type:'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name:  `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name:  `${'2.'.green} Historial`
            },
            {
                value: 0,
                name:  `${'3.'.green} Salir`
            },
        ]
            
    }
];

const inquirerMenu = async () => {

    console.clear();
    console.log('=============================='.green)
    console.log('   Selecciones una opcion '.white)
    console.log('============================== \n '.green)

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {

    const question = [

        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ];

    await inquirer.prompt(question);
}

const leerInput = async(message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if (value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        
        }
    ]

    const {desc}= await inquirer.prompt(question);
    return desc
}

const listadoLugares = async (lugares = []) =>{


    const choices = lugares.map((lugar, i )=> {

        const idx =`${ i + 1 }.`.green;
        return {
            value: lugar.id,
            name: `${ idx } ${ lugar.nombre }`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'seleccione lugar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async (message) =>{
    const question= [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok}= await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async (tareas = []) =>{


    const choices = tareas.map((tareas, i )=> {

        const idx =`${i+1}.`.green;

        return {
            value: tareas.id,
            name: `${idx} ${tareas.desc}`,
            checked: ( tareas.completadoEn ) ? true : false
         }
    })

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(preguntas);
    return ids;
}

module.exports = {
    inquirerMenu, 
    pausa,
    leerInput,
    listadoLugares,
    confirmar,
    mostrarListadoChecklist  
}