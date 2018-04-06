import {Container} from 'flux/utils';
import AppDispatcher from '../core/AppDispatcher';
import AppView from '../view/AppView';
import AppStore from '../store/AppStore';

function getStores() {
  return [
    AppStore
  ];
}

function getState() {
  return {
    state: AppStore.getState()
  };
}

export default Container.createFunctional(AppView, getStores, getState);
