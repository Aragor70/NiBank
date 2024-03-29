import { IonContent, IonPage, IonTitle, IonHeader, IonToolbar, IonLabel, IonInput, IonItemDivider, IonButton, IonCard, IonCardContent, IonCardHeader, IonList, IonItem, IonListHeader, IonCheckbox, IonNav, IonIcon, IonRouterLink, IonCardTitle, IonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import PageSubTitle from '../../components/PageSubTitle';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import EmailField from '../../components/login/EmailField';
import PasswordField from '../../components/login/PasswordField';
import { enter, home } from 'ionicons/icons';

type LoginForm = {
  email: string | null,
  password: string | null,
  emailSave?: boolean | null
}


const Login: React.FC<RouteComponentProps> = ({ history }) => {

  const [formData, setFormData] = useState<LoginForm>({
    email: localStorage.email || '',
    password: '',
    emailSave: localStorage.email ? true : false
  })

useEffect(() => {

  if (localStorage.email) {
    
    setFormData({ ...formData, email: localStorage.email, emailSave: true })

  }
  return () => {
    setFormData({
      email: '',
      password: '',
      emailSave: false
    })
  }
}, [localStorage.email])

const [step, setStep] = useState(1)

const { email, password } = formData;

/* const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

} */


  
  const subTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }, 
    {
      text: "Log on", path: '/logon', icon: enter, 
    
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
              <IonIcon size="large" color='dark' icon={enter}></IonIcon>
            </IonItem>
            <IonTitle style={{ textAlign: 'center' }} color="dark">Log on to Online Platform</IonTitle>
          </IonListHeader>

        <IonCard>



          <IonCardHeader>
            <IonTitle color="dark">Online Platform</IonTitle>
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
            <IonCardTitle mode="md">Register to Online Platform</IonCardTitle>

          </IonCardHeader>
          <IonCardContent>
              
            <IonItem>
              Manage your virtual money online with our secure Online Platform service.

            </IonItem>
                
            <IonToolbar mode="md">
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
