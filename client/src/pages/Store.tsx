
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import PlatformOverwiev from '../components/PlatformOverwiev';

const Store: React.FC = () => {
  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > Store"} />
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                Store

            </IonTitle>
        </IonListHeader>

        
        
      </IonList>
        
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};

export default Store;
