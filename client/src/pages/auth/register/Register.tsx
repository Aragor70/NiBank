import { IonContent, IonPage, IonTitle, IonHeader, IonToolbar, IonLabel, IonInput, IonItemDivider, IonButton, IonCard, IonCardContent, IonCardHeader, IonList, IonItem, IonListHeader, IonCheckbox, IonNav, IonIcon, IonRouterLink, IonText, IonCardTitle, IonCardSubtitle, IonAvatar } from '@ionic/react';
import { useState } from 'react';
import PageHeader from '../../../components/PageHeader';
import PageSubTitle from '../../../components/PageSubTitle';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { add, atCircleOutline, checkmark, constructOutline, home, keyOutline, list, thunderstorm } from 'ionicons/icons';

type RegisterForm = {
  email: string | null,
  password: string | null
}


const Register: React.FC <RouteComponentProps> = ({ history }) => {

  const [formData, setFormData] = useState<RegisterForm>({
    email: null,
    password: null
})
const { email, password } = formData;

const handleTyping = (e: { target: HTMLInputElement }) => {
    
    setFormData({...formData, [e.target.name]: e.target.value})
}
const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    
}


    const subTitles: any[] = [
      {
        text: "Home", path: '/', icon: home
      }, 
      {
        text: "Register", path: '/register', icon: add, 
      
      }
    ]

  return (
    <IonPage>

      <PageHeader />
      
      <IonContent fullscreen>

      <PageSubTitle subTitles={subTitles} />

      <IonList>

          
          <IonListHeader>
              
            <IonItem lines='none'>
              <IonIcon size="large" color='dark' icon={add}></IonIcon>
            </IonItem>
            <IonTitle style={{ textAlign: 'center' }} color="dark">Register to digital platform</IonTitle>
          </IonListHeader>

          <IonCard>
            <IonCardHeader>

              <IonCardTitle mode="md">
                How to register to Mobile {"&"} Online Platform
              </IonCardTitle>
              <IonCardSubtitle mode={"md"}>
                Before you begin, you'll need:
              </IonCardSubtitle>

            </IonCardHeader>
            <IonCardContent>
              <IonList>

                
                <IonCard>
                  <IonItem>
                    <IonAvatar slot="start">
                      <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                    </IonAvatar>
                    <IonLabel>
                      <IonText className="ion-text-wrap">
                        Your formal email address for the current account *.
                      </IonText>
                    </IonLabel>
                  </IonItem>
                </IonCard>

                <IonCard>
                  <IonItem>
                    
                    <IonAvatar slot="start">
                      <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                    </IonAvatar>
                    <IonLabel>
                    <IonText className="ion-text-wrap">
                      Password at least 8 characters long.
                    </IonText>
                    </IonLabel>
                  </IonItem>
                  <IonItem>

                    <IonText>
                      * You will receive an email with your Digital Secure Key. For more information, please visit our <IonRouterLink onClick={() => history.push("/security_center")}><IonIcon icon={thunderstorm}></IonIcon><IonText>Security Centre</IonText></IonRouterLink>.
                    </IonText>
                  </IonItem>

                </IonCard>



              </IonList>
            </IonCardContent>
          </IonCard>

          <IonCard>
          
          <IonCardHeader>
            
            <IonCardTitle mode="md">
              Continue registration

            </IonCardTitle>
            <IonCardSubtitle mode={"md"}>
              To continue the registration process online, click the button below.

            </IonCardSubtitle>

          </IonCardHeader>

          <IonCardContent>
            
            <IonToolbar mode="md">
              <IonButton  onClick={() => history.push('/register/gsa')} type="button" size="default" color="primary" slot="end">
                Register to Online Platform
              </IonButton>
            </IonToolbar>


            
          </IonCardContent>
          </IonCard>  
          <IonCard>
            
            <IonCardHeader>
            <IonCardTitle mode="md">
              More information

            </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
            <IonToolbar mode="md">
            <IonItem routerLink="/register/gsa">
              
                <IonIcon icon={add} slot="start" size="large"></IonIcon>
                <IonText color="primary">Setting up your account</IonText>
              
            </IonItem>
            <IonItem routerLink="/recover_email">
              <IonIcon icon={atCircleOutline} slot="start" size="large"></IonIcon>
              <IonText color="primary">I've forgotten my email address</IonText>

            </IonItem>
            <IonItem routerLink="/recover_password">
              <IonIcon icon={keyOutline} slot="start" size="large"></IonIcon>
              <IonText color="primary">I've forgotten my password</IonText>
              
            </IonItem>
            <IonItem routerLink="/terms_and_conditions">
              <IonIcon icon={list} slot="start" size="large"></IonIcon>
              <IonText color="primary">Terms and conditions</IonText>
              
            </IonItem>
            </IonToolbar>
            </IonCardContent>
          </IonCard>

      </IonList>
    </IonContent>

  </IonPage>
  );
};

export default withRouter(Register);
