
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Balance from '../components/Balance';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';

const Wallet: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > My wallet"} />
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                My wallet

            </IonTitle>
        </IonListHeader>

        <IonCard>

            <IonCardHeader>
                <IonCardTitle>
                    Whether you’ve been the victim of fraud or are looking to learn how to protect yourself, this page outlines key information you should know and what we do to keep you safe and secure online.



                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList>
                    <IonItem>
                        <IonAvatar slot="start">
                            <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                        </IonAvatar>
                        <IonLabel>
                            <IonItemDivider className="ion-items-center">
                                Mikolaj Bogumil Prus

                            </IonItemDivider>
                        </IonLabel>
                    </IonItem>
                    
                    <Balance />

                    <IonItem>
                        <IonRouterLink slot='start'>
                            <span onClick={()=> history.push('/new_transaction')}>+ New transaction</span>
                        </IonRouterLink>
                        
                    </IonItem>
                </IonList>
            </IonCardContent>
        </IonCard>
      </IonList>
        
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};

export default withRouter(Wallet);
