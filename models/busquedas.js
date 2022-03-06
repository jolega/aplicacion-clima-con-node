const axios = require('axios').default;

class Busquedas{

    historial = ['colombia','calarca','armenia']

    constructor(){
        //TODO: leer db si existe
    }

    get paramsMapbox() {
        return {
            'access_token':`pk.eyJ1Ijoiam9sZWdhIiwiYSI6ImNsMGVrMTdtaTBqb2gzZG84MmdxN3dxeGUifQ.dziqlpdtfQ9-6PDrxGnQFQ`,
            'language':'es',
            'limit': 5
        }
    }

async ciudad (lugar = ''){

    try{
    // peticion http
    const instance = axios.create({
        baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params : this.paramsMapbox
    });

    const resp = await instance.get();
    console.log(resp.data) ;
    }
    catch{

    }

}

}


module.exports = Busquedas;

