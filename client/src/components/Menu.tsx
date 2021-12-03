
import { IonContent, IonHeader, IonItem, IonMenu, IonList, IonTitle, IonToolbar } from '@ionic/react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../store/actions/auth';


const Menu: React.FC<any> = ({ history, logout, auth }) => {


  return (
    <IonMenu side="start" menuId="first" contentId="output">
        <IonHeader>
        <IonToolbar color="primary">
            <IonTitle>NiVest Menu</IonTitle>
        </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {
              auth.isAuthenticated ? <Fragment>
                <IonItem onClick={()=> history.push('/')}>Overview</IonItem>
                <IonItem onClick={()=> history.push('/wallets')}>My wallet</IonItem>
                <IonItem onClick={()=> history.push('/projects')}>Projects</IonItem>
                <IonItem onClick={()=> history.push('/transactions')}>Transactions</IonItem>
                {/* <IonItem onClick={()=> history.push('/currency_exchange')}>Currency exchange</IonItem> */}
                <IonItem onClick={()=> history.push('/security_center')}>Security Center</IonItem>
                <IonItem onClick={()=> history.push('/settings')}>Settings</IonItem>
                <IonItem onClick={()=> logout(history)}>Logout</IonItem>
              </Fragment> : <Fragment>
                <IonItem onClick={()=> history.push('/')}>Dashboard</IonItem>
                <IonItem onClick={()=> history.push('/logon')}>Log on</IonItem>
                <IonItem onClick={()=> history.push('/register')}>Register</IonItem>
                <IonItem onClick={()=> history.push('/security_center')}>Security Center</IonItem>
                <IonItem onClick={()=> history.push('/projects')}>Project Opportunities</IonItem>
              </Fragment>
            }
              
          </IonList>
        </IonContent>
  </IonMenu>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, { logout })(withRouter(Menu));
