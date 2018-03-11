// third party
import Dat from 'threejs-utils/lib/dat.gui.min.js';
import Simplex from './vendors/simplex-noise.js';
// scene objects3D
import Plane from './objects3D/Plane.js';

export default class Scene3D {

    constructor() {
        this.controls = null;
        //this.planeHeight = getPlaneHeight()

        // Time
        this.clock = new THREE.Clock();
        this.delta = 0;
        this.time = 0;

        // Mouse
		this.mouse = {x:0,y:0};

		// Camera
		this.cameraMoves = {x:0,y:0,z:-0.1,move:false,speed:2};

        // Simplex
        this.simplex = new Simplex();

        // this.scaler

        // Colors
        this.colors = [
            ['#7074FF', '#BD28FD'],
            ['#7074FF', '#BD28FD'],
            ['#00ECBC', '#2A9BF9'],
            ['#FFE19B', '#FC9696'],
            ['#8B9AB2', '#FCFCFC'],
            ['#2D6BDF', '#89F7FE'],
            ['#20E26C', '#FEFFBF'],
            ['#FF7B31', '#FFF376'],
            ['#FFD8B9', '#F71B3A'],
        ];

        this.sceneColors = null;


    }

    init() {

        // Colors
        this.sceneColors = this.getRandomColors();

        this.container = document.querySelector('#scene');
        //document.body.appendChild(this.container);

        // Camera
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10000);
        //this.debugCamera = appConfig.debugCamera;

        this.scene = new THREE.Scene();

        // init objects3D scene
        this.plane = new Plane({
            app: this
        });

        // lights
        this.lightGroup = new THREE.Group();
        this.bottomLight = null;
        this.ambientLight = null;
        this.initLights();


        // Set Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.onWindowResize();

        this.renderer.animate(this.render.bind(this));

        //this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.camera.position.set( 0, 70, 130);
        this.camera.lookAt(this.plane.mesh.position);
        //this.controls.update();


		// Conflicting with auto camera plane height pos
		//this.mouseMove();

        // GUI
        //if(appConfig.gui) this.initGui();
    }

    render() {
        //console.log(Math.round(Math.random() * this.colors.length))
        // time stuff
        this.delta = this.clock.getDelta();
        this.time = this.clock.getElapsedTime();

        // Update scaler
        this.scaler = this.getScaler();

        // animate plane
        this.plane.animate();

        // Lights
        this.updateLights();

        this.updateCamera();

        // plane data
        //console.log(this.plane.height);

        //this.controls.update();

        // render stuff
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Faire une class pour les lights
    initLights() {

        // Main ambiant light
        this.ambientLight = new THREE.AmbientLight(0xC6C6C6);
        this.ambientLight.intensity = 0.5;
        this.ambientLight.name = "ambiant light";

        // Bottom light
        this.bottomLight = new THREE.PointLight(0xC6C6C6);
        this.bottomLight.position.set(26, 36, 39);
        this.bottomLight.intensity = 0.5;
        this.bottomLight.name = "bottomLight";

        // Light color 2
        const pointLight = new THREE.PointLight(this.sceneColors[0]);
        pointLight.position.set(20, 0.2, 10);
        pointLight.intensity = 1;


        // Dark left
        const pointLight2 = new THREE.PointLight(new THREE.Color('#FFFFFF'))
        pointLight2.position.set(-31, -7, 31)
        pointLight2.intensity = -1.44;
        //this.scene.add(ambientLight)

        // Dark center
        const pointLight3 = new THREE.PointLight(new THREE.Color('#FFFFFF'))
        pointLight3.position.set(0, 0.2, 0)
        pointLight3.intensity = -0.55;
        //this.scene.add(ambientLight)

        // Dark right
        const pointLight4 = new THREE.PointLight(new THREE.Color('#FFFFFF'))
        pointLight4.position.set(23, -15, 35)
        pointLight4.intensity = -1.8;
        //this.scene.add(ambientLight)

        // Add them to scene
        this.scene.add(this.ambientLight);
        this.scene.add(this.bottomLight);

        this.lightGroup.add(pointLight);
        this.lightGroup.add(pointLight2);
        this.lightGroup.add(pointLight3);
        this.lightGroup.add(pointLight4);
        this.scene.add(this.lightGroup);

        /*
        var sphereSize = 4;
        var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        this.scene.add( pointLightHelper );

        var sphereSize = 2;
        var pointLightHelper2 = new THREE.PointLightHelper( pointLight2, sphereSize );
        this.scene.add( pointLightHelper2 );


        var sphereSize = 2;
        var pointLightHelper4 = new THREE.PointLightHelper( pointLight4, sphereSize );
        this.scene.add( pointLightHelper4 );

        var sphereSize = 1;
        var pointLightHelper4 = new THREE.PointLightHelper( this.bottomLight, sphereSize );
        this.scene.add( pointLightHelper4 );
        */
    }

    updateCamera() {
		this.camera.position.z += (tools.map_range([1, 330], [130, 500], this.scaler) - this.camera.position.z) * 0.05;
        //this.camera.position.z = this.cameraPosZ;
        this.camera.position.y += (tools.map_range([1, 330], [70, 500], this.scaler) - this.camera.position.y) * 0.05;
        //this.camera.position.z += (tools.map_range([1, 330], [70, 600], this.scaler) - this.camera.position.y) * 0.05;
    }

    updateLights() {
        this.lightGroup.position.y += (this.plane.height - this.lightGroup.position.y) * 0.1;
        this.bottomLight.intensity = tools.map_range([1, 330], [1, 4], this.scaler);
        //console.log( this.ambiantLight );
        this.ambientLight.intensity = tools.map_range([1, 330], [0.5, 2], this.scaler);
        //console.log(this.bottomLight.intensity);
    }

    getNoise(x, y, z, t) {
        return this.simplex.noise4D(x, y, z, t);
    }

    getRandomColors() {
        const selectColors = this.colors[Math.floor(Math.random() * this.colors.length)];
        return selectColors.map(color => new THREE.Color(color))
    }

    getScaler() {
        //console.log(tools.map_range(store.state.co2, 500, 2000000, 1, 330))
        //return tools.map_range(store.state.co2, 500, 2000000, 1, 330)
        // TODO: debug somethong wrong with the map range
        return tools.map_range([500, 2000000], [1, 330], store.state.co2)
    }
    // TODO: Move in parent
    initGui() {
        // GUI
        this.gui = new Dat.GUI();
        //this.gui.add(appConfig, 'debug');
    }

    mouseMove() {
		window.addEventListener('mousemove', (e) => {

			this.camera.position.x += Math.max(Math.min((e.clientX - this.mouse.x) * 0.08, this.cameraMoves.speed), -this.cameraMoves.speed);
			this.camera.position.y += Math.max(Math.min((this.mouse.y - e.clientY) * 0.06, this.cameraMoves.speed), -this.cameraMoves.speed);


			this.mouse.x = e.clientX;
			this.mouse.y = e.clientY;

			this.camera.lookAt(this.plane.mesh.position);

		})
	}
};