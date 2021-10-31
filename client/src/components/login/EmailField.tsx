
import { present } from '@ionic/core/dist/types/utils/overlays';
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonCard, IonItem, IonButton, IonInput, IonList, IonLabel, IonListHeader, IonCardHeader, IonCardContent, IonCardTitle, IonRouterLink, IonCheckbox, useIonAlert } from '@ionic/react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { preLogin } from '../../store/actions/auth';


const EmailField: React.FC<RouteComponentProps | any> = ({ formData, setFormData, history, step, setStep, preLogin }) => {

    
    const { email, password } = formData;

    
    const [present] = useIonAlert();

    const handleChange = (e: any) => {
        
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const checkEmail = async (e: any) => {
      
      try {

        e.preventDefault();

        await preLogin(formData, present, setStep)


      } catch (err: any) {
        console.log(err.message)
      }

    }
    
  return (
      <Fragment>
            
        <form onSubmit={(e: any) => checkEmail(e)}>
          <IonToolbar>
            <IonItem>
              <IonLabel>E-mail</IonLabel>
              <IonInput value={email || ''} max="50" name="email" onIonChange={ (e: any) => handleChange(e)}></IonInput>
            
            </IonItem>
          </IonToolbar>

            <IonItem>

              <IonLabel>Remember my E-mail</IonLabel>

              <IonCheckbox color="primary" slot="start"></IonCheckbox>
              
            </IonItem>
          <IonToolbar>
            <IonButton disabled={!(email && email.includes('@') && email.includes('.') && !(new RegExp("\\\\","").test(email)))} type="submit" size="small" color="secondary" slot="end">Continue {">"}</IonButton>
          </IonToolbar>
          <IonToolbar>
            <IonItem>
              <IonRouterLink onClick={() => history.push("/recover_email")} class="spacing">Forgot your E-mail?</IonRouterLink>
            </IonItem>
          </IonToolbar>
        </form>
        
      </Fragment>
  );
};

export default connect(null, { preLogin })(withRouter(EmailField));
