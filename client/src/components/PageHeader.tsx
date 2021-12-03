
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonItem } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';


import { menuController } from '@ionic/core';

const PageHeader: React.FC<RouteComponentProps> = ({ history }) => {
  return (
      <IonHeader>
        <IonItem>
          <IonTitle className="no-padding"><span onClick={() => history.push("/")}>NiVest</span></IonTitle>
          
          <IonIcon size="large" color="dark" name="menu-outline" slot="end" onClick={()=> menuController.open()}></IonIcon>
        </IonItem>
      </IonHeader>
  );
};

export default withRouter(PageHeader);
