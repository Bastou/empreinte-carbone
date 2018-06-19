export default class Store {

    constructor () {
        this.state = {
            // On ajoute les props ici
            debug: false,
            currentView: 'Intro', // For debug : "Scene" else "Intro"
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
    // On Mounted for each vue components
    onMounted() {
        if (window.matchMedia("(min-width: 1025px)").matches) {
            this.hoverFxOnCta();
        }

    }
    hoverFxOnCta() {
        var ctaList = document.querySelectorAll(".CTA");
        if(ctaList.length > 0) {
            ctaList.forEach(function(el) {
                new AttractButton(el);
            });
        }
    }
    updateCo2GlobalMin () {
        // TODO: Get min and max from object
    }
    updateco2GlobalMax () {

    }
}