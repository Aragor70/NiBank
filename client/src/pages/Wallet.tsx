
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonGrid, IonRow, IonCol } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';

const Wallet: React.FC<any> = ({ account, match, tsx }) => {

  const [walletDetails, setWalletDetails] = useState<any>({
      balance: 0,
      in: 0,
      out: 0,
      loading: true
  });
  const [loadingData, setLoadingData] = useState(false)

    const getData = async () => {

        const value = await account?.wallets?.filter((element: any) => element.currency === match?.params?.currency)[0]

        await setWalletDetails(value || null)

    }
  useEffect(() => {

    getData()
    

  }, [match?.params?.currency, tsx.loading])


  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > Wallets > Wallet"} />
        
            

      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                {match?.params?.currency || 'N/A'}

            </IonTitle>
        </IonListHeader>

            {
                tsx?.loading ? <Loader /> : match?.params?.currency ? <Fragment>

                    <IonItem className="ion-items-center">
                    <IonGrid>
                        <IonRow>
                            <IonCol className="ion-items-center">
                                <IonText>TOTAL</IonText>
                                <IonTitle className="no-padding">
                                    {walletDetails?.balance} {walletDetails?.currency}
                                </IonTitle>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    </IonItem>

                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <IonCol className="ion-items-center">
                                    <IonText>IN</IonText>
                                <IonText>
                                    {walletDetails?.in} {walletDetails?.currency}
                                </IonText>
                                </IonCol>
                                <IonCol className="ion-items-center">
                                    <IonText>OUT</IonText>
                                <IonText>
                                   -{walletDetails?.out} {walletDetails?.currency}
                                </IonText>
                                </IonCol>

                            </IonRow>
                        </IonGrid>
                        
                        
                    </IonItem>




                </Fragment> : <NotFound message={'No available wallet.'} />
            }
        
      </IonList>
        
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
  account: state.account,
  tsx: state.tsx
})
export default connect(mapStateToProps, {})(withRouter(Wallet));
