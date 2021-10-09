
import { IonHeader, IonToolbar, IonTitle, IonIcon } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';


const PageHeader: React.FC<RouteComponentProps> = ({ history }) => {
  return (
      <IonHeader>
        <IonToolbar>
          <IonTitle><span onClick={() => history.push("/")}>NiBank</span></IonTitle>
          
          <IonIcon size="large" color="dark" name="menu-outline" slot="end"></IonIcon>
        </IonToolbar>
      </IonHeader>
  );
};

export default withRouter(PageHeader);
