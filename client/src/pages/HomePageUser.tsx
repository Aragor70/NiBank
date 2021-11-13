
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonText, IonGrid, IonRow, IonCol } from '@ionic/react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Balance from '../components/Balance';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
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


        <IonGrid>
            <IonRow>
              <IonCol>
            <IonText className="ion-text-wrap">
                Balance
            </IonText>
              </IonCol>
              <IonCol>
            <IonText className="ion-items-center">
                { account.balance }
            </IonText>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonText className="ion-text-wrap">
                  Invested
              </IonText>
            </IonCol>
            <IonCol>
              <IonText className="ion-items-center">
              { account.totalFunds === undefined ? 'N/A' : account.totalFunds }
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow>    
            <IonCol>
            <IonText className="ion-text-wrap">
                Returned
            </IonText>
            </IonCol>
            <IonCol>
            <IonText className="ion-items-center">
                { account.yieldPA === undefined ? 'N/A' : account.yieldPA }
            </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
          <IonCol>
            <IonButton size="small" onClick={()=> history.push('new_transaction')}>
              New transaction
            </IonButton>
          </IonCol>
          <IonCol className="ion-items-center">
            <IonButton size="small" onClick={()=> history.push('my_transactions')}>
              History
            </IonButton>
          </IonCol>
          </IonRow>
        </IonGrid>
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
