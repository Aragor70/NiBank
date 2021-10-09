
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon } from '@ionic/react';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const Home: React.FC <RouteComponentProps> = ({ history }) => {
  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home"} />

        <IonList>
          
          <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
              Getting started

            </IonTitle>
          </IonListHeader>
          <IonCard>
            <IonCardHeader>
            <IonCardTitle>
              If you’re not yet an online banking customer:

            </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                Follow the on screen instructions to register and activate your Digital Secure Key.
              </IonItem>
              
              <IonToolbar>
                <IonButton onClick={() => history.push('/register')} type="button" size="small" color="secondary" slot="end">Register {">"}</IonButton>
              </IonToolbar>
              
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
            <IonCardTitle>
            If you’re already registered for online banking:

            </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
              Follow the instructions of the Mobile Banking app by entering your online banking log on details.

              </IonItem>
              
              <IonToolbar>
                <IonButton onClick={() => history.push('/logon')} type="button" size="small" color="secondary" slot="end">Log on {">"}</IonButton>
              </IonToolbar>
            </IonCardContent>
          </IonCard>

        </IonList>
        <IonList>

          <IonListHeader>
          <IonTitle style={{ textAlign: 'center' }}>
            Why use the app?
          </IonTitle>
          </IonListHeader>
          <IonCard>
            <IonCardHeader>
              Transaction notifications

            </IonCardHeader>
            <IonCardContent>
              Get notified when money goes in or out of your account.

            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              Chat with us

            </IonCardHeader>
            <IonCardContent>
              Chat with us at a time that’s convenient for you with 24/7 support on mobile chat. 


            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              Confirm your purchases

            </IonCardHeader>
            <IonCardContent>
              Keep yourself safe from fraud by confirming online card payments in the app.



            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              You have no other choice

            </IonCardHeader>
            <IonCardContent>
              The NiBank service exists only as a mobile application.



            </IonCardContent>
          </IonCard>
        </IonList>
      </IonContent>

      
    </IonPage>
  );
};

export default withRouter(Home);
