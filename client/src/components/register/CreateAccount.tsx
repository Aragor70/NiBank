
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonCard, IonItem, IonButton, IonInput, IonList, IonLabel, IonListHeader, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/react';
import { Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';


const CreateAccount: React.FC<RouteComponentProps | any> = ({ formData, setFormData, history, step, setStep }) => {

    
    const { termsAndConditions, email, password, passwordConfirmation, twoFactor, accountType} = formData;

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

  return (
      <Fragment>
            
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle className="ion-items-center">
                        Create account
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
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
                        <IonInput value={password || ''} max="250" name="password" onIonChange={ (e: any) => handleChange(e)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel slot="start">
                            Confirm password
                        </IonLabel>
                        <IonInput value={passwordConfirmation || ''} name="passwordConfirmation" onIonChange={ (e: any) => handleChange(e)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <div className="ion-items-center">
                        <IonButton disabled={!(accountType && termsAndConditions && email && password && passwordConfirmation && password === passwordConfirmation && email.includes('@') && email.includes('.'))} onClick={() => setStep(4)} type="button" size="default" color="primary">
                            Continue
                        </IonButton>
                        </div>
                    </IonItem>
                </IonCardContent>
            </IonCard>

        
      </Fragment>
  );
};

export default withRouter(CreateAccount);
