
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider } from '@ionic/react';
import { checkmark, information, informationCircleOutline } from 'ionicons/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateTransfer from '../components/form/CreateTransfer';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import GlobalTsxListElement from '../components/GlobalTsxListElement';

const Transactions: React.FC<any> = ({ tsx }) => {
  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > Global transactions"} />
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                Global transactions

            </IonTitle>
        </IonListHeader>

        <IonCard>
            <IonCardContent>
            <IonList>
            {
              tsx?.tsxs?.length > 0 ? tsx?.tsxs?.map((element: any, index: number) => <GlobalTsxListElement key={element?.tsx_id || index} tsx={element} index={index} />) : <IonItem>
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={informationCircleOutline}></IonIcon>
                </IonAvatar>
                <IonText>
                No available transactions.
                </IonText>
                </IonItem>
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
  tsx: state.tsx
})
export default connect(mapStateToProps, {  })(withRouter(Transactions));
