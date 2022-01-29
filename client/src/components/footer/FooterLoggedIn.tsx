
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonItem, IonFooter, IonList } from '@ionic/react';
import { appsOutline, card, home, logoAppleAppstore, logOut, person, statsChart, storefront, storefrontOutline, storefrontSharp, wallet } from 'ionicons/icons';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { logout } from '../../store/actions/auth';


const FooterLoggedIn: React.FC<RouteComponentProps | any> = ({ auth, history, logout }) => {
  return (
      <IonFooter>
        
        <IonList className="ion-items-center" style={{ flexDirection: 'row' }}>
          
          <IonItem onClick={() => history.push("/")}><IonIcon size="large" color="secondary" icon={home}></IonIcon></IonItem>
          <IonItem onClick={() => history.push("/transactions")}><IonIcon size="large" color="secondary" icon={statsChart}></IonIcon></IonItem>
          <IonItem onClick={() => history.push("/store")}><IonIcon size="large" color="secondary" icon={appsOutline}></IonIcon></IonItem>
          {
            (!auth?.user?.wallets?.length && auth?.user?.approved) ? 
              <IonItem onClick={() => history.push("/settings")}><IonIcon size="large" color="warning" icon={person}></IonIcon></IonItem> :
              <IonItem onClick={() => history.push("/settings")}><IonIcon size="large" color="secondary" icon={person}></IonIcon></IonItem>
              
          }
          
          <IonItem onClick={() => logout(history)}><IonIcon size="large" color="secondary" icon={logOut}></IonIcon></IonItem>
          
        </IonList>
      </IonFooter>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(withRouter(FooterLoggedIn));
