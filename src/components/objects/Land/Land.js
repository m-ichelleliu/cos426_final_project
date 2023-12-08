import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './land.gltf';
import * as THREE from 'three';

class Land extends Group {
   
    constructor() {
        var LAND_DIMENSIONS = new THREE.Vector3();
        
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            // gui: parent.state.gui,
            dimensions: null
            //width: null,
            //length: null
        };

        //this.width = 1000;
        //this.length = 1000;

        const loader = new GLTFLoader();

        this.name = 'land';

        loader.load(MODEL, (gltf) => {
            gltf.scene.position.x = 0;
            gltf.scene.position.y = 0;
            gltf.scene.position.z = 0;
            gltf.scene.scale.set(4, 4, 4);
            // gltf.scene.rotateY(2*Math.PI*.165);
            // gltf.scene.rotation.set(0, 0, 0);
            const boundingBox = new THREE.Box3().setFromObject(gltf.scene);

            // Get the dimensions
            this.state.dimensions = boundingBox.getSize(new THREE.Vector3());
            LAND_DIMENSIONS = boundingBox.getSize(new THREE.Vector3());
            console.log(LAND_DIMENSIONS.x);
            console.log('Model Dimensions:', this.state.dimensions.x, this.state.dimensions.y, this.state.dimensions.z);
            this.add(gltf.scene);
        });
    }
}

export default Land;
