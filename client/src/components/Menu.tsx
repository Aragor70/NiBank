
import { IonContent, IonHeader, IonItem, IonMenu, IonList, IonTitle, IonToolbar, IonFooter, IonText } from '@ionic/react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../store/actions/auth';
import Approval from './Approval';


const Menu: React.FC<any> = ({ history, logout, auth, location }) => {

  const path = location.pathname;

  return (
    <IonMenu side="start" menuId="first" contentId="output">
        <IonHeader mode="md">
          <IonToolbar color="primary" mode="md">
              <IonTitle>NiVest Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {
              auth.isAuthenticated ? <Fragment>
                <IonItem onClick={()=> history.push('/')}>
                  <IonText color={path === '/' ? 'success' : 'primary'}>
                    Overview
                  </IonText>
                </IonItem>
                <IonItem onClick={()=> history.push('/wallets')}>
                  <IonText color={path === '/wallets' ? 'success' : ''}>
                    My wallets
                  </IonText>
                </IonItem>
                <IonItem onClick={()=> history.push('/projects')}>
                  <IonText color={path === '/projects' ? 'success' : ''}>
                    Projects
                  </IonText>
                </IonItem>
                <IonItem onClick={()=> history.push('/transactions')}>
                  <IonText color={path === '/transactions' ? 'success' : ''}>
                    Transactions
                  </IonText>
                </IonItem>
                {/* <IonItem onClick={()=> history.push('/currency_exchange')}>Currency exchange</IonItem> */}
                <IonItem onClick={()=> history.push('/security_center')}>
                  <IonText color={path === '/security_center' ? 'success' : ''}>
                    Security Center
                  </IonText>
                </IonItem>
                <IonItem onClick={()=> history.push('/settings')}>
                  
                  {
                    (!auth?.user?.wallets?.length && auth?.user?.approved) ? 
                      <IonText color={path === '/settings' ? 'success' : 'warning'}>
                        Settings (create a new wallet)
                      </IonText> :
                      <IonText color={path === '/settings' ? 'success' : ''}>
                        Settings
                      </IonText>
                  }
                  
                </IonItem>
                <IonItem onClick={()=> logout(history)}>
                  <IonText>
                    Logout
                  </IonText>
                </IonItem>
                
                {
                  !auth?.user?.approved && <Approval />
                }
              </Fragment> : <Fragment>
                <IonItem onClick={()=> history.push('/')}>
                  <IonText color={path === '/home' ? 'success' : ''}>
                    Dashboard
                  </IonText>
                </IonItem>
                <IonItem onClick={()=> history.push('/logon')}>
                  <IonText color={path === '/logon' ? 'success' : 'primary'}>
                    Log on
                  </IonText>
                </IonItem>
                <IonItem onClick={()=> history.push('/register')}>
                  <IonText color={path === '/register' ? 'success' : ''}>
                    Register
                  </IonText>
                </IonItem>
                <IonItem onClick={()=> history.push('/security_center')}>
                  <IonText color={path === '/security_center' ? 'success' : ''}>
                    Security Center
                  </IonText>
                </IonItem>
                <IonItem onClick={()=> history.push('/projects')}>
                  <IonText color={path === '/projects' ? 'success' : ''}>
                    Project Opportunities
                  </IonText>
                </IonItem>
              </Fragment>
            }
              
          </IonList>
        </IonContent>

        <IonFooter className="ion-items-center">
          <IonItem onClick={()=> history.push('/terms_and_conditions')}>
            <IonText color="secondary">
              Terms {"&"} Conditions
            </IonText>
          </IonItem>
        </IonFooter>
  </IonMenu>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, { logout })(withRouter(Menu));
