import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../core/AppDispatcher';
import LoginAction from '../action/LoginAction'
import { LoginActionTypes } from '../action/LoginAction'

class LoginStore extends ReduceStore<State, Action> {

  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return { email:'abc', password:'123' };
  }

  reduce(prevState, action) {
    let payload = action.payload;

    switch (action.type) {
      case LoginActionTypes.onChange:
        let state = Object.assign({}, prevState);
        state[payload.name] = payload.value;
        return state;
      default:
        return prevState;
    }
  }
}

export default new LoginStore();
