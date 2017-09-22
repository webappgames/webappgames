import {observable,computed} from "mobx";
import {getCategoryFromSpellId} from '../spells/spellTools';

export default class DataModel {
    @observable currentSpellId = 'push';
    @computed get currentSpellCategory() {
        return getCategoryFromSpellId(this.currentSpellId)
    }
    @observable aimed = false;
    @observable health = 1;
    @observable energy = 1000;
}