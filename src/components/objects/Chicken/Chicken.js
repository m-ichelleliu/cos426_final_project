import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './chicken.glb';
import * as THREE from 'three';


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
            startPos: new THREE.Vector3(),
            startAngle: Math.PI/4,
            startVelocity: new THREE.Vector3(0,10,0),

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

        // y_t = y_0 + v_0*t*sintheta - 0.5gt^2
        // y_0 is always 0 (assuming no double jumps)
        const GRAVITY = new THREE.Vector3(0, -9.81, 0);
        const deltaT = (timeStamp - this.state.startTime)/100;
        // const velocityCoeff = deltaT*Math.sin(this.state.startAngle);
        const velocity = this.state.startVelocity.clone().multiplyScalar(deltaT);
        // const accelCoeff = 0.5*deltaT*deltaT;
        const accel = GRAVITY.clone().multiplyScalar( 0.5*deltaT*deltaT);

        const newPos = new THREE.Vector3().copy(this.state.startPos);
        newPos.add(velocity).add(accel);
        // console.log(deltaT, this.state.startTime, this.state.startPos, newPos);

        // check if landed
        if (timeStamp != this.state.startTime && newPos.y <= 0) {
            newPos.y = 0;
            this.state.landed = true;
        }

        this.position.copy(newPos);


    }

}

export default Chicken;