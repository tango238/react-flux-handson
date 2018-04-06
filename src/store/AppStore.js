import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../core/AppDispatcher';
import { SessionActionTypes } from '../action/LoginAction'

class AppStore extends ReduceStore<State, Action> {

  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return { isAuthenticated: false };
  }

  reduce(prevState, action) {
    let payload = action.payload;

    switch (action.type) {
      case SessionActionTypes.loginSuccess:
        return { isAuthenticated: true };
      default:
        return prevState;
    }
  }
}

export default new AppStore();
