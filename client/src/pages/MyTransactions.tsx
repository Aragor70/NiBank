
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateTransaction from '../components/form/CreateTransaction';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import Transaction from '../components/Transaction';

const Transactions: React.FC<any> = ({ account }) => {
  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > My transactions"} />
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                My transactions

            </IonTitle>
        </IonListHeader>

        <IonCard>
            <IonCardContent>
            <IonList>
            {
              account.tsxs.length > 0 ? account.tsxs.map((element: any) => <Transaction key={element.tsx_id} tsx={element} />) : <IonItem>hi</IonItem>
            }
            </IonList>
            </IonCardContent>
        </IonCard>
      </IonList>
        
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
  account: state.account
})
export default connect(mapStateToProps, {  })(withRouter(Transactions));
