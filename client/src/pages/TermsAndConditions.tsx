
import { IonHeader, IonToolbar, IonLabel, IonInput, IonItemDivider, IonButton, IonCard, IonCardContent, IonCardHeader, IonList, IonItem, IonListHeader, IonCheckbox, IonNav, IonIcon, IonRouterLink, IonText, IonCardTitle, IonCardSubtitle, IonAvatar, IonPage, IonContent, IonTitle } from '@ionic/react';
import { Fragment } from 'react';
import { checkmark, home } from 'ionicons/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import TermsContent from '../components/TermsContent';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import { connect } from 'react-redux';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';


const TermsAndConditions: React.FC<any> = ({ auth }) => {


      
    const subTitles: any[] = [
        {
            text: "Home", path: '/', icon: home
        }, 
        {
            text: `Terms ${"&"} Conditions`, path: '/terms_and_conditions', icon: '', 
        
        }
    ]


  return (
      <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitles={subTitles} />
        
      <IonList>

        
        <TermsContent />
        
        
      </IonList>
        
        
      </IonContent>

      {
          auth?.isAuthenticated && <FooterLoggedIn />
      }
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
    auth: state.auth
})
export default connect(mapStateToProps, {})(withRouter(TermsAndConditions));
