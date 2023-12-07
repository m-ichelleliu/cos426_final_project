import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './table.glb';
import * as THREE from 'three';

class Table extends Group {
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
        this.position.add(new THREE.Vector3(10, 10, 10).random()); //SCALE LATER 

        // decide direction 
        let rand = Math.random();
        if (rand <= 0.5) {
            this.direction = new THREE.Vector3(0, 1, 0);
        } else {
            this.direction = new THREE.Vector3(1, 0, 0);
        }

        this.speed = 0.1;
        // check that it doesnt overlap, otherwise bounce

        this.name = 'table';
        this.addTable();
        
        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    addTable() {
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            gltf.scene.position.x = this.position.x;
            gltf.scene.position.y = this.position.y;
            gltf.scene.position.z = this.position.z;

            this.add(gltf.scene);
        });
    }
    
    // move in same direction (x or y) for now
    update(timeStamp) {
        const floorWidth = 10;
        const floorLength = 10; 

        // updating direction of table
        let newPos = this.position.clone().add(this.direction.clone().multiplyScalar(this.speed));
        if (newPos.x < 0 || newPos.x > floorWidth) {
            this.direction = new THREE.Vector3(this.direction.x * -1, 0, 0);
        }
        if (newPos.y < 0 || newPos.y > floorLength) {
            this.direction = new THREE.Vector3(0, this.direction.y * -1, 0, 0);
        }

        // update position of table
        this.position.add(this.direction.clone().multiplyScalar(this.speed));

    }

}

export default Table;