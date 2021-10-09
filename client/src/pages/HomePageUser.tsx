
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon } from '@ionic/react';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';

const Home: React.FC = () => {
  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home"} />
        
        
        
      </IonContent>

      
    </IonPage>
  );
};

export default Home;
