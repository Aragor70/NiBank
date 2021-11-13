
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider } from '@ionic/react';
import { checkmark, informationCircleOutline } from 'ionicons/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateTransfer from '../components/form/CreateTransfer';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import MyTsxListElement from '../components/MyTsxListElement';
import { useEffect } from 'react';
import { getProjects } from '../store/actions/project';
import GlobalProjectListElement from '../components/GlobalProjectListElement';

const Projects: React.FC<any> = ({ project, getProjects }) => {

    useEffect(() => {
        getProjects()
    }, [])

  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > All projects"} />
        
      
      <IonList>
        <IonListHeader>
        <IonTitle style={{ textAlign: 'center' }}>
            Under consideration

        </IonTitle>
        </IonListHeader>
        {
            project.underConsiderationProjects.map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />)
        }
        
        </IonList>

        <IonList>
            <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                Open

            </IonTitle>
            </IonListHeader>
            {
                project.openProjects.map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />)
            }
        </IonList>

        <IonList>
            <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                Closed

            </IonTitle>
            </IonListHeader>
            {
                project.closedProjects.map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />)
            }
            
        </IonList>
            
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
    project: state.project
})
export default connect(mapStateToProps, { getProjects })(withRouter(Projects));
