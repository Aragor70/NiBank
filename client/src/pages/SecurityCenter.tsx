
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonItemDivider } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';

const SecurityCenter: React.FC = () => {
  return (
    <IonPage>

      <PageHeader />

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > Help > Security Center"} />
        
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
                        Find out what steps you can take to keep yourself safe and secure when banking online.



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
                        When you bank online with NiBank, you're protected by our global security network and by advanced security technology.

                      </IonItemDivider>
                    </IonLabel>
                </IonItem>
                
            </IonCardContent>
          </IonCard>
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

export default SecurityCenter;
