
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonCardSubtitle, IonGrid, IonCol, IonRow } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateInvestment from '../components/form/CreateInvestment';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import PlatformOverwiev from '../components/PlatformOverwiev';
import { clearProject, getProject } from '../store/actions/project';

const Project: React.FC<any> = ({ project, match, getProject, location }) => {
    const [ loadingData, setLoadingData ] = useState(false)

    const [ projectData, setProjectData ] = useState(null)
    const getData = async () => {
        if (match.params.project_id) {
            const value = await getProject(match.params.project_id)
            setProjectData(value)
        }
    }
    useEffect(() => {
        
        getData()
        
        /* return () => {
            console.log('clear project')
            clearProject()
        } */
    }, [])
    console.log(projectData)

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

        <IonItem>
            <IonGrid>
                <IonRow>
                    <IonCol style={{ textAlign: 'center' }}>
                        Overview

                    </IonCol>
                    <IonCol style={{ textAlign: 'center' }}>
                        Investments

                    </IonCol>
                    <IonCol style={{ textAlign: 'center' }}>
                        Comments

                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonItem>
        {
            project?.loading || loadingData ? <Fragment>
                loading...
            </Fragment> : projectData ? <Fragment>
                
                {
                    project.project.status === "UNDER_CONSIDERATION" ? <Fragment>
                        Under consideration
                    </Fragment> : <Fragment>

                        <CreateInvestment prevTsx={projectData} />

                    </Fragment>
                }
                

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
