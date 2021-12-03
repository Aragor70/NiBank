
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonCardSubtitle, IonGrid, IonCol, IonRow, IonBadge, IonProgressBar } from '@ionic/react';
import { cardOutline, checkmark, informationCircleOutline, lockClosedOutline, stopwatchOutline } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Flag from 'react-world-flags';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateInvestment from '../components/form/CreateInvestment';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import { clearProject, getProject } from '../store/actions/project';
import { ISO_COUNTRY_CODES } from '../utils/constants';

const Project: React.FC<any> = ({ project, match, getProject, auth }) => {
    const [ loadingData, setLoadingData ] = useState(false)

    const [ projectData, setProjectData ] = useState<any>(null)
    
    const [ isOpen, setIsOpen ] = useState(false)

    const getData = async () => {
        if (match?.params?.project_id) {
            const value = await getProject(match?.params?.project_id)
            setProjectData(value)
        }
    }
    useEffect(() => {
        
        getData()
        
        /* return () => {
            console.log('clear project')
            clearProject()
        } */
    }, [match?.params?.project_id, projectData?.project_id])
    console.log(projectData)

    const [selectView, setSelectView] = useState<any>({
        overview: true,
        investments: false
    })

      
  const getCountryCode = (str: string) => {

    return Object.keys(ISO_COUNTRY_CODES).filter(function(key) {return ISO_COUNTRY_CODES[key]?.toLowerCase() === str?.toLowerCase()})[0];
    
  }

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
                    <IonCol style={ selectView?.overview ? { textAlign: 'center', fontWeight: 'bold' } : { textAlign: 'center' }} onClick={() => setSelectView({ overview: true })}>
                        Overview

                    </IonCol>
                    <IonCol color="gray" style={ selectView?.investments ? { textAlign: 'center', fontWeight: 'bold' } : { textAlign: 'center' }} onClick={() => setSelectView({ investments: true })}>
                        Investments

                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonItem>
        {
            project?.loading ? <Loader /> : projectData ? <Fragment>
                
                {
                    selectView?.overview && <Fragment>

                        <IonCard style={{ position: 'relative' }}>
                                
                                <IonBadge color="light" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                                <Flag code={getCountryCode(projectData.country) || ""} height="30" />
                                </IonBadge>

                            <IonCardHeader>
                                
                                <IonItem>
                                <IonAvatar slot="start">
                                    {/* <IonIcon size="large" color="secondary" icon={project.status === "OPEN" ? lockOpen : lockClosed}></IonIcon> */}
                                    {
                                    projectData.status === "UNDER_CONSIDERATION" ? 
                                    <IonIcon size="large" color="secondary" icon={stopwatchOutline}></IonIcon>
                                    : projectData.status !== "OPEN" ? <IonIcon size="large" color="secondary" icon={lockClosedOutline}></IonIcon>
                                    : <IonIcon size="large" color="secondary" icon={cardOutline}></IonIcon>
                                    
                                    }
                                </IonAvatar>
                                <IonTitle>
                                    {projectData.projectname}
                                </IonTitle>
                                </IonItem>
                                <IonItem>
                                <IonText style={{ padding: '7.5px 0' }}>
                                    {projectData.description}
                                </IonText>
                                </IonItem>
                                <IonItem>
                                <IonText>
                                    Volume total
                                </IonText>
                                <IonText slot="end">
                                    {projectData.volumetotal} {projectData.currency}
                                </IonText>
                                    
                                </IonItem>

                                <IonItem>
                                <IonText>
                                    YieldPA
                                </IonText>
                                <IonText slot="end">
                                    {projectData.yieldpa}
                                </IonText>
                                    
                                </IonItem>
                                <IonItem>
                                <IonText>
                                    Term
                                </IonText>
                                <IonText slot="end">
                                    {
                                    projectData.term ? <Fragment>{projectData.term} days</Fragment> : 'N/A'
                                    }
                                    
                                </IonText>
                                    
                                </IonItem>
                                <IonItem>
                                <IonText>
                                    Type of property
                                </IonText>
                                <IonText slot="end">
                                    {
                                    projectData.typeofproperty
                                    }
                                    
                                </IonText>
                                    
                                </IonItem>
                                <IonItem>
                                <IonText>
                                    Type of investment
                                </IonText>
                                <IonText slot="end">
                                    {
                                    projectData.typeofinvestment
                                    }
                                    
                                </IonText>
                                    
                                </IonItem>
                                <IonItem>
                                <IonText>
                                    Minimum investment
                                </IonText>
                                <IonText slot="end">
                                    {projectData.minimuminvestment} {projectData.currency}
                                </IonText>
                                    
                                </IonItem>
                                
                                {
                                projectData.status !== "UNDER_CONSIDERATION" && <Fragment>
                                    <IonItem style={{ position: 'relative'}}>
                                        <IonBadge style={{ position: 'absolute', top: '10px', left: 0, padding: 0, fontSize: '16px', fontWeight: 'normal', opacity: '1', backgroundColor: '#fff' }} color="light">Invested: {projectData.volumeinvested} {projectData.currency} ({ (projectData.volumeinvested / projectData.volumetotal).toFixed(3)} %)</IonBadge>
                                        <IonProgressBar style={{ position: 'absolute', bottom: '12px', left: 0, padding: 0 }} value={projectData.volumeinvested / projectData.volumetotal}></IonProgressBar>
                                        
                                    </IonItem>
                                </Fragment>
                                }
                                
                                
                            </IonCardHeader>
                            <IonCardContent>


                            {
                                projectData.images && <img src={projectData.images[0] } />
                            }

                            </IonCardContent>

                            </IonCard>
                    </Fragment>
                }
                
                {
                    auth?.user?.approved ? <Fragment>
                        <IonItem onClick={() => setIsOpen(!isOpen)}>
                        <IonIcon slot="start" icon={cardOutline}></IonIcon>
                        <IonRouterLink>
                            Invest now
                        </IonRouterLink>
                        </IonItem>
                    </Fragment> : false
                }

                {
                    (isOpen && auth?.user?.approved) ? project?.project?.status === "OPEN" ? <Fragment>
                        
                        <CreateInvestment prevTsx={projectData} />
                        
                    </Fragment> : false : false
                }
                

            </Fragment> : <Fragment>
                <NotFound message="Project not found." />
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
    project: state.project,
    auth: state.auth
})
export default connect(mapStateToProps, { getProject })(withRouter(Project));
