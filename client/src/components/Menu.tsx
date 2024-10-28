
import { IonContent, IonHeader, IonItem, IonMenu, IonList, IonTitle, IonToolbar, IonFooter, IonText, IonMenuToggle, IonIcon } from '@ionic/react';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import { add, atOutline, business, businessOutline, clipboard, enter, home, logOut, settings, shareOutline, statsChart, thunderstorm, wallet } from 'ionicons/icons';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../store/actions/auth';
import Approval from './Approval';


const Menu: React.FC<any> = ({ history, logout, auth, location }) => {

  const path = location.pathname;

  return (
    <IonMenu side="start" menuId="first" contentId="main">
        <IonHeader mode="md">
          <IonToolbar color="primary" mode="md">
              <IonTitle>NiVest Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {
              auth.isAuthenticated ? <Fragment>
                
                <IonMenuToggle>
                <IonItem routerLink={"/"}>
                  <IonIcon size="large" slot="start" color={path === '/home' ? 'success' : ''} icon={home}></IonIcon>
                  <IonText color={path === '/' ? 'success' : 'primary'}>
                    Overview
                  </IonText>
                </IonItem>
                <IonItem routerLink={"/wallets"}>
                  <IonIcon size="large" slot="start" color={path === '/home' ? 'success' : ''} icon={wallet}></IonIcon>
                  <IonText color={path === '/wallets' ? 'success' : ''}>
                    My wallets
                  </IonText>
                </IonItem>
                <IonItem routerLink={"/projects"}>
                  <IonIcon size="large" slot="start" color={path === '/home' ? 'success' : ''} icon={business}></IonIcon>
                  <IonText color={path === '/projects' ? 'success' : ''}>
                    Projects
                  </IonText>
                </IonItem>
                <IonItem routerLink={"/transactions"}>
                  <IonIcon size="large" slot="start" color={path === '/home' ? 'success' : ''} icon={statsChart}></IonIcon>
                  <IonText color={path === '/transactions' ? 'success' : ''}>
                    Transactions
                  </IonText>
                </IonItem>
                {/* <IonItem routerLink={"/currency_exchange"}>Currency exchange</IonItem> */}
                <IonItem routerLink={"/security_center"}>
                  <IonIcon size="large" slot="start" color={path === '/home' ? 'success' : ''} icon={thunderstorm}></IonIcon>
                  <IonText color={path === '/security_center' ? 'success' : ''}>
                    Security Center
                  </IonText>
                </IonItem>
                <IonItem routerLink={"/settings"}>
                  <IonIcon size="large" slot="start" color={path === '/home' ? 'success' : ''} icon={settings}></IonIcon>
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
                <IonItem onClick={()=> logout(history)} button>
                  <IonIcon size="large" slot="start" color={path === '/home' ? 'success' : ''} icon={logOut}></IonIcon>
                  <IonText>
                    Logout
                  </IonText>
                </IonItem>
                </IonMenuToggle>
                {
                  !auth?.user?.approved && <Approval />
                }
              </Fragment> : <Fragment>
              <IonMenuToggle>
                <IonItem routerLink={"/"}>
                  <IonIcon size="large" slot="start" color={path === '/home' ? 'success' : ''} icon={home}></IonIcon>
                  <IonText color={path === '/home' ? 'success' : ''}>
                    Dashboard
                  </IonText>
                </IonItem>
                <IonItem routerLink={"/logon"}>
                  <IonIcon size="large" slot="start" color={path === '/logon' ? 'success' : 'primary'} icon={enter}></IonIcon>
                  <IonText color={path === '/logon' ? 'success' : 'primary'}>
                    Log on
                  </IonText>
                </IonItem>
                <IonItem routerLink={"/register"}>
                  <IonIcon size="large" slot="start" color={path === '/register' ? 'success' : ''} icon={add}></IonIcon>
                  <IonText color={path === '/register' ? 'success' : ''}>
                    Register
                  </IonText>
                </IonItem>
                <IonItem routerLink={"/security_center"}>
                <IonIcon size="large" slot="start" color={path === '/security_center' ? 'success' : ''} icon={thunderstorm}></IonIcon>
                  <IonText color={path === '/security_center' ? 'success' : ''}>
                    Security Center
                  </IonText>
                </IonItem>
                <IonItem routerLink={"/projects"}>
                <IonIcon size="large" slot="start" color={path === '/projects' ? 'success' : ''} icon={businessOutline}></IonIcon>
                  <IonText color={path === '/projects' ? 'success' : ''}>
                    Project Opportunities
                  </IonText>
                </IonItem>
              </IonMenuToggle>

              </Fragment>
            }
              
          </IonList>
        </IonContent>

        <IonFooter className="ion-items-center">
          <IonMenuToggle>
            <IonItem routerLink={"/terms_and_conditions"}>
              <IonText color="secondary">
                Terms {"&"} Conditions
              </IonText>
            </IonItem>
          </IonMenuToggle>
        </IonFooter>
  </IonMenu>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, { logout })(withRouter(Menu));
