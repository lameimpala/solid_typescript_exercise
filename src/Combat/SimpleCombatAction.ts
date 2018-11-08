import { ICombatAction } from './ICombatAction';
import { InitiativePassSlot } from './Contracts/InititiativePassSlot';

export class SimpleCombatAction implements ICombatAction {
    performAction(character: InitiativePassSlot) {
        if (character.actionsLeft > 0) {
            character.actionsLeft--;
        }
        else {
            throw new Error("Character does not have enough action points")
        }
        return;
    }
}