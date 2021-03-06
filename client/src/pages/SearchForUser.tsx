
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useState } from 'react';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateTransfer from '../components/form/CreateTransfer';
import AccountsList from '../components/lists/AccountsList';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';

const NewTransaction: React.FC = () => {


  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > New transaction > Search for user"} />
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                Search for user

            </IonTitle>
        </IonListHeader>

        <AccountsList />
        
      </IonList>
        
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};

export default NewTransaction;
