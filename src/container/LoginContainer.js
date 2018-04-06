import {Container} from 'flux/utils';
import AppDispatcher from '../core/AppDispatcher';
import LoginView from '../view/LoginView';
import LoginStore from '../store/LoginStore';

function getStores() {
  return [
    LoginStore
  ];
}

function getState() {
  return {
    state: LoginStore.getState()
  };
}

export default Container.createFunctional(LoginView, getStores, getState);
