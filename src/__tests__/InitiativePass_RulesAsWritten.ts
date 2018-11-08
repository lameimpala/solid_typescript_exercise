import { InitiativePass_RulesAsWritten } from "../Combat/InitiativePass_RulesAsWritten";
import { InitiativePassSlot } from '../Combat/Contracts/InititiativePassSlot';

describe(`Reset`, () => {
    it(`resets the initiative pass after reset is called.`, () => {
        var actual = new InitiativePass_RulesAsWritten();
        actual.setup([]);
        let i = 5;
        while (i > 0 ) {
            i--;
            let x = new InitiativePassSlot();
            x.hasActed = true;
            x.currentInitiative = i+8;
            actual.initiativeOrder.push(x);
        }

        actual.reset();

        expect(actual.initiativeOrder.every((x: InitiativePassSlot) => {
            return !x.hasActed;
        })).toBe(true);
        
        expect(actual.initiativeOrder.length).toBe(2);
    });
});

describe(`Next`, () => {
    it(`returns null, given everyone has acted`, () => {
        var actual = new InitiativePass_RulesAsWritten();
        actual.setup([]);
        let i = 5;
        while (i > 0 ) {
            i--;
            let x = new InitiativePassSlot();
            x.hasActed = true;
            x.currentInitiative = i;
            actual.initiativeOrder.push(x);
        }

        var result = actual.next();
        expect(result).toBe(undefined);
    });

    it(`returns null, given no one who has not acted has positive initiative.`, () => {
        var actual = new InitiativePass_RulesAsWritten();
        actual.setup([]);
        let i = 5;
        while (i > 0 ) {
            i--;
            let x = new InitiativePassSlot();
            x.hasActed = false;
            x.currentInitiative = 0;
            actual.initiativeOrder.push(x);
        }

        var result = actual.next();
        expect(result).toBe(undefined);

    });

    it(`returns the next character, given there is someone left to act`, () => {
        var actual = new InitiativePass_RulesAsWritten();
        actual.setup([]);
        let i = 5;
        while (i > 0 ) {
            i--;
            let x = new InitiativePassSlot();
            x.hasActed = false;
            x.currentInitiative = i;
            actual.initiativeOrder.push(x);
        }

        var result = actual.next();
        expect(result).toEqual(actual.initiativeOrder[0]);
        expect(actual.initiativeOrder[0].hasActed).toBe(true);
    });
});