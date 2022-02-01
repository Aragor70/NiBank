
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider } from '@ionic/react';
import { businessOutline, card, checkmark, home } from 'ionicons/icons';
import { withRouter } from 'react-router-dom';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import PlatformOverwiev from '../components/PlatformOverwiev';

const Store: React.FC<any> = ({ history }) => {

  
  const subTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }, 
    {
      text: "Store", path: '/store', icon: '', 
    
    }
  ]


  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitles={subTitles} />
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                Store

            </IonTitle>
        </IonListHeader>
        <IonCard>
          <IonCardContent>
            <IonItem className="inner-items-active" onClick={() => history.push('/projects')}>
              <IonIcon slot="start" icon={businessOutline} color="primary"></IonIcon>
              <IonText>Projects</IonText>
            </IonItem>
            <IonItem className="inner-items-active" onClick={() => history.push('/transactions')}>
              <IonIcon slot="start" icon={card}></IonIcon>
              <IonText>Transactions</IonText>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonList>
        
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};

export default withRouter(Store);
