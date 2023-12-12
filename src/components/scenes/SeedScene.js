import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, Table, Chair, PlayerA, PlayerB} from 'objects';
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

        this.tables = [];

        const NUM_TABLES = 3;
        for (let i = 0; i < NUM_TABLES; i++) {
            const table = new Table(this);
            this.add(table);
            this.tables.push(table)
        }

        this.chairs = [];
        const NUM_CHAIRS = 3;
        for (let i = 0; i < NUM_CHAIRS; i++) {
            const chair = new Chair(this);
            this.add(chair);
            this.chairs.push(chair)
        }

        const playerA = new PlayerA(this);
        this.add(playerA)
        const playerB = new PlayerB(this);
        this.add(playerB)

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
        }
    }
}

export default SeedScene;
