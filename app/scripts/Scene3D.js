// TODO: optimize 3D animation
// third party
import Dat from 'threejs-utils/lib/dat.gui.min.js';
import Simplex from './vendors/simplex-noise.js';
// scene objects3D
import Plane from './objects3D/Plane.js';

export default class Scene3D {

    constructor() {
        this.controls = null;

        // Time
        this.clock = new THREE.Clock();
        this.delta = 0;
        this.time = 0;

        // Mouse
		this.mouse = {x:0,y:0};

		// Camera
		this.cameraMoves = {x:0,y:0,z:-0.1,move:false,speed:1};
		this.cameraTargetShift = new THREE.Vector3( 0, 5, 0); // Permet de voir le plane légerement en dessous de la date
		this.cameraTarget = null;

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
            ['#FF7B31', '#FFF376'],
            ['#FFD8B9', '#F71B3A'],
        ];

        this.sceneColors = null;

        this.pointLights = {
        	"mainPointLight": {
        		obj: null,
        		color: 0xffffff,
				intensity: 0.4,
				initPos: {
        			x:-40,
					y:5,
					z:40
				}
			},
			"pointLightColor": {
        		obj: null,
				color: 0x000000,
				intensity: 1.3,
				initPos: {
					x:15,
					y:15,
					z:5
				}
			},
			"pointLightDarkenCenter": {
        		obj: null,
				color: 0xFFFFFF,
				intensity: -0.7,
				initPos: {
					x:0,
					y:-4,
					z:0
				}
			},
			"pointLightDarkRight": {
        		obj: null,
				color: 0xFFFFFF,
				intensity: -2.2,
				initPos: {
					x:23,
					y:-15,
					z:35
				}
			}
		}


    }

    init(callback) {

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

        // Camera
		this.cameraTarget = this.plane.mesh.position.clone().add(this.cameraTargetShift)
        this.camera.position.set( 0, 10, 80); //0,5, 70
        this.camera.lookAt(this.cameraTarget);

		//this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        //this.controls.update();


		// Conflicting with auto camera plane height pos
		//this.mouseMove();

        // GUI
        //if(appConfig.gui) this.initGui();

		this.callback = callback()
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

        // Mouse move camera update x
		this.mouseMove();

		// update camera pos
        this.updateCamera();

		//tools.Log(this.cameraTarget.y);
        // plane data
        //console.log(this.plane.height);

        //this.controls.update();

        // render stuff
        this.renderer.render(this.scene, this.camera);

        // Callback in first frame of render -> signify its loaded
        tools.once(this.callback)
    }

    onWindowResize() {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Faire une class pour les lights
    initLights() {

        this.ambientLight  = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(this.ambientLight );

		this.pointLights.pointLightColor.color = this.sceneColors[0]

		for (const key in this.pointLights) {
			if (!this.pointLights.hasOwnProperty(key)) continue;
				const light = this.pointLights[key];
				light.obj = new THREE.PointLight(light.color)
				light.obj.position.set(light.initPos.x, light.initPos.y, light.initPos.z)
				light.obj.intensity = light.intensity
				this.lightGroup.add(light.obj);
		}

		this.scene.add(this.lightGroup);

		// HELPERS
        // let sphereSize = 4;
        // const pointLightHelper = new THREE.PointLightHelper( this.pointLights.pointLightColor.obj, sphereSize );
        // this.scene.add( pointLightHelper );

        // sphereSize = 2;
        // const pointLightHelper3 = new THREE.PointLightHelper( this.pointLights.pointLightDarkenCenter.obj, sphereSize );
        // this.scene.add( pointLightHelper3 );

        //
        // var sphereSize = 1;
        // var pointLightHelper4 = new THREE.PointLightHelper( this.bottomLight, sphereSize );
        // this.scene.add( pointLightHelper4 );

    }

    updateCamera() {
		this.camera.position.y += (tools.map_range([1, 330], [5, 550], this.scaler) - this.camera.position.y) * 0.05;
		this.camera.position.z += (tools.map_range([1, 330], [70, 300], this.scaler) - this.camera.position.z) * 0.05;
		this.cameraTarget.y += (tools.map_range([1, 330], [-15, 220], this.scaler) - this.cameraTarget.y) * 0.05;

		this.camera.lookAt(this.cameraTarget);
    }

    updateLights() {
    	// Update lightgroup y pos
        this.lightGroup.position.y += (this.plane.height - this.lightGroup.position.y-6) * 0.08;

        // Update pointLightColor pos
        this.pointLights.pointLightColor.obj.position.x = this.co2Scale(this.pointLights.pointLightColor.initPos.x, 30)
        this.pointLights.pointLightColor.obj.position.y = this.co2Scale(this.pointLights.pointLightColor.initPos.y, 75)

		// Update center darker light
		this.pointLights.pointLightDarkenCenter.obj.position.y = this.co2Scale(this.pointLights.pointLightDarkenCenter.initPos.y, 20)


		// Update left darker
		this.pointLights.pointLightDarkRight.obj.intensity = Math.min(tools.map_range([1, 15], [this.pointLights.pointLightDarkRight.intensity, -1], this.scaler), -0.5);
        //this.bottomLight.intensity = tools.map_range([1, 330], [1, 4], this.scaler);
        //console.log( this.ambiantLight );
        //this.ambientLight.intensity = tools.map_range([1, 330], [0.5, 2], this.scaler);
        //console.log(this.bottomLight.intensity);
    }

    getNoise(x, y, z, t) {
        return this.simplex.noise4D(x, y, z, t);
    }

    getRandomColors() {
		let selectColors = this.colors[Math.floor(Math.random() * this.colors.length)];
		selectColors = selectColors.map(color => {
			color = tools.colorLuminance(color, (Math.random() - 0.5)/2)
			return new THREE.Color(color)
		})
		if(Math.round(Math.random())) {
			selectColors.reverse()
		}
		return selectColors
    }

    getScaler() {
        //console.log(tools.map_range(store.state.co2, 500, 2000000, 1, 330))
        //return tools.map_range(store.state.co2, 500, 2000000, 1, 330)

        // TODO: debug somethong wrong with the map range
		let result = tools.map_range([500, 1000000], [1, 330], store.state.co2);
        return result
    }
    co2Scale(initVal, maxVal) {
    	return tools.map_range([1, 330], [initVal, maxVal], this.scaler);
	}
    // TODO: Move in parent
    initGui() {
        // GUI
        this.gui = new Dat.GUI();
        //this.gui.add(appConfig, 'debug');
    }
	// TODO : event listener out of the raf
    mouseMove() {
		this.cameraMoves.speed = tools.map_range([1, 330], [1, 4], this.scaler);
		window.addEventListener('mousemove', (e) => {this.moveCameraFromMouse(e)})

	}
	moveCameraFromMouse(e) {
		if(!store.state.timelineUpdating) {
			this.camera.position.x -= Math.max(Math.min((e.clientX - this.mouse.x) * 0.08, this.cameraMoves.speed), -this.cameraMoves.speed);
			this.mouse.x = e.clientX;
		}
	}
};