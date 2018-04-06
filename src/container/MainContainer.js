import {Container} from 'flux/utils';
import AppDispatcher from '../core/AppDispatcher';
import MainView from '../view/MainView';
import MainStore from '../store/MainStore';

function getStores() {
  return [
    MainStore
  ];
}

function getState() {
  return {
    state: MainStore.getState()
  };
}

export default Container.createFunctional(MainView, getStores, getState);
