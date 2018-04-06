import {Dispatcher} from 'flux'

class AppDispatcher extends Dispatcher {

  handleOnChange(event) {
    this.dispatch({
      type: 'value-changed',
      payload: {
        name: event.target.name,
        value: event.target.value
      }
    });
  }

  dispatchWithType(type, payload) {
    if (payload == null) payload = {}
    this.dispatch({
      type: type,
      payload: payload
    })
  }
}

export default new AppDispatcher();
