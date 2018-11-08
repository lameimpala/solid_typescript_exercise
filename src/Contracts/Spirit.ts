import { Character } from './Character';
import {IRollsInitiative} from './IRollInitiative';

export class Spirit extends Character implements IRollsInitiative {
    public force: number;
    public initiativeDice: number;
    // tslint:disable-next-line:variable-name
    private _random: () => number;

    constructor(random:() => number) {
        super();
        this._random = random;
    };

    public getDefaultInitiative() {
        return this.rollInitiative();
    }; 

    public rollInitiative() {
        let initiative = this.force * 2;
        let i = 0;
        while (i < this.initiativeDice) {
          initiative += this._random();
          i++;
        }
        return initiative;
    };
}