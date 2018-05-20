export default class Plane {

    constructor({ app }) {

        this.app = app; // Refactor to scene
        this.baseHeight = 5;
        this.height = this.baseHeight;
        this.scaler = 0;
        this.tick = 0;
        this.width = 45;
        this.widthSegments = 30;
        this.geometry = new THREE.PlaneGeometry(this.width, this.width, this.widthSegments, this.widthSegments);
        this.geometry.verticesNeedUpdate = true;
        this.material = new THREE.MeshLambertMaterial({
			color: this.app.sceneColors[1], //this.app.sceneColors[1],
			lightMap: null,
			lightMapIntensity: 1,
			emissive: 0x000000,
			emissiveMap: null,
			emissiveIntensity: 0.5,
			specularMap: null,
			//wireframe: true
        });
        this.mesh = new THREE.Mesh( this.geometry, this.material )

        // Array of vertices that gonna be updated
        this.activeVertices = this.getActiveVertices();

        // On cache les 2 petits triangles qui dépassent
		this.hidePetitsBoutsQuiDepassent();

        // Noise
        this.baseAmplitude = 3;
        this.noiseRatio = this.getNoiseRandRatio();
        //console.log(this.noiseRatio);
        this.setNoiseHeight();


        // Position height
        this.mesh.rotation.x = Math.PI * -0.5
        this.mesh.position.set(0, -20, 0) // -20

        // Tween stuff
        this.iterationCount = 0;
        this.totalIterations = 1 * 60;

        app.scene.add(this.mesh)

    }

    getActiveVertices() {
        const len = this.geometry.vertices.length;
        const vArray = [];
        for (let i = 0,j = 1; i < len; i++,j++) {
            if(i > this.widthSegments && i < (len - this.widthSegments) && i % (this.widthSegments + 1) !== 0 && j % (this.widthSegments + 1) !== 0) {
                vArray.push(this.geometry.vertices[i]);
            }
        }
        return vArray;
    }

    hidePetitsBoutsQuiDepassent() {
		//this.geometry.vertices[0].y += 1;
		this.geometry.vertices[1].x -= 1.5;


		//this.geometry.vertices[this.geometry.vertices.length - 1].y += 0; // +5
        this.geometry.vertices[this.geometry.vertices.length - 1].x -= 1; // +5
		this.geometry.vertices[this.geometry.vertices.length - 2].x += 1.5;
	}

	getNoiseRandRatio() {
        const result = (Math.floor(Math.random() * 50) + 11) * 0.001;
        console.log(result);
        return result;
    }

    setNoiseHeight(factor = 1, scale = this.baseHeight, amplitude = 0) {
        const len = this.activeVertices.length;
        for (let i = 0;i < len; i++) {
            let v = this.activeVertices[i];
            let noise = this.app.getNoise((v.x * this.noiseRatio) + factor, (v.y * this.noiseRatio) + factor, (10 * this.noiseRatio) + factor, 0) * (amplitude + this.baseAmplitude);
            //v.z += this.app.getNoise(v.x * 0.1, v.y * 0.125, v.z * 0.125, 0)
            v.z += ((scale + noise) - v.z) * 0.06;
            //v.z = Easing['easeOutCubic']( this.app.time, v.z, (store.state.co2 * 0.01 + noise) - v.z, this.totalIterations);
        }
    }

    // TODO: Remove
    updateFromCo2() {
        //TweenLite.to(this.activeVertices, 0.5, {z:store.state.co2 * 0.01})
        console.log(store.state.timelineActive);
        if(store.state.timelineActive == true) {
            const len = this.activeVertices.length;
            let update = 0;
            for (let i = 0;i < len; i++) {
                let v = this.activeVertices[i];
                //v.z += (store.state.co2 * 0.01 - v.z) * 0.01;
                //= update;
                v.z = Easing['easeOutCubic']( this.app.time, v.z, (store.state.co2 * 0.01) - v.z, this.totalIterations);
                console.log(v.z )
                if (this.iterationCount > this.totalIterations) {
                    store.state.timelineActive = false;
                }
                this.iterationCount++;
            }
        }
    }

    animate () {
        this.tick += 0.0001 * appConfig.speed;
        //this.scaler = store.state.co2 * 0.0001;
        this.height = this.baseHeight + this.app.scaler;
        this.setNoiseHeight(this.tick, this.height, this.app.scaler * 0.3);
        //this.updateFromCo2();
        store.state.scaler = this.app.scaler;
        this.geometry.rotateZ(Math.sin(0.0008));
    }

};
