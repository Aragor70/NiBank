import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle  } from '@ionic/react';
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
import { Fragment, useEffect } from 'react';
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
import FooterLoggedIn from './components/footer/FooterLoggedIn';
import NewTransaction from './pages/NewTransaction';
import { getBalance } from './store/actions/tsx/tsx';

const App: React.FC<any> = ({ isAuthenticated, loadUser, auth, getBalance }) => {


  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      loadUser();
    }
  }, [loadUser])
  useEffect(() => {
    getBalance(auth.user)
  }, [])


  return (
  <IonApp>
        {
          isAuthenticated ? <Fragment>
            
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
            

            <Route exact path="/home">
              <Redirect to="/" />
            </Route>
            
            
          </Fragment> : <Fragment>

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

            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </Fragment>
        }



        

  </IonApp>
  )};
const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
})
export default connect(mapStateToProps, { loadUser, getBalance })(App);
