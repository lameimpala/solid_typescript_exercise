import { MockInitiativePass } from '../__mocks__/MockInitiativePass';
import { CombatService } from "../Combat/CombatService";

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
});