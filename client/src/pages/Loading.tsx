
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonLoading, IonSpinner } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import Loader from '../components/Loader';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';

const Loading: React.FC = () => {
  return (
    <IonPage id="output">

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > Loading..."} />
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                Loading...

            </IonTitle>
        </IonListHeader>

        <Loader />
        
        
        
      </IonList>
        
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};

export default Loading;
