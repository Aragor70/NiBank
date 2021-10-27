
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateTransaction from '../components/form/CreateTransaction';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import Transaction from '../components/Transaction';

const Transactions: React.FC = () => {
  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > My transactions"} />
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                Transactions

            </IonTitle>
        </IonListHeader>

        <IonCard>
            <IonCardContent>
                <Transaction />
                <Transaction />
                <Transaction />
            </IonCardContent>
        </IonCard>
      </IonList>
        
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};

export default Transactions;
