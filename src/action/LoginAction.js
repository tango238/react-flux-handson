import AppDispatcher from '../core/AppDispatcher';

export const LoginActionTypes = {
  onChange: 'login/value-changed'
}

export const SessionActionTypes = {
  loginSuccess: 'session/login-success'
}

const LoginAction = {

  valueChanged: function(event) {
    AppDispatcher.dispatchWithType(LoginActionTypes.onChange, {
      name: event.target.name,
      value: event.target.value
    })
  },

  requestLogin: function(form) {
     
    const body = {
      user: {
        email: form.email,
        password: form.password
      }
    }

    setTimeout(() => {
      AppDispatcher.dispatchWithType(SessionActionTypes.loginSuccess, { token: 'abcdefg123456789' });
    }, 500)
  }
}

export default LoginAction;

