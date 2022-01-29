
import { IonContent, IonHeader, IonItem, IonMenu, IonList, IonTitle, IonToolbar, IonFooter, IonText } from '@ionic/react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../store/actions/auth';
import Approval from './Approval';


const Menu: React.FC<any> = ({ history, logout, auth }) => {


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
                  <IonText color="primary">
                    Overview
                  </IonText>
                </IonItem>
                <IonItem onClick={()=> history.push('/wallets')}>
                  <IonText>
                    My wallets
                  </IonText>
                </IonItem>
                <IonItem onClick={()=> history.push('/projects')}>
                  <IonText>
                    Projects
                  </IonText>
                </IonItem>
                <IonItem onClick={()=> history.push('/transactions')}>
                  <IonText>
                    Transactions
                  </IonText>
                </IonItem>
                {/* <IonItem onClick={()=> history.push('/currency_exchange')}>Currency exchange</IonItem> */}
                <IonItem onClick={()=> history.push('/security_center')}>
                  <IonText>
                    Security Center
                  </IonText>
                </IonItem>
                <IonItem onClick={()=> history.push('/settings')}>
                  
                  {
                    (!auth?.user?.wallets?.length && auth?.user?.approved) ? 
                      <IonText color="warning">
                        Settings (create a new wallet)
                      </IonText> :
                      <IonText>
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
                  <IonText>
                    Dashboard
                  </IonText>
                </IonItem>
                <IonItem onClick={()=> history.push('/logon')}>
                  <IonText color="primary">
                    Log on
                  </IonText>
                </IonItem>
                <IonItem onClick={()=> history.push('/register')}>
                  <IonText>
                    Register
                  </IonText>
                </IonItem>
                <IonItem onClick={()=> history.push('/security_center')}>
                  <IonText>
                    Security Center
                  </IonText>
                </IonItem>
                <IonItem onClick={()=> history.push('/projects')}>
                  <IonText>
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
