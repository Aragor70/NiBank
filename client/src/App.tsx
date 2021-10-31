import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonPage, IonContent, IonCard, IonItem, IonButton  } from '@ionic/react';
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
import { loadUser } from './store/actions/auth';
import setAuthToken from './utils/setAuthToken';
import { connect } from 'react-redux';
import Wallet from './pages/Wallet';
import Transactions from './pages/Transactions';
import Statistics from './pages/Statistics';
import NewTransaction from './pages/NewTransaction';
import { getBalance } from './store/actions/tsx/tsx';
import Menu from './components/Menu';
import PageHeader from './components/PageHeader';
import PageSubTitle from './components/PageSubTitle';
import PageNotFound from './pages/PageNotFound';


const App: React.FC<any> = ({ isAuthenticated, loadUser, auth, getBalance, location, history }) => {


  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      loadUser();
    }
  }, [loadUser])
  
  useEffect(() => {
    if (auth.user) {
      getBalance(auth.user)
    }
    
  }, [auth.user])


  return (
  <IonApp>
    
    <Menu />
        {
          auth.loading ? <Fragment>
            <IonPage>
              <PageHeader />
              <IonContent fullscreen>

              <IonTitle>
                Loading...
              </IonTitle>

              </IonContent>
            </IonPage>
          </Fragment> : isAuthenticated ? <Fragment>
            <IonRouterOutlet id="output">
              <Route exact path="/">
                <HomePageUser />
              </Route>
              <Route exact path="/my_wallet">
                <Wallet />
              </Route>
              <Route exact path="/my_transactions">
                <Transactions />
              </Route>
              <Route exact path="/new_transaction">
                <NewTransaction />
              </Route>
              <Route exact path="/statistics">
                <Statistics />
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
  auth: state.auth
})
export default connect(mapStateToProps, { loadUser, getBalance })(withRouter(App));
