import { ICombatAction } from './ICombatAction';
import { InitiativePassSlot } from './Contracts/InititiativePassSlot';

export class ComplexCombatAction implements ICombatAction {
    performAction(character: InitiativePassSlot) {
        if (character.actionsLeft == 2) {
            character.actionsLeft = 0;
        }
        else {
            throw new Error("Character does not have enough action points")
        }
        return;
    }
}