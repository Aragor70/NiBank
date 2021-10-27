
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonItem, IonFooter, IonList } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';


const FooterLoggedIn: React.FC<RouteComponentProps> = ({ history }) => {
  return (
      <IonFooter>
        <IonList className="ion-items-center" style={{ flexDirection: 'row' }}>

          <IonItem onClick={() => history.push("/")}>Overview</IonItem>
          <IonItem onClick={() => history.push("/store")}>Store</IonItem>
          <IonItem onClick={() => history.push("/contact")}>Contact</IonItem>
          <IonItem onClick={() => history.push("/profile")}>Profile</IonItem>
          
        </IonList>
      </IonFooter>
  );
};

export default withRouter(FooterLoggedIn);
