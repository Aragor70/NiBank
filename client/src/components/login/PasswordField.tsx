
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonCard, IonItem, IonButton, IonInput, IonList, IonLabel, IonListHeader, IonCardHeader, IonCardContent, IonCardTitle, IonRouterLink, IonCheckbox } from '@ionic/react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { login } from '../../store/actions/auth';


const PasswordField: React.FC<RouteComponentProps | any> = ({ formData, setFormData, history, step, setStep, login }) => {

    
    const { email, password } = formData;

    const handleChange = (e: any) => {
        
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const loginHandler = async (data: any) => {
      try {
        console.log(data)
        await login(data, history);

      } catch (err: any) {
        console.log(err.message)
      }
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
            <IonButton disabled={!(password && !(new RegExp("\\\\","").test(password)))} onClick={() => loginHandler(formData)} type="button" size="small" color="secondary" slot="end">Log on</IonButton>
          </IonToolbar>
          <IonToolbar>
            <IonItem>
              <IonRouterLink onClick={() => history.push("/recover_password")} class="spacing">Forgot your password?</IonRouterLink>
            </IonItem>
          </IonToolbar>

        
      </Fragment>
  );
};

export default connect(null, { login })(withRouter(PasswordField));
