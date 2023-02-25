import { IonContent, IonPage, IonTitle, IonHeader, IonToolbar, IonLabel, IonInput, IonItemDivider, IonButton, IonCard, IonCardContent, IonCardHeader, IonList, IonItem, IonListHeader, IonCheckbox, IonNav, IonIcon, IonRouterLink, IonText, IonCardTitle, IonCardSubtitle, IonAvatar } from '@ionic/react';
import { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { add, home, receiptOutline } from 'ionicons/icons';

import PageHeader from '../../../components/PageHeader';
import PageSubTitle from '../../../components/PageSubTitle';
import TermsAndConditions from '../../../components/register/TermsAndConditions';
import CreateAccount from '../../../components/register/CreateAccount';
import Confirmation from '../../../components/register/Confirmation';
import AccountSelection from '../../../components/register/AccountSelection';
import Alert from '../../../components/Alert';

const GSA: React.FC <RouteComponentProps> = () => {

    const [formData, setFormData] = useState({
        termsAndConditions: false,
        email: '',
        password: '',
        passwordConfirmation: '',
        twoFactor: false
    });
    const [step, setStep] = useState(1)

    const { termsAndConditions, email, password, passwordConfirmation, twoFactor} = formData;

    const isCurrentPage = (s: number) => {
      return s === step ? true : false;
    }

    
  const subTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }, 
    {
      text: "Register", path: '/register', icon: add, 
    
    }, 
    {
      text: "General Services Administration", path: '/register/gsa', icon: receiptOutline, 
    
    }
  ]

  return (
    <IonPage>

      <PageHeader />
      
      <IonContent fullscreen>

      <PageSubTitle subTitles={subTitles} />

      <Alert />

      <IonItem>
      </IonItem>
      <IonList>
        <IonItem style={ isCurrentPage(1) ?{ borderLeft: '5px solid lightblue' } : { }}>
          <IonLabel>
            Account selection {">"}
          </IonLabel>
        </IonItem>
        <IonItem style={ isCurrentPage(2) ?{ borderLeft: '5px solid lightblue' } : { }}>
          <IonLabel>
            Terms {"&"} Conditions {">"}
          </IonLabel>    
        </IonItem>
        <IonItem style={ isCurrentPage(3) ?{ borderLeft: '5px solid lightblue' } : { }}>
          <IonLabel>
            Create account details {">"}
          </IonLabel>
        </IonItem>
        <IonItem style={ isCurrentPage(4) ?{ borderLeft: '5px solid lightblue' } : { }}>
          <IonLabel>
            Confirmation {">"}
          </IonLabel>
        </IonItem>
      </IonList>
      <IonList>

      <IonItem>
      </IonItem>
          
          <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }} color="dark">General Services Administration</IonTitle>
          </IonListHeader>

        {
            !step || step === 1 && <AccountSelection formData={formData} setFormData={setFormData} step={step} setStep={setStep} />
        }
        {
            step === 2 && <TermsAndConditions formData={formData} setFormData={setFormData} step={step} setStep={setStep} />
        }
        {
            step === 3 && <CreateAccount formData={formData} setFormData={setFormData} step={step} setStep={setStep} />
        }
        {
            step === 4 && <Confirmation formData={formData} setFormData={setFormData} step={step} setStep={setStep} />
        }
          
                  

      </IonList>
    </IonContent>

  </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
  alert: state.alert,
  auth: state.auth
})

export default connect(mapStateToProps, {  })(withRouter(GSA));
