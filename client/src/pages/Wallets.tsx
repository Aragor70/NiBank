
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';

const Wallets: React.FC<any> = ({ account, history }) => {

  
  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > Wallets"} />
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                Wallets

            </IonTitle>
        </IonListHeader>

        <IonList>
            <IonListHeader>
                <IonTitle className="no-padding">
                    Current wallets

                </IonTitle>
            </IonListHeader>
            {
                account.loading ? <Loader /> : account.wallets.length ? account.wallets.map((element: any, index: number) => <Fragment key={index}>
                    <IonItem style={{ fontSize: '16px' }} onClick={() => history.push(`/wallets/${element.currency}`)}>
                        { element ? element.balance : 'N/A' } { element ? element.currency : 'N/A' }
                    </IonItem>
                </Fragment>) : <NotFound message={"No available wallets."} />
            }
        </IonList>
        
      </IonList>
        
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
  account: state.account
})
export default connect(mapStateToProps, {})(withRouter(Wallets));
