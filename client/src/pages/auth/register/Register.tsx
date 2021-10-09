import { IonContent, IonPage, IonTitle, IonHeader, IonToolbar, IonLabel, IonInput, IonItemDivider, IonButton, IonCard, IonCardContent, IonCardHeader, IonList, IonItem, IonListHeader, IonCheckbox, IonNav, IonIcon, IonRouterLink, IonText, IonCardTitle, IonCardSubtitle, IonAvatar } from '@ionic/react';
import { useState } from 'react';
import PageHeader from '../../../components/PageHeader';
import PageSubTitle from '../../../components/PageSubTitle';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { checkmark } from 'ionicons/icons';

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

  return (
    <IonPage>

      <PageHeader />
      
      <IonContent fullscreen>

      <PageSubTitle subTitle={"Nibank > Register"} />

      <IonList>

          
          <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }} color="dark">Register for digital banking</IonTitle>
          </IonListHeader>

          <IonCard>
            <IonCardHeader>

              <IonCardTitle>
                How to register for Mobile {"&"} Online Banking
              </IonCardTitle>
              <IonCardSubtitle>
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
            
            <IonCardTitle>
              Continue registration

            </IonCardTitle>
            <IonCardSubtitle>
              To continue the registration process online, click the button below.

            </IonCardSubtitle>

          </IonCardHeader>

          <IonCardContent>
            
            <IonToolbar>
              <IonButton  onClick={() => history.push('/register/gsa')} type="button" size="default" color="primary" slot="end">
                Register for Online Banking
              </IonButton>
            </IonToolbar>


            
          </IonCardContent>
          </IonCard>  
          <IonCard>
            
            <IonCardHeader>
            <IonCardTitle>
              More information

            </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
            <IonToolbar>
            <IonItem>
              
                <IonRouterLink href="#" class="spacing">Setting up a Secure Key </IonRouterLink>
              
            </IonItem>
            <IonItem>
              
                <IonRouterLink href="#" class="spacing">I've forgotten or need to set up a telephone security number </IonRouterLink>
              
            </IonItem>
            <IonItem>
              
                <IonRouterLink href="#" class="spacing">Online Banking features </IonRouterLink>
              
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
