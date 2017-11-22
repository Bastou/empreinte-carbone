// third party
import Dat from 'threejs-utils/lib/dat.gui.min.js';
import Simplex from './vendors/simplex-noise.js';
// scene objects
import Plane from './objects/Plane.js';

export default class Scene3D {

    constructor() {
        this.controls = null;
        this.planeData = {
            height: 0
        }

        // Simplex
        this.simplex = new Simplex();

        // TODO: fun init outside constructor
        this.container = document.querySelector('#scene');
        document.body.appendChild(this.container);

        // Camera
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10000);
        //this.debugCamera = appConfig.debugCamera;

        this.scene = new THREE.Scene();

        // init objects scene
        this.plane = new Plane({
            app: this
        });


        // lights
        this.initLights();


        // Set Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.onWindowResize();

        this.renderer.animate(this.render.bind(this));

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.camera.position.set( 0, 40, 70);
        this.controls.update();

        // GUI
        if(appConfig.gui) this.initGui();


    }

    render() {

        // animate stuff
        this.plane.animate();

        // plane data
        //console.log(this.plane.height);

        this.controls.update();

        // render stuff
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    initLights() {
        //const ambientLight = new THREE.AmbientLight(0xaaaaaa)
        // Point color 1
        const pointLight = new THREE.PointLight(new THREE.Color('#7074FF'))
        pointLight.position.set(20, 25, 10)
        pointLight.intensity = 1;


        // Point light color 2
        const pointLight2 = new THREE.PointLight(new THREE.Color('#FFFFFF'))
        pointLight2.position.set(-40, 15, 15)
        pointLight2.intensity = -1.52;
        //this.scene.add(ambientLight)

        // Point light color 3
        const pointLight3 = new THREE.PointLight(new THREE.Color('#FFFFFF'))
        pointLight3.position.set(0, 25, 0)
        pointLight3.intensity = -0.48;
        //this.scene.add(ambientLight)


        this.scene.add(pointLight);
        this.scene.add(pointLight2);
        this.scene.add(pointLight3);


        var sphereSize = 4;
        var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        this.scene.add( pointLightHelper );

        var sphereSize = 2;
        var pointLightHelper2 = new THREE.PointLightHelper( pointLight2, sphereSize );
        this.scene.add( pointLightHelper2 );
    }

    getNoise(x, y, z, t) {
        return this.simplex.noise4D(x, y, z, t);
    }
    // TODO: Move in parent
    initGui() {
        // GUI
        this.gui = new Dat.GUI();
        //this.gui.add(appConfig, 'debug');
    }
};