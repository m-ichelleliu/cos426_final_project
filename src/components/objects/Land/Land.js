import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './land.gltf';

class Land extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        // Init state
        // this.state = {
        //     gui: parent.state.gui,
        //     //width: null,
        //     //length: null
        // };

        //this.width = 1000;
        //this.length = 1000;

        const loader = new GLTFLoader();

        this.name = 'land';

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });
    }
}

export default Land;
