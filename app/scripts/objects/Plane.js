export default class Plane {

    constructor({ app }) {

        this.app = app;
        this.height = 10;
        this.tick = 0;
        this.width = 50;
        this.widthSegments = 30;
        this.geometry = new THREE.PlaneGeometry(this.width, this.width, this.widthSegments, this.widthSegments);
        this.geometry.verticesNeedUpdate = true;
        this.material = new THREE.MeshLambertMaterial({
            color: new THREE.Color('#BD28FD'),
            emissive: new THREE.Color('#BD28FD'),
            //shading: THREE.FlatShading,
            side: THREE.DoubleSide
            //wireframe: true
        });
        this.mesh	= new THREE.Mesh( this.geometry, this.material )

        this.setNoise();

        this.mesh.rotation.x = Math.PI * -0.5
        this.mesh.position.set(0, 0, 0)

        app.camera.lookAt(this.mesh.position)

        app.scene.add( this.mesh)
    }

    setNoise(factor = 1) {
        const len = this.geometry.vertices.length;
        for (let i = 0,j = 1; i < len; i++,j++) {
            //console.log(j);
            if(i > this.widthSegments && i < (len - this.widthSegments) && i % (this.widthSegments + 1) !== 0 && j % (this.widthSegments + 1) !== 0) {
                let v = this.geometry.vertices[i];
                //v.z = this.app.getNoise(v.x * 0.01, v.y * 0.01, v.z * 0.01, 0) * 10;
                v.z = this.app.getNoise((v.x * 0.03) + factor, (v.y * 0.03) + factor, (v.z * 0.03) + factor, 0) * 6;
                //v.z += this.app.getNoise(v.x * 0.1, v.y * 0.125, v.z * 0.125, 0)
                v.z += 10;
            }
        }
    }

    updateHeight() {
        const len = this.geometry.vertices.length;
        for (let i = 0,j = 1; i < len; i++,j++) {
                let v = this.geometry.vertices[i];
                if(i > this.widthSegments && i < (len - this.widthSegments) && i % (this.widthSegments + 1) !== 0 && j % (this.widthSegments + 1) !== 0) {
                    v.z += (this.height - v.z) * 0.1;
                }
        }
    }

    animate () {
        this.tick += 0.0001 * appConfig.speed;
        this.setNoise(this.tick);
        this.updateHeight();
        this.geometry.rotateZ(Math.sin(0.001));
    }

};
