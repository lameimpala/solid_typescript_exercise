import { InitiativePassSlot } from './Contracts/InititiativePassSlot';
import { InitiativePass } from './InitiativePass';

// tslint:disable-next-line:class-name
export class InitiativePass_HouseRule_SubtractInitiativeImmediatelyUponAction extends InitiativePass {
    public next() {
        const sortedArray = [...this.initiativeOrder].sort((a: InitiativePassSlot, b:InitiativePassSlot) => {
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

        const next = sortedArray.find(this._leftToAct);
        if (next) {
            next.currentInitiative -= 10;
            next.hasActed = true;
        }
        return next;
    };
    public reset() {
        this.initiativeOrder.forEach((x: InitiativePassSlot) => {
            x.hasActed = false;
        });
        this.initiativeOrder = this.initiativeOrder.filter(this._leftToAct);
    };
}