
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonCard, IonButton, IonItem, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonInput, IonText, IonBadge, IonAvatar, IonAlert, useIonAlert, IonSpinner } from '@ionic/react';
import { checkmark, close } from 'ionicons/icons';
import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { register } from '../../store/actions/auth';
import { setAlert } from '../../store/actions/alert';

const Confirmation: React.FC<RouteComponentProps | any> = ({ formData, setFormData, history, step, setStep, register, setAlert }) => {


    const { termsAndConditions, email, password, passwordConfirmation, twoFactor, accountType} = formData;

    const [loadingData, setLoadingData] = useState(false)

    const [present] = useIonAlert();
    
    const registerHandler = async(data: any) => {
        try {
  
        await setLoadingData(true);

        await register(data, history, present);
  
        setLoadingData(false);

        } catch (err: any) {
            
            console.log(err.message)

        }
    }

  return (
      <Fragment>

        <IonCard>
            <IonCardHeader>
                <IonCardTitle className="ion-items-center" mode="md">
                    Confirm your details
                </IonCardTitle>

            </IonCardHeader>
            <IonCardContent>
                <IonItem>
                    <IonLabel slot="start">
                        E-mail account
                    </IonLabel>
                    <IonText className="ion-items-center">
                        {email || "N/A"}
                    </IonText>
                </IonItem>
                <IonItem>
                    <IonLabel slot="start">
                        Your password
                    </IonLabel>
                    <IonText className="ion-items-center">
                        {password.split('').map(() => 'x') || "N/A"}
                    </IonText>
                </IonItem>
                <IonItem>
                    <IonLabel className="ion-text-wrap">
                        I accept the terms of use of the digital in online and mobile platform
                    </IonLabel>
                    {
                        termsAndConditions ? <Fragment>
                            <IonAvatar slot="start">
                                <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                            </IonAvatar>
                        </Fragment> : <Fragment>
                            <IonAvatar slot="start">
                                <IonIcon size="large" color="danger" icon={close}></IonIcon>
                            </IonAvatar>
                        </Fragment>
                    }
                </IonItem>

                <IonItem>
                    <div className="ion-items-center">
                    <IonButton disabled={!(accountType && termsAndConditions && email && password && passwordConfirmation)} onClick={() => registerHandler(formData)} type="button" size="default" color="primary">
                        {
                            loadingData ? <IonSpinner duration={1500} color="light"></IonSpinner> : "Register"
                        }
                    </IonButton>
                    </div>
                </IonItem>
            
            </IonCardContent>
        </IonCard>
      </Fragment>
  );
};

export default connect(null, { register, setAlert })(withRouter(Confirmation));
