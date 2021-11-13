
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import PlatformOverwiev from '../components/PlatformOverwiev';
import { getProject } from '../store/actions/project';

const Project: React.FC<any> = ({ project, match, getProject }) => {

    useEffect(() => {

        getProject(match.params.project_id)

    }, [match.params.project_id])


  return (
    <IonPage>

      <PageHeader />

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > Project page"} />
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                Project

            </IonTitle>
        </IonListHeader>
        {
            project.loading ? <Fragment>
                loading...
            </Fragment> : project.project ? <Fragment>
                {project.project.projectname}
            </Fragment> : <Fragment>
                Project not found.
            </Fragment>
        }
        <IonItem>

            
            
        </IonItem>        
        
      </IonList>
        
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
    project: state.project
})
export default connect(mapStateToProps, { getProject })(withRouter(Project));
