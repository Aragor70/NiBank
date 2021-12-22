import { IonHeader, IonToolbar, IonTitle, IonIcon, IonCard, IonItem, IonButton, IonInput, IonList, IonLabel, IonListHeader, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonCheckbox } from '@ionic/react';
import { Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';





const AccountSelection: React.FC<RouteComponentProps | any> = ({ formData, setFormData, history, step, setStep }) => {

    const { termsAndConditions, email, password, passwordConfirmation, twoFactor, accountType } = formData;


    return (
        <Fragment>
            
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle className="ion-items-center" mode="md">
                        Account selection

                    </IonCardTitle>
                    <IonCardSubtitle className="ion-items-center" mode={"md"}>
                        Select the type of account

                    </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonItem>
                        <IonLabel>
                            Account for free
                        </IonLabel>

                        <IonCheckbox onClick={ () => setFormData({ ...formData, accountType: accountType ? "" : "Account for free" }) } slot="start"></IonCheckbox>

                    </IonItem>
                    <IonItem>
                        <div className="ion-items-center">
                        <IonButton disabled={!accountType} onClick={() => setStep(2)} type="button" size="default" color="primary">
                            Continue
                        </IonButton>
                        </div>
                    </IonItem>
                </IonCardContent>
            </IonCard>
        </Fragment>
    )
}
export default withRouter(AccountSelection);