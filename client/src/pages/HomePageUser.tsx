
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon } from '@ionic/react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Balance from '../components/Balance';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import Transaction from '../components/Transaction';
import { logout } from '../store/actions/auth';

const Home: React.FC<RouteComponentProps | any> = ({ history, logout }) => {
  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home"} />
        
      <IonButton onClick={() => history.push('/my_wallet')}>My wallet</IonButton>
      <IonButton onClick={() => history.push('/my_transactions')}>My transactions</IonButton>
        


      <Balance />

      <Transaction />

      <IonButton onClick={() => logout(history)}>Log out</IonButton>

      </IonContent>
      <FooterLoggedIn />
      
    </IonPage>
  );
};

export default connect(null, { logout })(withRouter(Home));
