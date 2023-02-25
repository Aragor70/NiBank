
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonItemDivider, IonInput, useIonAlert, IonSpinner } from '@ionic/react';
import { atCircle, atCircleOutline, home } from 'ionicons/icons';
import { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import PageSubTitle from '../../components/PageSubTitle';
import { updateEmail, verifySecret } from '../../store/actions/auth';

const RecoverEmail: React.FC <any> = ({ verifySecret, history, updateEmail }) => {


  const [formData, setFormData] = useState<any>({
    secret: '',
    password: '',
    email: '',
    emailConfirmation: ''
  })


  const handleChange = (e: any) => {
    return setFormData({...formData, [e.target.name]: e.target.value})
  }

  const [loadingData, setLoadingData] = useState(false)

  const [present] = useIonAlert();

  const [ step, setStep ] = useState<any>(0);

    
  const handleVerify = async(e: any) => {
    try {
      e.preventDefault();
      if (!formData?.secret || !formData?.password) {
        return false;
      }
      console.log('heyy')

      await setLoadingData(true);

      await verifySecret(formData, setStep, present);
      
      setLoadingData(false)

    } catch (err: any) {

      console.log(err.message)
      
    }

  }

  const handleSubmit = async(e: any) => {
    try {
      e.preventDefault();

      if (!formData?.secret || !formData?.password) {
        return false;
      }
      
      await setLoadingData(true)

      await updateEmail(formData, history, present)
      
      await setLoadingData(false)
      
    } catch (err: any) {

      console.log(err.message)
      
    }

  }

  
  const subTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }, 
    {
      text: "Recover e-mail", path: '/recover_email', icon: atCircleOutline, 
    
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
              <IonIcon size="large" color='dark' icon={atCircleOutline}></IonIcon>
            </IonItem>
            <IonTitle style={{ textAlign: 'center' }}>
                Forgot your e-mail? 

            </IonTitle>
          </IonListHeader>
          
          <IonCard>
            <IonCardHeader>
            <IonCardTitle mode="md">
                Recover e-mail

            </IonCardTitle>
            </IonCardHeader>
            {
              step === 0 && <IonCardContent>
                      
              <IonItem>
                Provide your private key and account password below.
              </IonItem>
              <form onSubmit={(e: any) => handleVerify(e)}>
                <IonItem>
                    <IonLabel>
                      Private key
                    </IonLabel>
                    <IonInput name="secret" slot="end" value={ formData.secret || '' } onIonChange={(e: any)=> handleChange(e)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>
                      Password
                    </IonLabel>
                    <IonInput name="password" type="password" slot="end" value={ formData.password || '' } onIonChange={(e: any)=> handleChange(e)}></IonInput>
                </IonItem>
                <IonItem>
                  <IonButton type="submit" slot="end" size="default" disabled={ !(formData.secret && formData.password) }>
                  {
                    loadingData ? <IonSpinner duration={1500} color="light"></IonSpinner> : "Verify"
                  }
                  </IonButton>
                </IonItem>
              </form>
                
                
            </IonCardContent>
            }
            {
              step === 1 && <IonCardContent>
                      
                <IonItem>
                  What is your new email address?
                </IonItem>
                <form onSubmit={(e: any) => handleSubmit(e)}>
                  <IonItem>
                      <IonLabel>
                        Email
                      </IonLabel>
                      <IonInput name="email" slot="end" value={ formData.email || '' } onIonChange={(e: any)=> handleChange(e)}></IonInput>
                  </IonItem>
                  <IonItem>
                      <IonLabel>
                        Email repeat
                      </IonLabel>
                      <IonInput name="emailConfirmation" slot="end" value={ formData.emailConfirmation || '' } onIonChange={(e: any)=> handleChange(e)}></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonButton type="submit" slot="end" size="default" disabled={ !(formData.secret) }>
                    {
                      loadingData ? <IonSpinner duration={1500} color="light"></IonSpinner> : "Send"
                    }
                    </IonButton>
                  </IonItem>
                </form>
                  
                  
              </IonCardContent>
            }
            
          </IonCard>
          
      </IonList>
        
      </IonContent>

      
    </IonPage>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, { verifySecret, updateEmail })(withRouter(RecoverEmail));
