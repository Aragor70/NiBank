import { IonContent, IonPage, IonTitle, IonHeader, IonToolbar, IonLabel, IonInput, IonItemDivider, IonButton, IonCard, IonCardContent, IonCardHeader, IonList, IonItem, IonListHeader, IonCheckbox, IonNav, IonIcon, IonRouterLink, IonCardTitle, IonAlert } from '@ionic/react';
import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import PageSubTitle from '../../components/PageSubTitle';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import EmailField from '../../components/login/EmailField';
import PasswordField from '../../components/login/PasswordField';

type LoginForm = {
  email: string | null,
  password: string | null
}


const Login: React.FC<RouteComponentProps> = ({ history }) => {

  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  })

const [step, setStep] = useState(1)

const { email, password } = formData;

/* const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

} */

  return (
    <IonPage>

      <PageHeader />
      
      <IonContent fullscreen>

      <PageSubTitle subTitle={"Nibank > Log on"} />

      <IonList>

          

          <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }} color="dark">Log on to Online Banking</IonTitle>
          </IonListHeader>

        <IonCard>



          <IonCardHeader>
            <IonTitle color="dark">Online Banking</IonTitle>
          </IonCardHeader>
          <IonCardContent>

            
          <IonList>

            {
              !step || step === 1 && <EmailField formData={formData} setFormData={setFormData} step={step} setStep={setStep} />
            }
            {
              step === 2 && <PasswordField formData={formData} setFormData={setFormData} step={step} setStep={setStep} />
            }
            
            
          </IonList>
          
              
            

          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Register for Online Banking</IonCardTitle>

          </IonCardHeader>
          <IonCardContent>
              
            <IonItem>
            Manage your money online with our secure Online Banking service.

            </IonItem>
                
            <IonToolbar>
              <IonButton onClick={() => history.push('/register')} type="button" size="small" color="secondary" slot="end">Register now {">"}</IonButton>
            </IonToolbar>

          </IonCardContent>
        </IonCard>

      </IonList>
    </IonContent>

  </IonPage>
  );
};

export default withRouter(Login);
