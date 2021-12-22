
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonCard, IonItem, IonButton, IonInput, IonList, IonLabel, IonListHeader, IonCardHeader, IonCardContent, IonCardTitle, IonRouterLink, IonCheckbox, useIonAlert } from '@ionic/react';
import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { login } from '../../store/actions/auth';


const PasswordField: React.FC<RouteComponentProps | any> = ({ formData, setFormData, history, step, setStep, login, setAlert  }) => {

    
    const { email, password } = formData;

    
    const [present] = useIonAlert();

    const handleChange = (e: any) => {
        
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const loginHandler = async (e: any) => {
      try {
        
        e.preventDefault();

        await login(formData, history, present);

        await setFormData({});
        await setStep(1);

      } catch (err: any) {
        
        console.log(err.message)
      }
    }

    
  return (
      <Fragment>
            
        <form onSubmit={(e: any) => loginHandler(e)}>
          <IonToolbar mode="md">
            <IonItem>
              <IonLabel>E-mail</IonLabel>
              <IonInput value={email || ''} max="250" name="email" disabled></IonInput>
            
            </IonItem>
            <IonItem>
              <IonLabel>Password</IonLabel>
              <IonInput value={password || ''} max="250" type="password" name="password" onIonChange={ (e: any) => handleChange(e)}></IonInput>
            
            </IonItem>
          </IonToolbar>

            <IonItem>

              <IonLabel>Remember my E-mail</IonLabel>

              <IonCheckbox checked={ formData?.emailSave } onIonChange={(e: any) => setFormData({ ...formData, emailSave: e.detail.checked }) } color="primary" slot="start"></IonCheckbox>
              
            </IonItem>
          <IonToolbar mode="md">
            <IonButton disabled={!(password && email && email.includes('@') && email.includes('.') && !(new RegExp("\\\\","").test(email)) && !(new RegExp("\\\\","").test(password)))} type="submit" size="small" color="secondary" slot="end">Log on</IonButton>
            <button style={{ display: 'none' }} disabled={!(password && email && email.includes('@') && email.includes('.') && !(new RegExp("\\\\","").test(email)) && !(new RegExp("\\\\","").test(password)))} type="submit" color="secondary" slot="end">Log on</button>
            
          </IonToolbar>
          <IonToolbar mode="md">
            <IonItem>
              <IonRouterLink onClick={() => history.push("/recover_password")} class="spacing">Forgot your password?</IonRouterLink>
            </IonItem>
          </IonToolbar>
        </form>

        
      </Fragment>
  );
};

export default connect(null, { login })(withRouter(PasswordField));
