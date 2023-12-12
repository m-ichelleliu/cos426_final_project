import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Hooded_Adventurer.glb';
import * as THREE from 'three';

class PlayerB extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // need to generate initial random position
        // make sure it doesn't overlap w other objects

        // Init state
        this.state = {
            // gui: parent.state.gui,
            // pos: smth
            direction: null, // whether it moves x or y
            position: null,
            speed: null
        };

        // make player B start at upper right corner
        const startPos = new THREE.Vector3(1,0,0);
        this.position.add(startPos);

        // decide direction
        this.direction = new THREE.Vector3(0, 1, 0);

        this.speed = 0.05;
        // check that it doesnt overlap, otherwise bounce

        this.name = 'playerB';
        this.addPlayerB();

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    addPlayerB() {
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            gltf.scene.position.x = this.position.x;
            gltf.scene.position.y = this.position.y;
            gltf.scene.position.z = this.position.z;
            const SCALE = 1.5;
            gltf.scene.scale.set(SCALE, SCALE, SCALE);
            this.add(gltf.scene);
        });
    }

    // move in same direction (x or y) for now
    update(timeStamp) {
        // const floorWidth = 10;
        // const floorHeight = 5;

        // // updating direction of table if it reaches edge of floor
        // let newPos = this.position.clone().add(this.direction.clone().multiplyScalar(this.speed));
        // if (newPos.x < -6 || newPos.x > 6) {
        //     this.direction = new THREE.Vector3(this.direction.x * -1, 0, 0);
        // }
        // if (newPos.y < 0.2 || newPos.y > floorHeight) {
        //     this.direction = new THREE.Vector3(0, this.direction.y * -1, 0, 0);
        // }

        // // update position of table
        // this.position.add(this.direction.clone().multiplyScalar(this.speed));

    }

}

export default PlayerB;