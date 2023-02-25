
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonLoading, IonSpinner } from '@ionic/react';
import { checkmark, home, refresh } from 'ionicons/icons';
import { connect } from 'react-redux';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import FooterLoggedOut from '../components/footer/FooterLoggedOut';
import Loader from '../components/Loader';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';

const Loading: React.FC = ({ isAuthenticated }: any) => {

  
  const subTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    },
    {
      text: "Loading...", path: '/', icon: refresh
    }
  ]

  return (
    <IonPage id="output">

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitles={subTitles} />
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                Loading...

            </IonTitle>
        </IonListHeader>

        <Loader />
        
      </IonList>
        
        
      </IonContent>

      {
        isAuthenticated ? <FooterLoggedIn /> : null
      }
      
    </IonPage>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, {})(Loading);
