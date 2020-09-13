import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { ROUTES } from '@Data/constants';
import Layout from '@Components/Layout';
import Home from '@Containers/Home';
import UserPosts from '@Containers/UserPosts';
import UserShow from '@Containers/UserShow';
import NotFound from '@Containers/NotFound';

import 'antd/dist/antd.css';
import './index.scss';

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path={ROUTES.home} component={Home} />
        <Route exact path={ROUTES.user} component={UserShow} />
        <Route exact path={ROUTES.userPosts} component={UserPosts} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </Router>
);

export default App;
