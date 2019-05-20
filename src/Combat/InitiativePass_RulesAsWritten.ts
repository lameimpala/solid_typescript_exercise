import { InitiativePass } from './InitiativePass';
import { InitiativePassSlot } from './Contracts/InititiativePassSlot';

export class InitiativePass_RulesAsWritten extends InitiativePass {
    next() {
        let sortedArray = [...this.initiativeOrder].sort((a: InitiativePassSlot, b:InitiativePassSlot) => {
            if (a.currentInitiative < b.currentInitiative) {
                return 1;
            }
            else if (b.currentInitiative > a.currentInitiative) {
                return -1;
            }
            else {
                return 0;
            }
        });

        let next = sortedArray.find(this._leftToAct);
        if (next) {
            next.hasActed = true;
        }
        return next;
    };
    reset() {
        this.initiativeOrder.forEach((x: InitiativePassSlot) => {
            x.currentInitiative -= 10;
            x.hasActed = false;
        });
        this.initiativeOrder = this.initiativeOrder.filter(this._leftToAct);
    };
}