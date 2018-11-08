import { MockInitiativePass } from '../__mocks__/MockInitiativePass';
import { InitiativePassFactory } from "../Combat/InitiativePassFactory";

describe(`Constructor`, () => {
    it(`throws an error if initiated with null participants`, () => {
        expect(() => new InitiativePassFactory(MockInitiativePass, null)).toThrowError();
    });
});

describe(`Create`, () => {
    it(`returns instance given setup called with type`, () => {
        const actual = new InitiativePassFactory(MockInitiativePass, []);
        const results = actual.create();
        
        expect(results).not.toBeNull();
        expect(results.wasSetupCalled).toBe(true);
    });
});