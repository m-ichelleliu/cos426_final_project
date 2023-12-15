import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './chicken.glb';
import * as THREE from 'three';

const Y_EPS = -0.8;


class Chicken extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // need to generate initial random position
        // make sure it doesn't overlap w other objects

        // Init state
        this.state = {

            player: null, // player who projected this
            // starting params
            startTime: null,
            startDirection: new THREE.Vector3(),
            startPos: new THREE.Vector3(0,Y_EPS,0),
            startAngle: Math.PI/3,
            startVelocity: new THREE.Vector3(1,10,1),

            landed: false,
        };

        this.position.add(this.state.startPos);

        this.name = 'chicken';
        this.addChicken();

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    addChicken() {
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            console.log("Before conversion", this.position);
            if (this.state.shooter == 'A') {
                gltf.scene.position.x = (this.position).x + 1.5;
                gltf.scene.position.y = (this.position).y;
                gltf.scene.position.z = (this.position).z + 6.5;
            } else {
                gltf.scene.position.x = (this.position).x - 1.2;
                gltf.scene.position.y = (this.position).y;
                gltf.scene.position.z = (this.position).z - .75;
            }
            this.add(gltf.scene);
            // this.worldToLocal(this.state.position);
            this.worldToLocal(gltf.scene.position);
            this.state.startPos.copy(gltf.scene.position)
            // let pos = new THREE.Vector3();
            // this.getWorldPosition(pos);
            // this.getWorldPosition(this.state.startPos);
            // console.log("WorldPos", pos, "ScenePos", gltf.scene.position);
            // const SCALE = 1.5;
            // gltf.scene.scale.set(SCALE, SCALE, SCALE);
        });
    }

    // move in same direction (x or y) for now
    update(timeStamp) {
        if (this.state.landed) return;
        // console.log("chicken pos: " + this.position.x + " " + this.position.y + " " + this.position.z);


        // // y_t = y_0 + v_0*t*sintheta - 0.5gt^2
        // // y_0 is always 0 (assuming no double jumps)
        // const GRAVITY = new THREE.Vector3(0, -9.81, 0);
        // const deltaT = (timeStamp - this.state.startTime)/100;
        // const velocityCoeff = deltaT*Math.sin(this.state.startAngle);
        const startVelocity = this.state.startVelocity.clone().add(this.state.startDirection);


        // const velocity = startVelocity.multiplyScalar(velocityCoeff);
        // // const accelCoeff = 0.5*deltaT*deltaT;
        // const accel = GRAVITY.clone().multiplyScalar( 0.5*deltaT*deltaT);

        const newPos = new THREE.Vector3().copy(this.state.startPos);
        // newPos.add(velocity).add(accel);
        // // console.log(deltaT, this.state.startTime, this.state.startPos, newPos);

        // // check if landed
        // if (timeStamp != this.state.startTime && newPos.y <= Y_EPS) {
        //     newPos.y = Y_EPS;
        //     this.state.landed = true;
        //     console.log("landed")
        // }

        newPos.add(startVelocity);
        // this.position.copy(newPos);
        this.position.add(this.state.startDirection.clone().multiplyScalar(0.1));



    }

}

export default Chicken;