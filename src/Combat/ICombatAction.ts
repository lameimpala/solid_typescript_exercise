import { InitiativePassSlot } from './Contracts/InititiativePassSlot';

export interface ICombatAction {
    performAction(character: InitiativePassSlot): void;
}