
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonItem, IonFooter } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';


const FooterLoggedIn: React.FC<RouteComponentProps> = ({ history }) => {
  return (
      <IonFooter>
        <IonItem>
          <span onClick={() => history.push("/")}>NiBank</span>
          
        </IonItem>
      </IonFooter>
  );
};

export default withRouter(FooterLoggedIn);
