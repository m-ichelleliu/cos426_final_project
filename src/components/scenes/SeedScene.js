import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, Table, Chair, PlayerA, PlayerB, Chicken} from 'objects';
import { Land as LandConstant } from '../objects/Land/index.js';
import { BasicLights } from 'lights';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        this.land = new Land();
        // const flower = new Flower(this);
        const lights = new BasicLights();

        this.add(this.land, lights);
        const playerA = new PlayerA(this);
        this.add(playerA)
        const playerB = new PlayerB(this);
        this.add(playerB);

        this.tables = [];

        const NUM_TABLES = 3;
        for (let i = 0; i < NUM_TABLES; i++) {
            const table = new Table(this, playerA, playerB);
            this.add(table);
            this.tables.push(table)
        }

        this.chairs = [];
        const NUM_CHAIRS = 3;
        for (let i = 0; i < NUM_CHAIRS; i++) {
            const chair = new Chair(this, playerA, playerB);
            this.add(chair);
            this.chairs.push(chair)
        }

        // const playerA = new PlayerA(this);
        // this.add(playerA)
        // const playerB = new PlayerB(this);
        // this.add(playerB)

        // const chicken = new Chicken(this);
        // chicken.state.landed = true;
        // this.add(chicken);
        

        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
        this.rotation.y = 2*Math.PI*.165+Math.PI/2;
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
            // if chicken landed, remove it
            // if (obj.name == "chicken" && obj.state.landed) {
            //     this.remove(obj);
            // }
            // if (obj.name == "chicken" && (obj.position.x < -1 * LandConstant.width || obj.position.x > LandConstant.width)) {
            //     this.remove(obj);
            // }
        }
    }
}

export default SeedScene;
