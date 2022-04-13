const axios = require('axios').default;

class Busquedas{

    historial = ['colombia','calarca','armenia']

    constructor(){
        //TODO: leer db si existe
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
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
   // console.log(resp.data.features) ;
    return resp.data.features.map(lugar => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1]
    }));
    }
    catch{
        return [];
    }

}

}


module.exports = Busquedas;

