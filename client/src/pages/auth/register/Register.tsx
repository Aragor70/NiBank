import { IonContent, IonPage, IonTitle, IonHeader, IonToolbar, IonLabel, IonInput, IonItemDivider, IonButton, IonCard, IonCardContent, IonCardHeader, IonList, IonItem, IonListHeader, IonCheckbox, IonNav, IonIcon, IonRouterLink, IonText, IonCardTitle, IonCardSubtitle, IonAvatar } from '@ionic/react';
import { useState } from 'react';
import PageHeader from '../../../components/PageHeader';
import PageSubTitle from '../../../components/PageSubTitle';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { checkmark, home } from 'ionicons/icons';

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
        text: "Register", path: '/register', icon: '', 
      
      }
    ]

  return (
    <IonPage>

      <PageHeader />
      
      <IonContent fullscreen>

      <PageSubTitle subTitles={subTitles} />

      <IonList>

          
          <IonListHeader>
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
                      * You will receive an email with your Digital Secure Key. For more information, please visit our <IonRouterLink onClick={() => history.push("/security_center")}>Security Centre</IonRouterLink>.
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
            <IonItem>
              
                <IonRouterLink onClick={() => history.push('/register/gsa')} class="spacing">Setting up your account</IonRouterLink>
              
            </IonItem>
            <IonItem>
              
                <IonRouterLink onClick={() => history.push('/recover_email')} class="spacing">I've forgotten my email address</IonRouterLink>
              
            </IonItem>
            <IonItem>
              
                <IonRouterLink onClick={() => history.push('/recover_password')} class="spacing">I've forgotten my password</IonRouterLink>
              
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
