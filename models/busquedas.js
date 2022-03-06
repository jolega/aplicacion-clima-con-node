const axios = require('axios').default;

class Busquedas{

    historial = ['colombia','calarca','armenia']

    constructor(){
        //TODO: leer db si existe
    }

async ciudad (lugar = ''){

    // peticion http
    console.log('ciudad', lugar);
    const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/%20Calarc%C3%A1%2C%20Quind%C3%ADo%20632001%2C%20Colombia.json?language=es&access_token=pk.eyJ1Ijoiam9sZWdhIiwiYSI6ImNsMGVrMTdtaTBqb2gzZG84MmdxN3dxeGUifQ.dziqlpdtfQ9-6PDrxGnQFQ'); // hace la peticion al enpoint
    console.log(resp.data) ;



}

}


module.exports = Busquedas;

