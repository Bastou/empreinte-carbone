export default class Store {

    constructor () {
        this.state = {
            // On ajoute les props ici
            debug: true,
            currentView: 'Intro',
            load: false,
            json: null,
            countries: [],
            country: null,
            countryData: null,
            year: '1960',
            minYear: '1960',
            maxYear: '2014',
            co2:0,
            co2GlobalMin: 0,
            co2GlobalMax: 0,
            scaler: 0,
            timelineUpdating: false
        }
    }

    updateCo2 () {
            if(this.state.countryData !== null) {
                // Set year key
                let key = Math.round(this.state.year);
                //console.log(this.state.countryData[key])
                // get co2 by key
                this.state.co2 =  this.state.countryData[key]
                // Update 3d
                //scene3d.plane.height = this.state.co2 * 0.01;
            } else {
                return 0;
            }
    }
    updateCo2GlobalMin () {
        // TODO: Get min and max from object
    }
    updateco2GlobalMax () {

    }
}