export default class GeomSample {

    constructor({ app }) {

        //this.geometry	= new THREE.TorusGeometry( 1, 0.42 );
        let material	=  new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true });

        this.geometry = new three.PlaneGeometry(600, 600, 300, 300);
        this.geometry.verticesNeedUpdate = true;
        this.mesh	= new THREE.Mesh( this.geometry, this.material );

        app.scene.add( this.mesh);
    }

    animate() {
        this.geometry.rotateY(Math.sin(0.01));
    }

};
