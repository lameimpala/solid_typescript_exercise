import { Character } from 'src/Contracts/Character';
import { IInitiativePass } from './IInitiativePass';
import { InitiativePassFactory } from './InitiativePassFactory';

export class CombatService<T extends IInitiativePass> {

    public currentInitiativePass: any;
    public initiativePassType: any;

    constructor(type: { new(): T ;} ) {
        this.initiativePassType = type;
    }

    public setup(participants: Character[] | null ) {
        if (!participants) {
            throw new Error("Participants must not be null!");
        }
        const x = new InitiativePassFactory(this.initiativePassType, participants)
        this.currentInitiativePass = x.create();
    }

    public next() {
        if (this.currentInitiativePass.isComplete()) {
            if (this.currentInitiativePass.needsAnotherPass()) {
                this.currentInitiativePass.reset();
            }
            else {
                return null
            }
        }
        return this.currentInitiativePass.next();
    }
}