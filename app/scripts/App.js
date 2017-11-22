// third party
import Vue from 'vue/dist/vue.js';
import VueResource from 'vue-resource/dist/vue-resource.js';
import Data from './Data.js';
import Scene3D from './Scene3D.js';
import Timeline from './components/Timeline.js';

export default class App {

    constructor() {
        this.scene3D = new Scene3D();
        this.data = new Data();
        this.timeline = new Timeline();

        /*
         * Load json
         */
        // Call to function with anonymous callback
        var jsonTest = null;
        this.data.loadJSON('/climate.json', function(response) {
            // Do Something with the response e.g.
            let jsonresponse = JSON.parse(response);

            // Assuming json data is wrapped in square brackets as Drew suggests
            jsonTest = jsonresponse[0];
            //console.log(jsonTest);
        })

        let scene3d = this.scene3D;

        // Main app stuff here
        Vue.use(VueResource);
        const vm = new Vue({
            el: '#app',
            data: {
                debug: true,
                json: null,
                load: false,
                country: null,
                year: '1994'
            },
            computed: {
                co2: function() {
                    let key = Math.round(this.year);
                    return this.json[0][key]
                }
            },
            watch: {
                year: function (val) {
                    //console.log(scene3d);
                    scene3d.plane.height = val * 0.01;
                    console.log(scene3d.plane.height)
                },
                debug: function (val) {
                    console.log(appConfig.debug, val)
                }
            },
            created: function () {
                this.$http.get('/climate.json').then(response => {
                    this.json = JSON.parse(response.bodyText);
                    this.load = true;
                    //console.log(this.json);
                });
            }
        })

    }

};