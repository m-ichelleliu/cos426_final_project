import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Chicken} from '/src/components/objects';
import MODEL from './Hooded_Adventurer.glb';
import { Chair as Chair } from '../Chair/index.js';
import { Table as Table } from '../Table/index.js';
import * as THREE from 'three';
import * as pages from '../../../pages.js';

const DIRECTION_VECTOR =
{'N' : new THREE.Vector3(0,0,-1),
'E' : new THREE.Vector3(1,0,0),
'S' : new THREE.Vector3(0,0,1),
'W' : new THREE.Vector3(-1,0,0)
};

const DIRECTION_IDX =
{'N' : 0,
'E' : 1,
'S' : 2,
'W' : 3
};

class PlayerB extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // need to generate initial random position
        // make sure it doesn't overlap w other objects

        // Init state
        this.state = {
            // gui: parent.state.gui,
            parent: parent,
            prev_direction: null,
            direction: 'S', // whether it moves x or y
            DIRECTION_VECTOR: DIRECTION_VECTOR['S'], // whether it moves x or y
            direction_idx: DIRECTION_IDX['S'],
            speed: null,

            // parameters for jumping
            jump: null, // jump pressed
            jumping: null,
            jumpPos: null,
            jumpAngle: null,
            jumpVelocity: null,
            jumpTime: null,
        };

        // make player B start at upper right corner
        const startPos = new THREE.Vector3(1,0,0);
        this.position.add(startPos);

        // decide direction
        // this.state.direction = new THREE.Vector3(0, 1, 0);

        this.state.speed = 0.05;

        // init jumping params
        this.state.jump = false; // pressed jump
        this.state.jumping = false; // mid jump
        this.state.jumpPos = startPos; // init jump pos
        this.state.jumpVelocity = new THREE.Vector3(0,10,0);
        this.state.jumpAngle = Math.PI/2;

        // initialize shooting variables
        this.state.shoot = false;
        this.state.shootAngle = Math.PI/4;
        this.state.shootVelocity = 0.01;

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

            // const SCALE = 1.5;
            // gltf.scene.scale.set(SCALE, SCALE, SCALE);
            this.add(gltf.scene);
        });
    }

    // move in same direction (x or y) for now
    update(timeStamp) {

        // check if shoot
        if (this.state.shoot) {
            const scene = this.state.parent;

            const chicken = new Chicken(scene);
            chicken.state.player = this;
            chicken.state.shooter = 'B';
            chicken.state.startTime = timeStamp;
            chicken.state.startDirection.copy(DIRECTION_VECTOR[this.state.direction]);
            chicken.state.position = new THREE.Vector3();
            this.getWorldPosition(chicken.position);
            console.log("Just added a chicken at", chicken.position)
            // console.log("hi " + this.position.x + " " + this.position.y + " " + this.position.z);
            // console.log(chicken.state.startPos.x + " " + chicken.state.startPos.y + " " + chicken.state.startPos.z);
            scene.add(chicken);

            this.state.shoot = false;
        }
        this.handleCollisions();

        // check if jump

        if (this.state.jump) {

            this.state.jumping = true;
            this.state.jumpPos.copy(this.position);
            this.state.jumpTime = timeStamp;
            // console.log("jump velocity:", this.state.jumpVelocity);
            this.state.jump = false;
            // console.log(this.state.jump);
        }

        if (this.state.jumping) {


            // y_t = y_0 + v_0*t*sintheta - 0.5gt^2
            // y_0 is always 0 (assuming no double jumps)
            const GRAVITY = new THREE.Vector3(0, -9.81, 0);
            const deltaT = (timeStamp - this.state.jumpTime)/100;
            // const velocityCoeff = deltaT*Math.sin(this.state.jumpAngle);
            const velocity = this.state.jumpVelocity.clone().multiplyScalar(deltaT);
            // const accelCoeff = 0.5*deltaT*deltaT;
            const accel = GRAVITY.clone().multiplyScalar( 0.5*deltaT*deltaT);

            const newPos = new THREE.Vector3().copy(this.state.jumpPos);
            newPos.add(velocity).add(accel);
            // console.log(deltaT, this.state.jumpTime, this.state.jumpPos, newPos);

            // check if landed
            if (timeStamp != this.state.jumpTime && newPos.y <= 0) {
                newPos.y = 0;
                this.state.jumping = false;
            }

            this.position.copy(newPos);
        }
    }

    handleCollisions() {
        // console.log("hi")
        let items = this.parent.children
        for (let item of items) {
            if (item instanceof Table || item instanceof Chair || item instanceof Chicken) {
                let thatBox = new THREE.Box3().setFromObject(item);
                let thisBox = new THREE.Box3().setFromObject(this);
                // console.log(thatBox.intersectsBox(thisBox))
                if (thatBox.intersectsBox(thisBox)) {
                    if (item instanceof Chicken && item.state.player == this) {
                        continue;
                    }
                    pages.game_over(document, false);
                }
            }
        }
    }

}

export default PlayerB;