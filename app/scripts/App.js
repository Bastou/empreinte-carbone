// third party
import Vue from 'vue/dist/vue.js';
//import VueRouter from 'vue-router/dist/vue-router.js'; // On abandonne mamene
import VueResource from 'vue-resource/dist/vue-resource.js';
import VueSelect from 'vue-select/dist/vue-select.js';
import Intro from './components/Intro.js';
import Entry from './components/Entry.js';
import Entry2 from './components/Entry2.js';
import Scene from './components/Scene.js';
import Timeline from './components/Timeline.js';
import Scene3D from './Scene3D.js';

export default class App {

    constructor() {

        // init 3d scene
        this.scene3D = new Scene3D();
        const scene3d = this.scene3D;
        //scene3d.init();

        // Main app stuff here

        // Init main
        //Vue.component('v-select', VueSelect.VueSelect)
        Vue.component('v-select', VueSelect);

        Vue.component('timeline', Timeline);


        // Resources
        Vue.use(VueResource);

        // Main vue app
        const vm = new Vue({
            el: '#app',
            data: function () {
                return {
                    // State et pas count pour que toutes les mutations soient détectées
                    state: store.state,
                    selected: null
                }
            },
            components: {
                Intro,
                Entry,
                Entry2,
                Scene
            },
            computed: {
                viewClass: function () {
                    if(this.state.currentView == 'Scene') {
                        return 'scene';
                    } else {
                        return 'introduction'
                    }
                }
            },
            watch: {
                'state.year': function (val) {
                    // Adapt to min year
                    if(this.state.year < this.state.minYear)
                        this.state.year = this.state.minYear;
                    // Update CO2
                    store.updateCo2();
                    // Update scene
                    //scene3d.plane.height = this.state.co2 * 0.01;
                    //console.log(scene3d.plane.height)
                    //scene3d.plane.updateFromCo2()
                    this.state.timelineActive = true;
                },
                'state.country': function () {
                    let countryDataJson = this.state.json.filter(( obj ) => {
                        return obj['Country Name'] == this.state.country;
                    });
                    this.state.countryData = countryDataJson[0];
                    // Update CO2
                    store.updateCo2();
                    //scene3d.plane.updateFromCo2()
                    this.state.timelineActive  = true;
                },
                'state.minYear': function () {
                    this.state.year = this.state.minYear;
                },
				'state.timelineUpdating': function () {
					console.log('timelineUpdating', this.state.timelineUpdating)
				}
            },
            created: function () {

				// Get json data
                this.$http.get('data/climate.json').then(response => {
                    // Fill json
                    this.state.json = JSON.parse(response.bodyText);
                    // Loaded true
                    this.state.load = true;
                    // Fill countries
                    this.state.json.filter((obj) => {
                        this.state.countries.push(obj['Country Name'])
                    });

					// Debug
					//this.state.country = 'Arab World';

                    // Fill min and max
                    //store.updateCo2GlobalMin();
                    //console.log(this.json);
                });
            }
        })

    }

};