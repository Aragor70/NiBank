
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonBadge } from '@ionic/react';
import { checkmark, home, informationCircleOutline } from 'ionicons/icons';
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
          text: "My investments", path: '/my_investments', icon: '', 
        
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
                            account.loading ? <Loader /> : account?.investments?.length === 0 && <NotFound message="No available investments." />
                        }


                        {
                            project.underConsiderationProjects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]).length > 0 && <Fragment>
                                <IonList>

                                <IonListHeader>
                                    <IonTitle style={{ textAlign: 'center', position: 'relative' }} onClick={() => setShowMore({...showMore, underConsideration: !showMore.underConsideration})}>
                                        Under consideration - {project.underConsiderationProjects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]).length} projects
                                        
                                    </IonTitle>
                                    
                                </IonListHeader>

                                {
                                    showMore.underConsideration && project.underConsiderationProjects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]).map((element: any, index: any) => <GlobalProjectListElement key={element.project_id} project={element} index={index} />)
                                }
                                

                                </IonList>
                            </Fragment>
                        }
                        
                        {
                            project.openProjects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]).length > 0 && <Fragment>

                            <IonList>
                                <IonListHeader>
                                <IonTitle style={{ textAlign: 'center' }} onClick={() => setShowMore({...showMore, open: !showMore.open})}>
                                    Open - {project.openProjects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]).length} projects

                                </IonTitle>
                                </IonListHeader>
                                {
                                    showMore.open && project.openProjects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]).map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />)
                                }
                            </IonList>

                            </Fragment>
                        }
                        
                        {

                            project.closedProjects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]).length > 0 && <Fragment>
                                
                            <IonList>
                                <IonListHeader>
                                <IonTitle style={{ textAlign: 'center' }} onClick={() => setShowMore({...showMore, closed: !showMore.closed})}>
                                    Closed - {project.closedProjects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]).length} projects

                                </IonTitle>
                                </IonListHeader>
                                {
                                    showMore.closed && project.closedProjects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]).map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />)
                                }
                                
                            </IonList>
                            </Fragment>
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
