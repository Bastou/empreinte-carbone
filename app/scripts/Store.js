export default class Store {

    constructor () {
        this.state = {
            // On ajoute les props ici
            debug: false,
            currentView: 'Scene', // For debug : Scene
            load: false,
            json: null,
            countries: [],
            country: null, // Null
            countryData: null,
            year: '1960',
            minYear: '1960',
            maxYear: '2014',
            co2:0,
            co2GlobalMin: 0,
            co2GlobalMax: 0,
            scaler: 0,
            timelineActive: false,
            timelineUpdating: false,
            messages : {
                noCo2: 'Aucune donnée disponible pour cette année'
            }
        };
        this.$timeline = null
    }

    updateCo2 () {
            if(this.state.countryData !== null) {
                // Set year key
                let key = Math.round(this.state.year);
                //console.log(this.state.countryData[key])
                // get co2 by key
                this.state.co2 =  Math.round(this.state.countryData[key] * 1000) / 1000
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