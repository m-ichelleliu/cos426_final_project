import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, Table, Chair} from 'objects';
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
        const land = new Land();
        // const flower = new Flower(this);
        const lights = new BasicLights();

        this.add(land, lights);

        // const tables = []
        const NUM_TABLES = 3;
        for (let i = 0; i < NUM_TABLES; i++) {
            const table = new Table(this);
            this.add(table);
            // tables.push(table);
        }

        const chair = new Chair(this);
        this.add(chair);
        
        

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
