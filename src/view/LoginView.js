import React from 'react'
import LoginAction from '../action/LoginAction'

function LoginView(props) {

    return (
      <div>
        <p>ログイン</p>
        <p><label>Email <input type="text" name="email" value={props.state.email} onChange={e => LoginAction.valueChanged(e)}/></label></p>
        <p><label>Pass <input type="password" name="password" value={props.state.password} onChange={e => LoginAction.valueChanged(e)}/></label></p>
        <p><button onClick={() => LoginAction.requestLogin(props.state)} >Login</button></p>
      </div>
    );
}

export default LoginView;
