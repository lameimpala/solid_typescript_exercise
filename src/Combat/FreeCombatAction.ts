import { ICombatAction } from './ICombatAction';
import { InitiativePassSlot } from './Contracts/InititiativePassSlot';

export class FreeCombatAction implements ICombatAction {
    performAction(character: InitiativePassSlot) {
        if (character.hasTakenFreeAction) {
            throw new Error("Character has already taken free action")
        }
        character.hasTakenFreeAction = true;
    }
}