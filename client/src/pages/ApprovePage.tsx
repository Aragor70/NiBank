
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonInput, IonCardSubtitle } from '@ionic/react';
import { checkmark, home, informationCircleOutline, star } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import { codeUpdate, confirm } from '../store/actions/auth';

const ApprovePage: React.FC<any> = ({ auth, confirm, history, codeUpdate }) => {
    const [ loadingData, setLoadingData ] = useState(false)


    const [ formData, setFormData ] = useState<any>({
      code: ''
    })

    const handleSubmit = async (e: any) => {
      try {

        e.preventDefault();

        await confirm(formData, history)

        
      } catch (err: any) {
        console.log(err.message)
      }
        
    }
    const handleRequest = async (e: any) => {
      try {

        e.preventDefault();

        await codeUpdate()

        
      } catch (err: any) {
        console.log(err.message)
      }
        
    }

    const subTitles: any[] = [
        {text: "Home", path: '/', icon: home}, 
        {text: "Approvement page", path: '/account_approvement', icon: ''}
    ]

  return (
    <IonPage>

      <PageHeader />

      <IonContent fullscreen>

      
      <PageSubTitle subTitles={subTitles} />
        
        <IonCard>
        <IonCardHeader>
          <IonLabel className="ion-items-center">
            
            <IonIcon icon={star} color="primary" size="large"></IonIcon>
          </IonLabel>
          <IonCardTitle className="ion-items-center" color="primary">
            Approve your account
          </IonCardTitle>
          <IonCardSubtitle className="ion-items-center">
            Enter the 6-digit security key that you received at your e-mail address
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
      <form onSubmit={(e: any) => handleSubmit(e)}>
        <IonItem>
          <IonLabel slot="start">
            Digital Secure Key
          </IonLabel>
        
        <IonInput style={{ letterSpacing: '3px', textAlign: 'center' }} name="code" value={formData.code || ''} maxlength={6} onIonChange={(e: any) => setFormData({ ...formData, code: e.target.value })} placeholder="000000"></IonInput>
        
        </IonItem>
        <IonItem>
        <IonButton slot="end" disabled={!(formData?.code?.length === 6 && !isNaN(formData?.code))} type="submit">Confirm</IonButton>
        </IonItem>
      </form>
          <IonToolbar mode="md">
            <IonItem>
              <IonRouterLink class="spacing" onClick={(e: any) => handleRequest(e)}>Send me the Digital Secure Key again</IonRouterLink>
            </IonItem>
          </IonToolbar>
        </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="ion-items-center" mode="md">
              Don’t receive the verification email?
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonIcon icon={informationCircleOutline} color="secondary" slot="start"></IonIcon>
              <IonText>
                Update your email address again, carefully checking the spelling and any special characters.
              </IonText>

            </IonItem>
            <IonItem>
              <IonIcon icon={informationCircleOutline} color="secondary" slot="start"></IonIcon>
              <IonText>
                Check your spam / junk folder.
              </IonText>
              
            </IonItem>
          </IonCardContent>
        </IonCard>

      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { confirm, codeUpdate })(withRouter(ApprovePage));
