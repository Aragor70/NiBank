
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonCard, IonItem, IonButton, IonInput, IonList, IonLabel, IonListHeader, IonCardHeader, IonCardContent, IonCardTitle, IonRouterLink, IonCheckbox } from '@ionic/react';
import { Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';


const PasswordField: React.FC<RouteComponentProps | any> = ({ formData, setFormData, history, step, setStep }) => {

    
    const { email, password } = formData;

    const handleChange = (e: any) => {
        
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    
  return (
      <Fragment>
            
              
          <IonToolbar>
            <IonItem>
              <IonLabel>E-mail</IonLabel>
              <IonInput value={email || ''} max="250" name="email" disabled></IonInput>
            
            </IonItem>
            <IonItem>
              <IonLabel>Password</IonLabel>
              <IonInput value={password || ''} max="250" name="password" onIonChange={ (e: any) => handleChange(e)}></IonInput>
            
            </IonItem>
          </IonToolbar>

            <IonItem>

              <IonLabel>Remember my E-mail</IonLabel>

              <IonCheckbox color="primary" slot="start"></IonCheckbox>
              
            </IonItem>
          <IonToolbar>
            <IonButton disabled={!(password)} onClick={() => setStep(3)} type="button" size="small" color="secondary" slot="end">Continue {">"}</IonButton>
          </IonToolbar>
          <IonToolbar>
            <IonItem>
              <IonRouterLink onClick={() => history.push("/recover_password")} class="spacing">Forgot your password?</IonRouterLink>
            </IonItem>
          </IonToolbar>

        
      </Fragment>
  );
};

export default withRouter(PasswordField);
