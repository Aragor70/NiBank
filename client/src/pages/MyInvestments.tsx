
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonBadge, IonAccordionGroup, IonAccordion } from '@ionic/react';
import { business, checkmark, home, informationCircleOutline } from 'ionicons/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateTransfer from '../components/form/CreateTransfer';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import { Fragment, useEffect, useState } from 'react';
import { clearProjects, getProjects } from '../store/actions/project';
import GlobalProjectListElement from '../components/project/GlobalProjectListElement';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';

const Projects: React.FC<any> = ({ project, getProjects, location, auth, account }) => {

    useEffect(() => {
        getProjects(auth.user)

        /* return () => {
            console.log('clearr projects')
            clearProjects()
        } */
    }, [location.pathname, auth.user])

    const [ step, setStep ] = useState<any>(0);

    const [ showMore, setShowMore ] = useState({
        underConsideration: true,
        open: true,
        closed: true
    })


    const subTitles: any[] = [
        {
          text: "Home", path: '/', icon: home
        }, 
        {
          text: "My investments", path: '/my_investments', icon: business, 
        
          action: () => setStep(0)
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

                <IonListHeader>
                    <IonTitle style={{ textAlign: 'center' }}>
                        My investments

                    </IonTitle>
                </IonListHeader>

                <IonCard>
                    <IonCardContent>
                        <IonList>
                        
                            
                            {
                                account.loading ? <Loader /> : account?.investments?.length === 0 ? <NotFound message="No available investments." /> :

                                    <IonList>
                                        
                                    <IonAccordionGroup>
                                        <IonList>
                                            <IonCard>
                                                <IonCardContent>
                                                    {
                                                        project.underConsiderationProjects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]).length > 0 && <Fragment>
                                                            
                                                            <IonAccordion>
                                                                <IonItem slot="header">
                                                                    <IonLabel>
                                                                        Under consideration ({project.underConsiderationProjects.length} {project.underConsiderationProjects.length === 1 ? "project" : "projects"})
                                                                    </IonLabel>
                                                                </IonItem>
                                                                <IonList slot="content">

                                                                {
                                                                    project.underConsiderationProjects.length > 0 ? project.underConsiderationProjects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]).map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />) : 
                                                                    <NotFound message="No available projects." />
                                                                }

                                                                </IonList>
                                                            </IonAccordion>
                                                        </Fragment>
                                                    }
                                                    {
                                                        project.openProjects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]).length > 0 && <Fragment>
                                                            <IonAccordion>
                                                                <IonItem slot="header">
                                                                    <IonLabel>
                                                                        Open to invest ({project.openProjects.length} {project.openProjects.length === 1 ? "project" : "projects"})
                                                                    </IonLabel>
                                                                </IonItem>
                                                                <IonList slot="content">

                                                                {
                                                                    project.openProjects.length > 0 ? project.openProjects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]).map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />) : 
                                                                    <NotFound message="No available projects." />
                                                                }

                                                                </IonList>
                                                            </IonAccordion>
                                                        </Fragment>
                                                    }
                                                    {
                                                        project.closedProjects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]).length > 0 && <Fragment>
                                                            
                                                            <IonAccordion>
                                                                <IonItem slot="header">
                                                                    <IonLabel>
                                                                        Closed ({project.closedProjects.length} {project.closedProjects.length === 1 ? "project" : "projects"})
                                                                    </IonLabel>
                                                                </IonItem>
                                                                <IonList slot="content">

                                                                {
                                                                    project.closedProjects.length > 0 ? project.closedProjects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]).map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />) : 
                                                                    <NotFound message="No available projects." />
                                                                }

                                                                </IonList>
                                                            </IonAccordion>
                                                        </Fragment>
                                                    }
                                                </IonCardContent>
                                            </IonCard>

                                        </IonList>
                                    </IonAccordionGroup>
                                </IonList>

                            }


                        </IonList>
                    </IonCardContent>
                </IonCard>
            </IonList>
                    
            </Fragment>
        }
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
    project: state.project,
    auth: state.auth,
    account: state.account
})
export default connect(mapStateToProps, { getProjects })(withRouter(Projects));
