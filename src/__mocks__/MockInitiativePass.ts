import { InitiativePassSlot } from '../Combat/Contracts/InititiativePassSlot';
import { IInitiativePass } from '../Combat/IInitiativePass';
import { Character } from '../Contracts/Character';

export class MockInitiativePass implements IInitiativePass {
    public wasSetupCalled: boolean;
    public wasResetCalled: boolean;
    public wasNextCalled: boolean;
    // tslint:disable-next-line:variable-name
    public _isComplete: boolean;
    // tslint:disable-next-line:variable-name
    public _needsAnotherPass: boolean;
    public shouldReturnNext: boolean;
    public initiativeOrder: InitiativePassSlot[];
    constructor(){
        this.wasNextCalled = false;
        this.wasSetupCalled = false;
        this.wasResetCalled = false;
    };  
    public isComplete() {
        return this._isComplete;
    };
    public needsAnotherPass(){
        return this._needsAnotherPass;
    };
    public setup(participants: Character[]) {
        this.wasSetupCalled = true;
    };
    public reset() {
        this.wasResetCalled = true;
    };
    public next() {
        this.wasNextCalled = true;
        if (this.shouldReturnNext) {
            return new InitiativePassSlot();
        }
        return undefined;
    };
}