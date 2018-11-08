import {NonPlayerCharacter} from '../Contracts/NonPlayerCharacter';

describe(`Constructor`, () => {
    it(`throws error if random is null`, () => {
        expect(() => new NonPlayerCharacter(null)).toThrowError();
    })
});

describe(`getDefaultInitiative`, () => {
    it(`is called, then rollInitiative should be called`, () => {
        const expected = 3;
        var actual = new NonPlayerCharacter(() => expected);
        actual.reaction = 0;
        actual.intuition = 0;
        var result = actual.getDefaultInitiative();
        expect(result).toEqual(expected);
    });
});

describe(`rollInitiative`, () => {
    it(`is called, then return random value`, () => {
        const expected = 3;
        const rdmFunc = jest.fn(() => expected);
        var actual = new NonPlayerCharacter(rdmFunc);
        actual.reaction = 0;
        actual.intuition = 0;
        var result = actual.rollInitiative();
        expect(result).toEqual(expected);
        expect(rdmFunc.mock.calls.length).toEqual(1);
    });
});