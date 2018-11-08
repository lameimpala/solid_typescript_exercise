import { MockInitiativePass } from '../__mocks__/MockInitiativePass';
import { CombatService } from "../Combat/CombatService";
import { InitiativePassSlot } from '../Combat/Contracts/InititiativePassSlot';
import { SimpleCombatAction } from '../Combat/SimpleCombatAction';
import { FreeCombatAction } from '../Combat/FreeCombatAction';
import { ComplexCombatAction } from '../Combat/ComplexCombatAction';

describe(`Setup`, () => {
    it(`sets up initiative pass, given participants`, () => {
        const actual = new CombatService<MockInitiativePass>(MockInitiativePass);
        actual.setup( []);
        expect(actual.currentInitiativePass.wasSetupCalled).toBe(true);
        expect(actual.currentInitiativePass.wasNextCalled).toBe(false);
        expect(actual.currentInitiativePass.wasResetCalled).toBe(false);
    });

    it(`throws error, given null`, () => {
        const actual = new CombatService<MockInitiativePass>(MockInitiativePass);
        expect(() => actual.setup(null)).toThrowError();
    });
});

describe(`Next`, () => {
    it(`returns next participant, given there are participants left to act`, () => {
        const actual = new CombatService<MockInitiativePass>(MockInitiativePass);
        actual.setup([]);
        actual.currentInitiativePass._isComplete = false;
        actual.currentInitiativePass.shouldReturnNext = true;
        
        const results = actual.next();

        expect(results).not.toBe(undefined);
        expect(actual.currentInitiativePass.wasResetCalled).toBe(false)
        expect(actual.currentInitiativePass.wasNextCalled).toBe(true);
    });

    it(`resets pass and returns next participant, given pass is completed and another is needed.`, () => {
        const actual = new CombatService<MockInitiativePass>(MockInitiativePass);
        actual.setup([]);
        actual.currentInitiativePass._isComplete = true;
        actual.currentInitiativePass.shouldReturnNext = true;
        actual.currentInitiativePass._needsAnotherPass = true;
        
        const results = actual.next();

        expect(results).not.toBe(undefined);
        expect(actual.currentInitiativePass.wasResetCalled).toBe(true)
        expect(actual.currentInitiativePass.wasNextCalled).toBe(true);
    });

    it(`returns null, given isComplete is true and needsAnotherPass is false.`, () => {
        const actual = new CombatService<MockInitiativePass>(MockInitiativePass);
        actual.setup([]);
        actual.currentInitiativePass._isComplete = true;
        actual.currentInitiativePass.shouldReturnNext = false;
        actual.currentInitiativePass._needsAnotherPass = false;
        
        const results = actual.next();

        expect(results).toBe(null);
    });
    describe(`performAction`, () => {
        describe(`simple actions`, () => {
            it(`runs combat turn and decrement remaining actions, given a participant and a simple action.`, () => {
                const actual = new CombatService<MockInitiativePass>(MockInitiativePass);
                actual.setup([]);
                let x = new InitiativePassSlot();
                x.hasActed = false;
                x.currentInitiative = 11;
                x.actionsLeft = 2;
                actual.performAction(x, new SimpleCombatAction());
        
                expect(x.actionsLeft).toBe(1);
            });

            it(`throws error if character doesn't have enough actions left`, () => {
                const actual = new CombatService<MockInitiativePass>(MockInitiativePass);
                actual.setup([]);
                let x = new InitiativePassSlot();
                x.hasActed = false;
                x.currentInitiative = 11;
                x.actionsLeft = 0;
        
                expect(() => actual.performAction(x, new SimpleCombatAction())).toThrowError();
            });
        });

        describe(`free actions`, () => {
            it(`sets hasTakenFreeAction to true after performing action`, () => {
                const actual = new CombatService<MockInitiativePass>(MockInitiativePass);
                actual.setup([]);
                let x = new InitiativePassSlot();
                x.hasActed = false;
                x.currentInitiative = 11;

                actual.performAction(x, new FreeCombatAction());

                expect(x.hasTakenFreeAction).toBe(true);
            });
            it(`throws an error if two free actions are performed in the same turn.`, () => {
                const actual = new CombatService<MockInitiativePass>(MockInitiativePass);
                actual.setup([]);
                let x = new InitiativePassSlot();
                x.hasActed = false;
                x.currentInitiative = 11;
                x.actionsLeft = 2;
                actual.performAction(x, new FreeCombatAction());
        
                expect(() => actual.performAction(x, new FreeCombatAction())).toThrowError();
            });
        });

        describe(`Complex Actions`, () => {
            it(`throws error if not enough action points`, () => {
                const actual = new CombatService<MockInitiativePass>(MockInitiativePass);
                actual.setup([]);
                let x = new InitiativePassSlot();
                x.hasActed = false;
                x.currentInitiative = 11;
                x.actionsLeft = 1;        
                expect(() => actual.performAction(x, new ComplexCombatAction())).toThrowError();
            });

            it(`performs action and decrements actionsLeft`, () => {
                const actual = new CombatService<MockInitiativePass>(MockInitiativePass);
                actual.setup([]);
                let x = new InitiativePassSlot();
                x.hasActed = false;
                x.currentInitiative = 11;
                x.actionsLeft = 2;        
                actual.performAction(x, new ComplexCombatAction());
                expect(x.actionsLeft).toBe(0);
            });
        });
    });
});