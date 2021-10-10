
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonItem } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';


const PageHeader: React.FC<RouteComponentProps> = ({ history }) => {
  return (
      <IonHeader>
        <IonItem>
          <IonTitle className="no-padding"><span onClick={() => history.push("/")}>NiBank</span></IonTitle>
          
          <IonIcon size="large" color="dark" name="menu-outline" slot="end"></IonIcon>
        </IonItem>
      </IonHeader>
  );
};

export default withRouter(PageHeader);
