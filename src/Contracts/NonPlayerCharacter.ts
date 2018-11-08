import { PhysicalCharacter } from './PhysicalCharacter';
import { IRollsInitiative } from './IRollInitiative';

export class NonPlayerCharacter extends PhysicalCharacter implements IRollsInitiative {
    private _random: Function;
    initiativeDice: number;

    constructor(random:Function|null) {
        if (!random) {
            throw new Error("Random must not be null!")
        }
        super();
        this._random = random;
        this.initiativeDice = 1;
    };

    getDefaultInitiative() {
        return this.rollInitiative();
    }; 

    rollInitiative() {
        let initiative = this.reaction + this.intuition;
        let i = 0;
        while (i < this.initiativeDice) {
          initiative += this._random();
          i++; 
        }
        return initiative;
    }
}