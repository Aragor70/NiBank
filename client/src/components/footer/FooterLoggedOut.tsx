
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonItem, IonFooter } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';


const FooterLoggedOut: React.FC<RouteComponentProps> = ({ history }) => {
  return (
      <IonFooter style={{ postion: 'static'}}>
        <IonItem className="ion-items-center">
          <span onClick={() => history.push("/")}>NiVest</span>
          
        </IonItem>
      </IonFooter>
  );
};

export default withRouter(FooterLoggedOut);
