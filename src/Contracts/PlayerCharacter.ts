import { PhysicalCharacter } from './PhysicalCharacter';

export class PlayerCharacter extends PhysicalCharacter {
    getDefaultInitiative(){
        return 0;
    };
}