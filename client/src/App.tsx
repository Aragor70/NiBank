import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import HomePageGuest from './pages/HomePageGuest';
import HomePageUser from './pages/HomePageUser';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/auth/Login';
import Register from './pages/auth/register/Register';
import { Fragment, useEffect, useState } from 'react';
import GSA from './pages/auth/register/GSA';
import SecurityCenter from './pages/SecurityCenter';
import RecoverEmail from './pages/auth/RecoverEmail';
import RecoverPassword from './pages/auth/RecoverPassword';
import { loadUser, loadUsers } from './store/actions/auth';
import setAuthToken from './utils/setAuthToken';
import { connect } from 'react-redux';
import Transactions from './pages/Transactions';
import Statistics from './pages/Statistics';
import { getBalance } from './store/actions/tsx';
import { clearProjects, getProjects } from './store/actions/project';
import Menu from './components/Menu';
import PageHeader from './components/PageHeader';
import PageSubTitle from './components/PageSubTitle';
import PageNotFound from './pages/PageNotFound';
import MyTransactions from './pages/MyTransactions';
import Store from './pages/Store';
import Profile from './pages/Profile';
import ChooseTransaction from './pages/ChooseTransaction';
import Project from './pages/Project';
import Projects from './pages/Projects';
import Loading from './pages/Loading';
import Tsx from './pages/Tsx';
import MyInvestments from './pages/MyInvestments';
import NewProject from './pages/NewProject';
import ApprovePage from './pages/ApprovePage';
import Settings from './pages/Settings';
import Wallets from './pages/Wallets';
import Wallet from './pages/Wallet';
import { setupIonicReact } from '@ionic/react';
import TermsAndConditions from './pages/TermsAndConditions';

const App: React.FC<any> = ({ isAuthenticated, loadUser, auth, getBalance, location, history, getProjects, project, tsx, loadUsers, users }) => {


  // useEffect(() => {
  //   if (localStorage.token) {
  //     setAuthToken(localStorage.token);
  //     loadUser();
  //   }
  // }, [loadUser])
  
  useEffect(() => {
    if (auth?.user?.user_id) {
      getBalance(auth?.user)
    } else {
      getBalance()
    }
    
  }, [auth?.user?.user_id, auth?.user?.wallets, tsx?.tsxs?.length])

  useEffect(() => {
    if (auth?.user?.user_id) {
      getProjects(auth?.user)
    } else {
      getProjects()
    }

    /* return () => {
      
      console.log('clearr projects')
      clearProjects()
    } */
    
  }, [auth?.user, tsx?.tsxs?.length])
  
  useEffect(() => {
    
    loadUsers()

    /* return () => {
      
      console.log('clearr projects')
      clearProjects()
    } */
    
  }, [auth?.user])

  setupIonicReact({
    mode: 'md'
  });

  return (
  <IonApp>
    
    <Menu />
        {
          auth.loading ? <Fragment>
            <Loading />
          </Fragment> : users.loading ? <Fragment>
            <Loading />
          </Fragment> : isAuthenticated ? <Fragment>
            <IonRouterOutlet id="output">
              <Route exact path="/">
                <HomePageUser />
              </Route>
              <Route exact path="/my_transactions">
                <MyTransactions />
              </Route>
              <Route exact path="/my_investments">
                <MyInvestments />
              </Route>
              <Route exact path="/transactions">
                <Transactions />
              </Route>
              <Route exact path="/transactions/:tsx_id">
                <Tsx />
              </Route>
              <Route exact path="/new_transaction">
                <ChooseTransaction />
              </Route>
              <Route exact path="/new_project">
                <NewProject />
              </Route>
              <Route exact path="/statistics">
                <Statistics />
              </Route>
              <Route exact path="/store">
                <Store />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/projects/:project_id">
                <Project />
              </Route>
              <Route exact path="/projects">
                <Projects />
              </Route>
              <Route exact path="/settings">
                <Settings />
              </Route>
                
              <Route exact path="/wallets">
                <Wallets />
              </Route>
              <Route exact path="/wallets/:currency">
                <Wallet />
              </Route>
              <Route exact path="/security_center">
                <SecurityCenter />
              </Route>
              <Route exact path="/terms_and_conditions">
                <TermsAndConditions />
              </Route>
              <Route exact path="/account_approvement">
                {
                  auth?.user?.approved ? <PageNotFound /> : <ApprovePage />
                }
                
              </Route>
              <Route exact>
                <PageNotFound />
              </Route>

              <Route
                path="/home"
                render={() => <Redirect to="/" />}
                exact={true}
              />
              
            </IonRouterOutlet>
            
          </Fragment> : <Fragment>
            <IonRouterOutlet id="output">
              <Route exact path="/home">
                <HomePageGuest />
              </Route>
              <Route exact path="/security_center">
                <SecurityCenter />
              </Route>
              <Route exact path="/terms_and_conditions">
                <TermsAndConditions />
              </Route>
              <Route exact path="/recover_email">
                <RecoverEmail />
              </Route>
              <Route exact path="/recover_password">
                <RecoverPassword />
              </Route>
              <Route exact path="/logon">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/register/gsa">
                <GSA />
              </Route>
              <Route exact path="/transactions">
                <Transactions />
              </Route>
              <Route exact path="/transactions/:tsx_id">
                <Tsx />
              </Route>
              <Route exact path="/projects/:project_id">
                <Project />
              </Route>
              <Route exact path="/projects">
                <Projects />
              </Route>

              <Route exact>
                <PageNotFound />
              </Route>

              
              <Route
                path="/"
                render={() => <Redirect to="/home" />}
                exact={true}
              />

            </IonRouterOutlet>
          </Fragment>
        }

  </IonApp>
  )};
const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  project: state.project, 
  tsx: state.tsx,
  account: state.account,
  users: state.users
})
export default connect(mapStateToProps, { loadUser, getBalance, getProjects, clearProjects, loadUsers })(withRouter(App));
