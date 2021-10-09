import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle  } from '@ionic/react';
import { IonReactRouter} from '@ionic/react-router';
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
import { Fragment, useState } from 'react';
import GSA from './pages/auth/register/GSA';
import SecurityCenter from './pages/SecurityCenter';
import RecoverEmail from './pages/auth/RecoverEmail';
import RecoverPassword from './pages/auth/RecoverPassword';

const App: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)


  return (
  <IonApp>
    <IonReactRouter>
      
      <IonRouterOutlet>
        {
          isLoggedIn ? <Fragment>
            
            <Route exact path="/home">
              <HomePageUser />
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

          </Fragment>
        }



        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

      </IonRouterOutlet>

    </IonReactRouter>
  </IonApp>
  )};

export default App;
