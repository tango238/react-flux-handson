import {Container} from 'flux/utils';
import AppDispatcher from '../core/AppDispatcher';
import {{BASE}}View from '../view/{{BASE}}View';
import {{BASE}}Store from '../store/{{BASE}}Store';

function getStores() {
  return [
    {{BASE}}Store
  ];
}

function getState() {
  return {
    state: {{BASE}}Store.getState()
  };
}

export default Container.createFunctional({{BASE}}View, getStores, getState);
