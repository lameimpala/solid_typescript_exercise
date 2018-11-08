import { InitiativePassSlot } from '../Combat/Contracts/InititiativePassSlot';
import { InitiativePass_RulesAsWritten } from "../Combat/InitiativePass_RulesAsWritten";
import { PlayerCharacter } from '../Contracts/PlayerCharacter';

describe(`IsComplete`, () => {
    it(`returns true, given everyone has acted`, () => {
        const actual = new InitiativePass_RulesAsWritten();
        actual.setup([]);
        let i = 5;
        while (i > 0 ) {
            i--;
            const x = new InitiativePassSlot();
            x.hasActed = true;
            x.currentInitiative = i;
            actual.initiativeOrder.push(x);
        }

        const results = actual.isComplete();

        expect(results).toBe(true);
    });

    it(`returns true, given no one who has not acted also has positive initiative`, () => {
        const actual = new InitiativePass_RulesAsWritten();
        actual.setup([]);
        let i = 5;
        while (i > 0 ) {
            i--;
            const x = new InitiativePassSlot();
            x.hasActed = false;
            x.currentInitiative = 0;
            actual.initiativeOrder.push(x);
        }

        const results = actual.isComplete();

        expect(results).toBe(true);
    });

    it(`returns false, given there is someone left to act`, () => {
        const actual = new InitiativePass_RulesAsWritten();
        actual.setup([]);
        let i = 5;
        while (i > 0 ) {
            i--;
            const x = new InitiativePassSlot();
            x.hasActed = false;
            x.currentInitiative = 1;
            actual.initiativeOrder.push(x);
        }

        const results = actual.isComplete();

        expect(results).toBe(false);
    });
});

describe(`NeedsAnotherPass`, () => {
    it(`returns false, given no one has positive initiative`, () => {
        const actual = new InitiativePass_RulesAsWritten();
        actual.setup([]);
        let i = 5;
        while (i > 0 ) {
            i--;
            const x = new InitiativePassSlot();
            x.hasActed = true;
            x.currentInitiative = 0;
            actual.initiativeOrder.push(x);
        }

        const results = actual.needsAnotherPass();

        expect(results).toBe(false);
    });

    it(`returns true, given someone has positive initiative`, () => {
        const actual = new InitiativePass_RulesAsWritten();
        actual.setup([]);
        let i = 5;
        while (i > 0 ) {
            i--;
            const x = new InitiativePassSlot();
            x.hasActed = true;
            x.currentInitiative = 1;
            actual.initiativeOrder.push(x);
        }

        const results = actual.needsAnotherPass();

        expect(results).toBe(true);
    });
});

describe(`Setup`, () => {
    it(`throws an error, given null participants`, () => {
        const actual = new InitiativePass_RulesAsWritten();
        expect(() => actual.setup(null)).toThrowError();
    });
    it(`stores list of characters in initiative pass.`, () => {
        const actual = new InitiativePass_RulesAsWritten();
        let i = 5;
        const chars = [];
        while (i > 0 ) {
            i--;
            const x = new PlayerCharacter();
            x.name = String(i);
            chars.push(x);
        }

        actual.setup(chars);

        expect(actual.initiativeOrder.length).toEqual(chars.length);
    });
});