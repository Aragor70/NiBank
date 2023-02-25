
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonAccordionGroup, IonAccordion } from '@ionic/react';
import { business, checkmark, home } from 'ionicons/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import { Fragment, useEffect, useState } from 'react';
import { clearProjects, getProjects } from '../store/actions/project';
import GlobalProjectListElement from '../components/project/GlobalProjectListElement';
import CreateProject from '../components/form/CreateProject';
import NotFound from '../components/NotFound';

const Projects: React.FC<any> = ({ project, getProjects, location, auth }) => {

    useEffect(() => {
        getProjects(auth.user)

        /* return () => {
            
            clearProjects()
        } */
    }, [location.pathname, auth.user])

    const [ step, setStep ] = useState<any>(0);

    const [ showMore, setShowMore ] = useState({
        underConsideration: false,
        open: true,
        closed: false
    })
    useEffect(() => {

        const value = showMore;

        if (!project.underConsiderationProjects.length) {
            value.underConsideration = false
        }
        if (!project.openProjects.length) {
            value.open = false
        }
        if (!project.closedProjects.length) {
            value.closed = false
        }

        setShowMore({ ...showMore, ...value })

        return () => {
            setShowMore({
                underConsideration: false,
                open: true,
                closed: false
            })
        }
    }, [])

    
  const subTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }, 
    {
      text: "All project", path: '/projects', icon: business, 
    
      action: () => setStep(0)
    }
  ]
    
  const newOneTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }, 
    {
      text: "All project", path: '/projects', icon: business, 
    
      action: () => setStep(0)
    }, 
    {
      text: "New project", path: '/projects', icon: business, 
    
      action: () => setStep(1)
    }
  ]

  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

    {
        step === 0 && <Fragment>

      
            <PageSubTitle subTitles={subTitles} />
            
            <IonList>
                
                <IonAccordionGroup>
                    <IonList>
                        <IonCard>
                            <IonCardContent>
                                <IonAccordion>
                                    <IonItem slot="header">
                                        <IonLabel>
                                            Under consideration ({project.underConsiderationProjects.length} {project.underConsiderationProjects.length === 1 ? "project" : "projects"})
                                        </IonLabel>
                                    </IonItem>
                                    <IonList slot="content">

                                    {
                                        project.underConsiderationProjects.length > 0 ? project.underConsiderationProjects.map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />) : 
                                        <NotFound message="No available projects." />
                                    }

                                    </IonList>
                                </IonAccordion>
                                <IonAccordion>
                                    <IonItem slot="header">
                                        <IonLabel>
                                            Open to invest ({project.openProjects.length} {project.openProjects.length === 1 ? "project" : "projects"})
                                        </IonLabel>
                                    </IonItem>
                                    <IonList slot="content">

                                    {
                                        project.openProjects.length > 0 ? project.openProjects.map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />) : 
                                        <NotFound message="No available projects." />
                                    }

                                    </IonList>
                                </IonAccordion>
                                <IonAccordion>
                                    <IonItem slot="header">
                                        <IonLabel>
                                            Closed ({project.closedProjects.length} {project.closedProjects.length === 1 ? "project" : "projects"})
                                        </IonLabel>
                                    </IonItem>
                                    <IonList slot="content">

                                    {
                                        project.closedProjects.length > 0 ? project.closedProjects.map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />) : 
                                        <NotFound message="No available projects." />
                                    }

                                    </IonList>
                                </IonAccordion>
                            </IonCardContent>
                        </IonCard>

                    </IonList>
                </IonAccordionGroup>
            </IonList>

            </Fragment>
        }
        {
            step === 1 ? auth?.user?.approved ? <Fragment>
            <PageSubTitle subTitles={newOneTitles} />
            <IonList>
                <IonListHeader>
                <IonTitle style={{ textAlign: 'center' }}>
                    New investment project
                </IonTitle>
                </IonListHeader>

                <CreateProject />
            </IonList>
            </Fragment> : false : false
        }
      </IonContent>

      {
        auth?.isAuthenticated && <FooterLoggedIn />
      }
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
    project: state.project,
    auth: state.auth
})
export default connect(mapStateToProps, { getProjects })(withRouter(Projects));
