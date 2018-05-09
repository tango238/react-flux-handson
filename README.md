## React-Flux ハンズオン  

### このハンズオンで扱う主なライブラリ  

- [React](https://reactjs.org/)
- [Flux](https://facebook.github.io/flux/docs/overview.html)
- [React Router](https://reacttraining.com/react-router/)


### 環境構築  

[create-react-app](https://github.com/facebook/create-react-app/blob/master/README.md#getting-started) を使う  

```
npx create-react-app react-flux-my-app
cd react-flux-my-app
```

`yarn start` を実行するとブラウザが立ち上がって `Welcome to React` という画面が表示される  
環境構築はここまでで一旦終わり。  


### React を使ってみる

- ログインフォームを作成  


`src/App.js`

```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-intro">
          <form>
            <input type="text" name="email" value="" />
            <input type="password" name="password" value="" />
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
```

この画面でログインフォームに値を入力してもなにも反応しない。
入力すると値が入るように修正する。


```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  valueChanged(e) {
    const state = Object.assign({}, this.state);
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit() {
    alert("Login button clicked");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-intro">
          <form>
            <input type="text" name="email" value={this.state.email} onChange={e => this.valueChanged(e)} />
            <input type="password" name="password" value={this.state.password}  onChange={e => this.valueChanged(e)} />
            <input type="submit" value="Login" onClick={this.onSubmit} />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
```


フォーム入力できて、ログインボタンを押すと `Login button clicked` と画面に表示されればOK。


### Flux導入

[Flux](https://facebook.github.io/flux/docs/overview.html) を追加する。  
※ アプリケーションを起動中の場合は一度停止する。  
※ プロジェクト直下で実行すること（package.jsonがあることを確認する）

```
yarn add flux
```

[generator](https://github.com/tango238/react-flux-handson/tree/master/generator) ディレクトリをコピーして、 `generator/scaffold.sh` に実行権限を追加

```
chmod +x generator/scaffold.sh
```


`src` 以下に `container` / `view` / `store` ディレクトリを作成

```
mkdir -p src/container
mkdir -p src/view
mkdir -p src/store
```


`scaffold.sh` を実行

```
cd generator
./scaffold.sh App
```

次のような実行ログが出力される

```
react-flux-my-app/src/container/AppContainer.js  ...generated
react-flux-my-app/src/view/AppView.js  ...generated
react-flux-my-app/src/store/AppStore.js  ...generated
```



`index.js` を修正

`App` の行を削除

```
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));
```


代わりに次の行を追加

```
import AppContainer from './container/AppContainer';
ReactDOM.render(<AppContainer />, document.getElementById('root'));
```


[core](https://github.com/tango238/react-flux-handson/tree/master/src/core) ディレクトリを作成し、`core/AppDispatcher.js` をコピーする。

コピー後、 `yarn start` を実行し画面が表示されることを確認。

ここまでできたらログイン画面を作る前に、React Routerを導入する。


### React Router導入 

以下の２つのパッケージを追加する  
※ アプリケーションを起動中の場合は一度停止する。  
※ プロジェクト直下で実行すること（package.jsonがあることを確認する）  

```
yarn addreact-router
yarn add react-router-dom
```

`Login` ページとログイン後の `Main` ページの雛形を作る。  

```
cd generator
./scaffold.sh Login
./scaffold.sh Main
```


`view/AppView.js` を次のように修正する

```
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
  _props.session = { isAuthenticated: false };

  const LoginRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
      _props.session.isAuthenticated ? (
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
      _props.session.isAuthenticated ? (
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
```



起動して動作確認  

```
yarn start
```


`_props.session = { isAuthenticated: false };` の `isAuthenticated` を `true` にすると自動的に `Main` ページが表示され、 `false` だと `Login` ページが表示される。

よって、この `isAuthenticated` をログイン成功時に更新することができればログイン処理ができる。




### ログイン画面を作る

`view/LoginView.js` を修正してログイン画面を作る。

```
import React from 'react'

function LoginView(props) {

    return (
      <div>
        <form>
          <p>ログイン</p>
          <p><label>Email <input type="text" name="email" value="" /></label></p>
          <p><label>Pass <input type="password" name="password" value="" /></label></p>
          <p><input type="submit" name="loginButton" value="Login" /></p>
        </form>
      </div>
    );
}

export default LoginView;
```



値を入力できるようにする 

`view/LoginView.js` を修正

```
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

```


`action/LoginAction.js` を作成

```
import AppDispatcher from '../core/AppDispatcher';

export const LoginActionTypes = {
  onChange: 'login/value-changed'
}

export const SessionActionTypes = {
  loginSuccess: 'session/login-success'
}

const LoginAction = {

  valueChanged: function(e) {
    console.log("valueChanged");
  },

  requestLogin: function(form) {
    console.log("requestLogin");
  }
}

export default LoginAction;
```


`store/LoginStore.js` を修正

```
import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../core/AppDispatcher';

class LoginStore extends ReduceStore<State, Action> {

  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return { email:'abc', password:'12345' };
  }

  reduce(state, action) {
    const payload = action.payload;

    switch (action.type) {
      case 'value-changed':
        return state;
      default:
        return state;
    }
  }
}

export default new LoginStore();

```


ここまでの解説  

- EmailおよびPassを入力しようとすると `LoginAction` の `valueChanged` メソッドが呼ばれる
- Loginボタンを押すと `LoginAction` の `requestLogin` メソッドが呼ばれる
- `LoginStore` の `getInitialState` メソッドで初期値の設定をする
- `LoginStore` でstateの更新があると `LoginContainer` 経由で `LoginView` を変更する
- `LoginContainer` の `getState` メソッドで `LoginView` にstateを渡している（変数名は `state` ）
- `LoginView` から変更されたstateを取得するには `{props.state.email}` および `{props.state.password}` のように行う


いまのコードだと値を変更したときやLoginボタンを押したとき、Actionのメソッドを呼び出しただけで `Dispatcher` にActionを送っていないのでStoreが反応しない。

ActionでDispatcherを呼び出し、Storeに通知後、stateを変更するには以下のようにソースコードを修正する。


`action/LoginAction.js`

```
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
```



`store/LoginStore.js`

```
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
    const payload = action.payload;

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
```


起動して動作確認  

```
yarn start
```

`Email/Pass` を入力できるようになっていることを確認




最後にLoginボタンを押した時の処理を追加する


`store/AppStore.js`

```
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
    const payload = action.payload;

    switch (action.type) {
      case SessionActionTypes.loginSuccess:
        // Loginボタンが押されたら認証成功
        return { isAuthenticated: true };
      default:
        return prevState;
    }
  }
}

export default new AppStore();
```


`view/AppView.js` の認証周りの処理を修正

`_props.session.isAuthenticated` を `_props.state.isAuthenticated` に変更する


```
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
```


起動して動作確認  

```
yarn start
```

フォームに値が入力できて、Loginボタンを押すとページ遷移してMainページが表示されれば成功です。  

お疲れ様でした！





## 動作確認方法

- install node
- install yarn
- yarn install
- yarn start



## FAQ  

- `sh: react-scripts: command not found` というエラーがでる  
  - `yarn install` する



