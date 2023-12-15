import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './chair.glb';
import * as THREE from 'three';
import { Land as Land } from '../Land/index.js';

class Chair extends Group {
    constructor(parent, x, y, z) {
        // Call parent Group() constructor// 
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
        // const SCALE = new THREE.Vector3(12, 4, 12);
        // const OFFSET = new THREE.Vector3(-6, 0.4, -6);
        //this.position.add(new THREE.Vector3().random()).multiplyScalar(Land.width - 1).subScalar(Land.width / 2 - 0.5); //SCALE LATER 
        this.position.add(new THREE.Vector3(x, y, z));
        console.log(this.position)
        if (this.position.x < -1 * Land.width / 2) {
            this.position.x = -1 * Land.width / 2;
        } else if (this.position.x > Land.width / 2) {
            this.position.x = Land.width / 2;
        }
        if (this.position.y < 0.4) {
            this.position.y = 0.4;
        } else if (this.position.y > 2) {
            this.position.y = 2;
        }
        if (this.position.z < -1 * Land.height / 2) {
            this.position.z < -1 * Land.height / 2;
        } else if (this.position.z < -1 * Land.height / 2) {
            this.position.z < -1 * Land.height / 2;
        }
        // console.log("hi" + "x: " + this.position.x + "y: " + this.position.y + "z: " + this.position.z);

        // decide direction 
        let rand = Math.random();
        if (rand <= 0.5) {
            this.direction = new THREE.Vector3(0, 1, 0);
        } else {
            this.direction = new THREE.Vector3(1, 0, 0);
        }

        this.speed = 0.05;
        // check that it doesnt overlap, otherwise bounce

        this.name = 'chair';
        // let items = this.parent.children;
        // while (true) {
        //     let noCollisions = true;
        //     let boxA = new THREE.Box3().setFromObject(playerA);
        //     let boxB = new THREE.Box3().setFromObject(playerB);
        //     let thisBox = new THREE.Box3().setFromObject(this);
        //     if (boxA.intersectsBox(thisBox) || boxB.intersectsBox(thisBox)) {
        //         noCollisions = true;
        //         this.position = new THREE.Vector3();
        //         this.position.add(new THREE.Vector3().random()).multiplyScalar(Land.width - 1).subScalar(Land.width / 2 - 0.5);
        //     }
        //     // for (let item of items) {
        //     //     if (item instanceof PlayerA || item instanceof PlayerB) {
        //     //         let thatBox = new THREE.Box3().setFromObject(item);
        //     //         let thisBox = new THREE.Box3().setFromObject(this);
        //     //         // console.log(thatBox.intersectsBox(thisBox))
        //     //         if (thatBox.intersectsBox(thisBox)) {
        //     //             this.position = new THREE.Vector3();
        //     //             this.position.add(new THREE.Vector3().random()).multiplyScalar(Land.width - 1).subScalar(Land.width / 2 - 0.5);
        //     //             noCollisions = false;
        //     //         }
        //     //     }
        //     // }
        //     if (noCollisions) {
        //         break;
        //     }
        // }
        this.addChair();
        
        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    addChair() {
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            gltf.scene.position.x = this.position.x;
            gltf.scene.position.y = this.position.y;
            gltf.scene.position.z = this.position.z;
            gltf.scene.scale.set(0.05, 0.05, 0.05);
            this.add(gltf.scene);
        });
    }
    
    // move in same direction (x or y) for now
    update(timeStamp) {
        const floorHeight = 4; 

        // updating direction of table if it reaches edge of floor
        let newPos = this.position.clone().add(this.direction.clone().multiplyScalar(this.speed));
        if (newPos.x < -1 * Land.width / 2 || newPos.x >= Land.width / 2) {
            this.direction = new THREE.Vector3(this.direction.x * -1, 0, 0);
        }
        if (newPos.y < 0 || newPos.y > floorHeight) {
            this.direction = new THREE.Vector3(0, this.direction.y * -1, 0, 0);
        }

        // update position of table
        this.position.add(this.direction.clone().multiplyScalar(this.speed));

        this.handleCollisions();
        
    }

    handleCollisions() {
        let items = this.parent.children
        for (let item of items) {
            if (item instanceof Chair) {
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

export default Chair;