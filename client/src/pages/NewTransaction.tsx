
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonAlert } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { Fragment, useState } from 'react';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateTransaction from '../components/form/CreateTransaction';
import AccountsList from '../components/lists/AccountsList';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import PlatformOverwiev from '../components/PlatformOverwiev';

const NewTransaction: React.FC = () => {


  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > New transaction"} />
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                New transaction

            </IonTitle>
        </IonListHeader>

        <CreateTransaction />

        
      </IonList>
        
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};

export default NewTransaction;
