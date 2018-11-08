import { InitiativePass_HouseRule_SubtractInitiativeImmediatelyUponAction } from "../Combat/InitiativePass_HouseRule_SubtractInitiativeImmediatelyUponAction";
import { InitiativePassSlot } from '../Combat/Contracts/InititiativePassSlot';

describe(`Reset`, () => {
    it(`resets the initiative pass, given reset called`, () => {
        var actual = new InitiativePass_HouseRule_SubtractInitiativeImmediatelyUponAction()
        actual.setup([]);
        let i = 5;
        while (i > 0 ) {
            i--;
            let x = new InitiativePassSlot();
            x.hasActed = true;
            x.currentInitiative = i;
            actual.initiativeOrder.push(x);
        }

        actual.reset();

        expect(actual.initiativeOrder.every((x: InitiativePassSlot) => {
            return x.hasActed === false;
        })).toBe(true);
        expect(actual.initiativeOrder.length).toBe(4);
    });
});

describe(`Next`, () => {
    it(`returns null, given everyone has acted`, () => {
        var actual = new InitiativePass_HouseRule_SubtractInitiativeImmediatelyUponAction()
        actual.setup([]);
        let i = 5;
        while (i > 0 ) {
            i--;
            let x = new InitiativePassSlot();
            x.hasActed = true;
            x.currentInitiative = i;
            actual.initiativeOrder.push(x);
        }

        var results = actual.next();

        expect(results).toBe(undefined);
    });
    it(`returns null, given no one who has not acted has positive initiative.`, () => {
        var actual = new InitiativePass_HouseRule_SubtractInitiativeImmediatelyUponAction()
        actual.setup([]);
        let i = 5;
        while (i > 0 ) {
            i--;
            let x = new InitiativePassSlot();
            x.hasActed = false;
            x.currentInitiative = 0;
            actual.initiativeOrder.push(x);
        }

        var results = actual.next();

        expect(results).toBe(undefined);
    });
    it(`returns character and subtracts initiative, given there is someone left to act.`, () => {
        var actual = new InitiativePass_HouseRule_SubtractInitiativeImmediatelyUponAction()
        actual.setup([]);
        let i = 5;
        while (i > 0 ) {
            i--;
            let x = new InitiativePassSlot();
            x.hasActed = false;
            x.currentInitiative = 11;
            actual.initiativeOrder.push(x);
        }

        var results = actual.next();

        expect(results).not.toBe(undefined);
    });
})