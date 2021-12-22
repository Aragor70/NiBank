
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonItemDivider, IonCardSubtitle, IonGrid, IonRow, IonCol } from '@ionic/react';
import { card, checkmark, close, home, informationCircleOutline } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import NotFound from '../components/NotFound';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';

const SecurityCenter: React.FC<any> = ({ tsx, history }) => {

  const [loadingData, setLoadingData] = useState(false)

  const [arry, setArry] = useState<any[]>([])

  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    setArry(tsx.tsxs?.slice()?.sort((a: any, b: any) => a?.tsx_id - b?.tsx_id))
  }, [])

  

  const subTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }, 
    {
      text: "Security center", path: '/security_center', icon: '', 
    
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
              Security Center

            </IonTitle>
          </IonListHeader>

          
          <IonCard>
            <IonCardHeader>
            <IonCardTitle>
                Whether you’ve been the victim of fraud or are looking to learn how to protect yourself, this page outlines key information you should know and what we do to keep you safe and secure online.

            </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              
                <IonItem>
                    <IonAvatar slot="start">
                      <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                    </IonAvatar>
                    <IonLabel>
                      <IonText className="ion-text-wrap">
                        Report fraud
                      </IonText>
                      <IonItemDivider className="ion-text-wrap">
                        You should contact us immediately if you suspect fraud on your account.

                      </IonItemDivider>
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonAvatar slot="start">
                      <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                    </IonAvatar>
                    <IonLabel>
                      <IonText className="ion-text-wrap">
                        How to protect yourself
                      </IonText>
                      <IonItemDivider className="ion-text-wrap">
                        Find out what steps you can take to keep yourself safe when investing online.

                      </IonItemDivider>
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonAvatar slot="start">
                      <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                    </IonAvatar>
                    <IonLabel>
                      <IonText className="ion-text-wrap">
                        How we protect you
                      </IonText>
                      <IonItemDivider className="ion-text-wrap">
                        When you invest online with NiVest, you're protected by our global security network and by advanced security technology.

                      </IonItemDivider>
                    </IonLabel>
                </IonItem>
                
            </IonCardContent>
          </IonCard>

          
          <IonCard>

            <IonCardHeader>
              <IonCardTitle>
                Manual Scanning
              </IonCardTitle>

            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                You manually check if the protection mechanism detects inconsistencies in the list of current transactions.
              </IonItem>

              <IonItem>
                <IonButton slot="end" size="default" onClick={() => setIsScanning(!isScanning)}>Manual scanning</IonButton>
              </IonItem>

            </IonCardContent>

          </IonCard>

          {
            isScanning ? <Fragment>

                <IonCard>

                <IonCardHeader>
                  <IonCardTitle className="ion-items-center">
                    Protection check
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>

                  <IonGrid>

                    <IonRow>
                      <IonCol className="ion-items-center">
                        ID
                      </IonCol>
                      <IonCol className="ion-items-center">
                        <span>Previous</span><span>Hash</span>
                      </IonCol>
                      <IonCol className="ion-items-center">
                        <span>Current</span><span>Hash</span>
                      </IonCol>
                      <IonCol className="ion-items-center">
                        Correct
                      </IonCol>
                    </IonRow>
                    {
                      arry?.length ? arry?.map((element: any, index: number) => <IonRow key={index} onClick={() => history.push(`/transactions/${element.tsx_id}`)}>
                        <IonCol className="ion-items-center">{element?.tsx_id}</IonCol>
                        <IonCol className="ion-items-center"><IonIcon color="secondary" size="small" icon={informationCircleOutline}></IonIcon></IonCol>
                        <IonCol className="ion-items-center"><IonIcon color="secondary" size="small" icon={informationCircleOutline}></IonIcon></IonCol>
                        <IonCol className="ion-items-center">{index ? ((element.previous_hash !== element.current_hash) && (element.previous_hash === arry[index - 1].current_hash) ) ? <IonIcon icon={checkmark} color='success' size="large"></IonIcon> : <IonIcon icon={close} color='danger' size="large"></IonIcon> : <IonIcon icon={checkmark} color='success' size="large"></IonIcon>}</IonCol>
                      </IonRow>) : <IonRow>
                        <IonCol>
                          <NotFound message="No available transactions" />
                        </IonCol>
                      </IonRow>
                    }

                  </IonGrid>

                </IonCardContent>


                </IonCard>

            </Fragment> : false
          }

          <IonCard>
            <IonCardHeader>
            <IonCardTitle>
                Report fraud

            </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                It’s important to report suspected fraud as soon as possible to limit the unauthorised transactions and to minimise the impact on both you and your credit record. 

              </IonItem>
              <IonItem>
                Whether you’ve been the victim of fraud or are looking to learn how to protect yourself, this page outlines key information you should know and what we do to keep you safe and secure online.

              </IonItem>
              
              
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
            <IonCardTitle>
                Protect yourself from fraud

            </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                It’s important to report suspected fraud as soon as possible to limit the unauthorised transactions and to minimise the impact on both you and your credit record. 



              </IonItem>
              <IonItem>
                Whether you’ve been the victim of fraud or are looking to learn how to protect yourself, this page outlines key information you should know and what we do to keep you safe and secure online.

              </IonItem>
              
              
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
            <IonCardTitle>
                How we protect you


            </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                It’s important to report suspected fraud as soon as possible to limit the unauthorised transactions and to minimise the impact on both you and your credit record. 



              </IonItem>
              <IonItem>
                Whether you’ve been the victim of fraud or are looking to learn how to protect yourself, this page outlines key information you should know and what we do to keep you safe and secure online.

              </IonItem>
              
              
            </IonCardContent>
          </IonCard>

      </IonList>
        
      </IonContent>

      
    </IonPage>
  );
};

const mapStateToProps = (state: any) => ({

  tsx: state.tsx

})
export default connect(mapStateToProps, {})(withRouter(SecurityCenter));
