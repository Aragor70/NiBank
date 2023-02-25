
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonCard, IonItem, IonButton, IonInput, IonList, IonLabel, IonListHeader, IonCardHeader, IonCardContent, IonCardTitle, useIonAlert, IonSpinner } from '@ionic/react';
import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { preRegister } from '../../store/actions/auth';


const CreateAccount: React.FC<RouteComponentProps | any> = ({ formData, setFormData, history, step, setStep, preRegister }) => {

    
    const { termsAndConditions, email, password, passwordConfirmation, twoFactor, accountType} = formData;

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const [loadingData, setLoadingData] = useState(false)
    
    const [present] = useIonAlert();
    
    const checkEmail = async (e: any) => {
      
        try {
  
          e.preventDefault();
          await setLoadingData(true)

          await preRegister(formData, present, setStep);

          await setLoadingData(false)
  
  
        } catch (err: any) {
          console.log(err.message)
        }
  
      }

  return (
      <Fragment>
            
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle className="ion-items-center" mode="md">
                        Create account
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                <form onSubmit={(e: any) => checkEmail(e)}>
                    <IonItem>
                        <IonLabel slot="start">
                            E-mail address
                        </IonLabel>

                        <IonInput value={email || ''} max="50" name="email" onIonChange={ (e: any) => handleChange(e)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel slot="start">
                            Your password
                        </IonLabel>
                        <IonInput value={password || ''} max="250" type="password" name="password" onIonChange={ (e: any) => handleChange(e)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel slot="start">
                            Confirm password
                        </IonLabel>
                        <IonInput value={passwordConfirmation || ''} max="250" type="password" name="passwordConfirmation" onIonChange={ (e: any) => handleChange(e)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <div className="ion-items-center">
                        <IonButton disabled={!(accountType && termsAndConditions && email && password && passwordConfirmation && password === passwordConfirmation && email.includes('@') && email.includes('.') && !(new RegExp("\\\\","").test(email)) && !(new RegExp("\\\\","").test(password)))} type="submit" size="default" color="primary">
                        {
                            loadingData ? <IonSpinner duration={1500} color="light"></IonSpinner> : "Continue"
                        }
                        </IonButton>
                        </div>
                    </IonItem>
                </form>
                </IonCardContent>
            </IonCard>

        
      </Fragment>
  );
};

export default connect(null, { preRegister })(withRouter(CreateAccount));
