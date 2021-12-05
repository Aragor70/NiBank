
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonCardSubtitle, IonGrid, IonCol, IonRow } from '@ionic/react';
import { alert, checkmark } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Approval from '../components/Approval';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateInvestment from '../components/form/CreateInvestment';
import CreateProject from '../components/form/CreateProject';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import PlatformOverwiev from '../components/PlatformOverwiev';
import { clearProject, getProject } from '../store/actions/project';

const NewProject: React.FC<any> = ({ auth }) => {
    const [ loadingData, setLoadingData ] = useState(false)


  return (
    <IonPage>

      <PageHeader />

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > New project"} />
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                New project

            </IonTitle>
        </IonListHeader>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Apply for financing, providing details of the property project. We will contact you within 24 hours to confirm whether your application is appropriate to start the fundraising process or not.
            </IonCardTitle>

          </IonCardHeader>

          <IonCardContent>

            {
              auth?.user?.approved ? <CreateProject /> : <Fragment>
                <Approval />
              </Fragment>
            }

          </IonCardContent>
        </IonCard>
        
        
    
      </IonList>
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, { getProject })(withRouter(NewProject));
