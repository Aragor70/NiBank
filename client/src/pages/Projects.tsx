
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider } from '@ionic/react';
import { checkmark, informationCircleOutline } from 'ionicons/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateTransfer from '../components/form/CreateTransfer';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import MyTsxListElement from '../components/tsx/MyTsxListElement';
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

  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

    {
        step === 0 && <Fragment>

      
            <PageSubTitle subTitle={"Home > All project"} />
        
            <IonList>
                <IonListHeader>
                <IonTitle style={{ textAlign: 'center' }} onClick={() => setShowMore({ ...showMore, underConsideration: !showMore.underConsideration })}>
                    Under consideration - {project.underConsiderationProjects.length} {project.underConsiderationProjects.length === 1 ? "project" : "projects"}

                </IonTitle>
                </IonListHeader>
                {
                    showMore.underConsideration ? <IonCard>
                        <IonCardContent>
                            {
                                project.underConsiderationProjects.length > 0 ? project.underConsiderationProjects.map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />) : 
                                <NotFound message="No available projects." />
                            }
                        </IonCardContent>
                    </IonCard> : false
                }
                        
                </IonList>

                <IonList>
                    <IonListHeader>
                    <IonTitle style={{ textAlign: 'center' }} onClick={() => setShowMore({ ...showMore, open: !showMore.open })}>
                        Open - {project.openProjects.length} {project.openProjects.length === 1 ? "project" : "projects"}

                    </IonTitle>
                    </IonListHeader>
                    {
                        showMore.open ? <IonCard>
                            <IonCardContent>

                                {
                                    project.openProjects.length > 0 ? project.openProjects.map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />) : 
                                    <NotFound message="No available projects." />
                                }

                            </IonCardContent>
                        </IonCard> : false
                    }
                            
                </IonList>

                <IonList>
                    <IonListHeader>
                    <IonTitle style={{ textAlign: 'center' }} onClick={() => setShowMore({ ...showMore, closed: !showMore.closed })}>
                        Closed - {project.closedProjects.length} {project.closedProjects.length === 1 ? "project" : "projects"}

                    </IonTitle>
                    </IonListHeader>
                    {
                        showMore.closed ? 
                        
                        <IonCard>
                            <IonCardContent>
                                {
                                    project.closedProjects.length > 0 ? project.closedProjects.map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />) : 
                                    <NotFound message="No available projects." />
                                }
                            </IonCardContent>
                        </IonCard> : false
                    }
                </IonList>
                {/* {
                    auth?.user?.approved && <Fragment>

                        <IonItem>
                            <div className="ion-items-center">
                                <IonButton onClick={() => setStep(1)}>New project</IonButton>
                            </div>
                        </IonItem>

                    </Fragment>
                } */}
                
            </Fragment>
        }
        {
            step === 1 ? auth?.user?.approved ? <Fragment>
            <PageSubTitle subTitle={"Home > All project > New project"} />
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

      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
    project: state.project,
    auth: state.auth
})
export default connect(mapStateToProps, { getProjects })(withRouter(Projects));
