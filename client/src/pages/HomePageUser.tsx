
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonText } from '@ionic/react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Balance from '../components/Balance';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import Transaction from '../components/Transaction';
import { logout } from '../store/actions/auth';

const Home: React.FC<RouteComponentProps | any> = ({ history, logout, account }) => {
  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home"} />
        

      
      <IonList>
        <IonListHeader>
          <IonTitle>

          </IonTitle>
        </IonListHeader>

        <Balance />

        <IonItem>    
          <IonText className="ion-text-wrap" slot='start'>
              Invested
          </IonText>
          <IonText className="ion-items-center">
          { account.totalFunds === undefined ? 'N/A' : account.totalFunds }
          </IonText>
        </IonItem>

        <IonItem>    
          <IonText className="ion-text-wrap" slot='start'>
              Returned
          </IonText>
          <IonText className="ion-items-center">
              { account.yieldPA === undefined ? 'N/A' : account.yieldPA }
          </IonText>
        </IonItem>
        
        <IonItem>
          <IonButton slot="end" size="default" onClick={()=> history.push('my_transactions')}>
            History
          </IonButton>
        </IonItem>
      </IonList>

      </IonContent>
      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
  account: state.account
})
export default connect(mapStateToProps, { logout })(withRouter(Home));
