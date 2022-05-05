const axios = require('axios').default;

class Busquedas{


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
    // petición http
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
      const {weather, main } = resp.data
    //   console.log(`data  ${lat}, ${lng}`)   
    //   console.log('informacion') ;
    //   console.log(resp.data)     
    //   console.log(resp.data.weather.description)
      
            return {
                 desc:      weather[0].description,
                 min:       main.temp_min,
                 max:       main.temp_max,
                temp:       main.temp,
              }

         }

         catch(error){
             console.log(error);
         }
    }

    agregarHistorial( lugar= ''){
        //TODO: prevenir duplicados
        if(this.historial.includes (lugar.toLocaleLowerCase())){
            return ;
        }
        this.historial.unshift( lugar.toLocaleLowerCase);

        // Grabar en db

        guardarDb(){

        }
        
        leerDb(){

        }
    }


}


module.exports = Busquedas;

