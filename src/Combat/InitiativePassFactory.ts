import { Character } from 'src/Contracts/Character';
import { IInitiativePass } from './IInitiativePass';

export class InitiativePassFactory<T extends IInitiativePass> {
    readonly _participants: Character[];
    pass: T;

    constructor(type: (new () => T), participants: Character[] | null) {
        if (!participants) {
            throw new Error("Participants must not be null!");
        }

        this.pass = new type();
        this._participants = participants;
    };

    create() : T {
        this.pass.setup(this._participants);
        return this.pass;
    };

}