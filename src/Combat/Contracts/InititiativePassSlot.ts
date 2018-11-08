import { Character } from 'src/Contracts/Character';

export class InitiativePassSlot {
    public currentInitiative: number;
    public hasActed: boolean;
    public participant: Character
}