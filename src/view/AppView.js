import React from 'react'
import {
  Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { createBrowserHistory } from 'history';
import MainContainer from '../container/MainContainer';
import LoginContainer from '../container/LoginContainer';

const history = createBrowserHistory();

function AppView(props) {
  let _props = props;

  const LoginRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
      _props.state.isAuthenticated ? (
        <Redirect to={{
          pathname: '/main'
        }}/>
      ) : (
        <Component {...props}/>
      )
    )}/>
  );

  const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
      _props.state.isAuthenticated ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/',
          state: {from: props.location}
        }}/>
      )
    )}/>
  );

  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute path="/main" exact={true} component={MainContainer} />
        <LoginRoute path="/" component={LoginContainer} />
      </Switch>
    </Router>
  );
}

export default AppView

