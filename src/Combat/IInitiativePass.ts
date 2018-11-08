import { Character } from 'src/Contracts/Character';
import { InitiativePassSlot } from './Contracts/InititiativePassSlot';

export interface IInitiativePass {
    initiativeOrder: InitiativePassSlot[];
    isComplete(): boolean;
    needsAnotherPass(): boolean;
    setup(participants : Character[]): void;
    next(): InitiativePassSlot | undefined;
    reset(): void;
}