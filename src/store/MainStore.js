import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../core/AppDispatcher';

class MainStore extends ReduceStore<State, Action> {

  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return null;
  }

  reduce(state, action) {
    let payload = action.payload;

    switch (action.type) {
      case 'value-changed':
        return state;
      default:
        return state;
    }
  }
}

export default new MainStore();
