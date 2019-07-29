import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import { Layout } from 'antd';
import Login from './Login/index';
import Register from './Register/index';
import { Typography } from 'antd';
import history from './_helpers/history';
import PhoneLogin from './PhoneLogin';
import ResetPassword from './ResetPassword';
import { isAuthenticated } from './_helpers/auth';
import Home from './Home';

const { Title } = Typography;

const { Header, Content } = Layout;

export class App extends React.Component {
  render(){
    console.log(isAuthenticated());
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        isAuthenticated()
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    )
    return (
      <Router history={history}>
        <div className="App">
          <Layout>
            <Header className="App-header">
              <Title className="Heading" level={2}>Login App</Title>
            </Header>
            <Content className="App-body">
              <div>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/otp" component={PhoneLogin} />
                <Route exact path="/reset_password" component={ResetPassword} />
                <PrivateRoute exact path="/" component={Home} />
              </div>
            </Content>
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
