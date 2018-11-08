import {PlayerCharacter} from '../Contracts/PlayerCharacter';

describe(`Player Character`, () => {
    it(`returns 0 when getDefaultInitiative is called.`, () => {
        var actual = new PlayerCharacter();
        var result = actual.getDefaultInitiative();
        expect(result).toEqual(0);
    });
})