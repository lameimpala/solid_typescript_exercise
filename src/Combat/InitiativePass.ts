import { Character } from 'src/Contracts/Character';
import { InitiativePassSlot } from './Contracts/InititiativePassSlot';
import {IInitiativePass} from './IInitiativePass';

export abstract class InitiativePass implements IInitiativePass {
    public initiativeOrder: InitiativePassSlot[];
    public isComplete(){
        return this.initiativeOrder.filter(this._leftToAct).length < 1;
    };
    public needsAnotherPass() {
        return this.initiativeOrder.some((x: InitiativePassSlot) => {
            return x.currentInitiative > 0;
        });
    };
    public setup(participants: Character[] | null) {
        if (!participants) {
            throw new Error('Participants must not be null!')
        }
        this.initiativeOrder = participants.map((particpant: Character) => {
            const theta = new InitiativePassSlot();
            theta.participant = particpant;
            theta.hasActed = false;
            theta.currentInitiative = particpant.getDefaultInitiative();
            return theta;
        });
        return this.initiativeOrder;
    };
    public abstract next(): InitiativePassSlot | undefined;
    public abstract reset(): void;
    protected _leftToAct(x: InitiativePassSlot) {
        return !x.hasActed && x.currentInitiative > 0
    };
}