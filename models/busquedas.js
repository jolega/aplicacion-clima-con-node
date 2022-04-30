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

    get paramsOpenWeatherMap() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units' :'metric',
            'lang': 'es'
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
 
    async climaLugar ({lat, lng}){

        try{
    // peticion http
    const instance = axios.create({
        baseURL:`https://api.openweathermap.org/data/2.5/weather`,
        params : {...this.paramsOpenWeatherMap, lat, lon:lng }
    });

      const resp = await instance.get();
    //   console.log(`data  ${lat}, ${lng}`)   
    //   console.log('informacion') ;
    //   console.log(resp.data)     
    //   console.log(resp.data.weather.description)
      
            return {
                 desc: resp.data.weather[0].description,
                 min: resp.data.main.temp_min,
                 max: resp.data.main.temp_max,
                temp: resp.data.main.temp,
              }

         }

         catch(error){
             console.log(error);
         }
    }



}


module.exports = Busquedas;

