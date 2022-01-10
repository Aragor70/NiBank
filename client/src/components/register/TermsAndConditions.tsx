
import { IonHeader, IonToolbar, IonLabel, IonInput, IonItemDivider, IonButton, IonCard, IonCardContent, IonCardHeader, IonList, IonItem, IonListHeader, IonCheckbox, IonNav, IonIcon, IonRouterLink, IonText, IonCardTitle, IonCardSubtitle, IonAvatar } from '@ionic/react';
import { Fragment } from 'react';
import { checkmark } from 'ionicons/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import TermsContent from '../TermsContent';

interface TermsAndConditionsUI {
    formData: any,
    setFormData: any,
    history: any
}

const TermsAndConditions: React.FC<TermsAndConditionsUI | any> = ({ formData, setFormData, history, step, setStep }) => {

    const { termsAndConditions, accountType } = formData;



  return (
      <Fragment>
        
        <TermsContent />

        <IonCard>
        <IonItem>
        <IonCheckbox onClick={ () => setFormData({ ...formData, termsAndConditions: !termsAndConditions }) } slot="start"></IonCheckbox>
        <IonLabel className="ion-text-wrap">
            I accept the terms of use of the digital in online and mobile platform
        </IonLabel>
        </IonItem>
        <IonItem>
            <div className="ion-items-center">
            <IonButton disabled={!(accountType && termsAndConditions)} onClick={() => setStep(3)} type="button" size="default" color="primary">
                Continue
            </IonButton>
            </div>
        </IonItem>
        </IonCard>


      </Fragment>
  );
};

export default withRouter(TermsAndConditions);
