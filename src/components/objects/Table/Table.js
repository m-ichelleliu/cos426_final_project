import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './table.glb';
import { Land as Land } from '../Land/index.js';
import { Chair as Chair } from '../Chair/index.js';
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
        // while (true) {
            this.position.add(new THREE.Vector3().random().multiplyScalar(Land.width - 1).subScalar(Land.width / 2 - 0.5)); //SCALE LATER 
            // let items = this.parent.children;
            // let all_clear = true;
            // for (let item of items) {
            //     if (item instanceof Table) {
            //         let thatBox = new THREE.Box3().setFromObject(item);
            //         let thisBox = new THREE.Box3().setFromObject(this);
            //         // console.log(thatBox.intersectsBox(thisBox))
            //         if (thatBox.intersectsBox(thisBox)) {
            //             all_clear = false;
            //             break;
            //         }
            //     }
            // }
            // if (all_clear) {
            //     break;
            // }
        //     break;
        // }

        if (this.position.x < -1 * Land.width / 2) {
            this.position.x = -1 * Land.width / 2;
        } else if (this.position.x > Land.width / 2) {
            this.position.x = Land.width / 2;
        }
        if (this.position.y < 0.4) {
            this.position.y = 0.4;
        }
        console.log("Land", Land.width, Land.height)
        // console.log("hi" + this.position.y);

        // decide direction 
        let rand = Math.random();
        if (rand <= 0.5) {
            this.direction = new THREE.Vector3(0, 1, 0);
        } else {
            this.direction = new THREE.Vector3(1, 0, 0);
        }

        this.speed = Math.random() * 0.05 + 0.05;
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
        const floorHeight = 5; 

        // console.log(this.boundingBox)

        // updating direction of table if it reaches edge of floor
        let newPos = this.position.clone().add(this.direction.clone().multiplyScalar(this.speed));
        if (newPos.x < -1 * Land.width || newPos.x >= Land.width) {
            this.direction = new THREE.Vector3(this.direction.x * -1, 0, 0);
            // console.log("Wall bounce", newPos.x)
        }
        if (newPos.y < 0.4 || newPos.y > floorHeight) {
            this.direction = new THREE.Vector3(0, this.direction.y * -1, 0, 0);
        }

        // update position of table
        this.position.add(this.direction.clone().multiplyScalar(this.speed));

        this.handleCollisions();
        
    }

    handleCollisions() {
        let items = this.parent.children
        for (let item of items) {
            if (item instanceof Table || item instanceof Chair) {
                let thatBox = new THREE.Box3().setFromObject(item);
                let thisBox = new THREE.Box3().setFromObject(this);
                // console.log(thatBox.intersectsBox(thisBox))
                if (thatBox.intersectsBox(thisBox)) {
                    item.direction.multiplyScalar(-1);
                    this.direction.multiplyScalar(-1);
                }
            }
        }
    }
}

export default Table;