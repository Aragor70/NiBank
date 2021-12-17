
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonCardSubtitle, IonGrid, IonCol, IonRow, IonBadge, IonProgressBar, IonImg, IonInput, IonSelect, IonSelectOption, IonSlides, IonSlide, useIonAlert, IonTextarea } from '@ionic/react';
import { cardOutline, checkmark, informationCircleOutline, lockClosedOutline, stopwatchOutline } from 'ionicons/icons';
import moment from 'moment';
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
import { clearProject, deleteProject, getProject, updateProject } from '../store/actions/project';
import { ISO_COUNTRY_CODES } from '../utils/constants';

const Project: React.FC<any> = ({ project, match, getProject, auth, updateProject, history, deleteProject, tsx }) => {
    
        
    const [formData, setFormData] = useState<any>({
        startdate: '',
        closedate: '',
        projectname: '',
        country: '',
        yieldpa: '',
        volumetotal: '',
        minimuminvestment: '',
        description: '',
        currency: '',
        status: '',
        typeofproperty: '',
        typeofinvestment: '',
        project: '',
        image: '',
        investors: []
    });


        
    const [present] = useIonAlert();

    const handleSubmit = async(e: any) => {
        try {
        e.preventDefault();

        await updateProject(formData, present)
        console.log('update')
        } catch (err: any) {

        console.log(err.message)
        
        }

    }
    const handleChange = (e: any) => {
        if (e.target.name === 'images') {
            return setFormData({...formData, images: [e.target.value]})
        }
        return setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    
    const [ loadingData, setLoadingData ] = useState(false)

    const [ projectData, setProjectData ] = useState<any>({
        startdate: '',
        closedate: '',
        projectname: '',
        country: '',
        yieldpa: '',
        volumetotal: '',
        minimuminvestment: '',
        description: '',
        currency: '',
        status: '',
        typeofproperty: '',
        typeofinvestment: '',
        project: '',
        image: '',
        investors: []
    })
    
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
    }, [match?.params?.project_id, projectData?.project_id, tsx?.tsxs?.length])
    

    const [selectView, setSelectView] = useState<any>({
        overview: true,
        investments: false,
        update: false
    })
    
    const handleDefaultSrc = (e: any) => {
        e.target.src = 'https://www.investopedia.com/thmb/FKP-u7NEKNODSvAkMo-9WUz0E_c=/2121x1193/smart/filters:no_upscale()/GettyImages-1169053915-76068125fc394f9691db9edaf7c76baf.jpg'
    }

      
    const getCountryCode = (str: string) => {

        return Object.keys(ISO_COUNTRY_CODES).filter(function(key) {return ISO_COUNTRY_CODES[key]?.toLowerCase()?.includes(str?.toLowerCase())})[0];
        
    }
    

    
    useEffect(() => {

        if (project?.project) {
    
          console.log(project?.project)
          setFormData({...formData, ...project?.project, startdate: moment().format('YYYY-MM-DD')})
    
        }
    
        return () => {
          console.log('clear project from')
          setFormData({
            project_id: '',
            amount: '',
            accounting_date: moment().format('YYYY-MM-DD'),
            public_key: '',
            description: '',
            currency: '',
            projectname: '',
            investors: []
          })
    
        }
    
      }, [project?.project, project?.loading, formData?.project_id])


      const displayDelete = () => {

        present({
            cssClass: 'error-message',
            header: 'Confirmation',
            message: 'Are you sure to delete this project?',
            buttons: [
              { text: 'Confirm', handler: async() => deleteProject(formData?.project_id, present, history) },
            ],
            onDidDismiss: () => console.log('did dismiss')
        });

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
                    {
                        project?.loading ? false : (auth?.user?.approved && (projectData?.status !== 'UNDER_CONSIDERATION')) ? 
                        <IonCol color="gray" style={ selectView?.investments ? { textAlign: 'center', fontWeight: 'bold' } : { textAlign: 'center' }} onClick={() => setSelectView({ investments: true })}>
                            Investments
    
                        </IonCol> : false
                    }
                    {
                        project?.loading ? false : (auth?.user?.approved && (projectData?.owner_id === auth?.user?.user_id) && (projectData?.status === 'UNDER_CONSIDERATION')) ?
                        <IonCol color="gray" style={ selectView?.update ? { textAlign: 'center', fontWeight: 'bold' } : { textAlign: 'center' }} onClick={() => setSelectView({ update: true })}>
                            Update

                        </IonCol> : false
                    }
                </IonRow>
            </IonGrid>
        </IonItem>
        {
            project?.loading ? <Loader /> : projectData ? <Fragment>
                
                {
                    selectView?.update && <Fragment>
                        
                            <IonCard>
                                <IonCardContent>
                                    
                                    <IonList>
                                        <IonItem>
                                        <IonLabel>Project name</IonLabel>
                                        <IonInput slot="end" autocomplete={"off"} name="projectname" value={formData.projectname || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

                                        </IonItem>
                                        <IonItem>
                                        <IonLabel>Country</IonLabel>
                                        <IonInput slot="end" autocomplete={"off"} name="country" value={formData.country || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

                                        </IonItem>

                                        <IonItem>
                                        <IonLabel>Image</IonLabel>
                                        <IonInput type="text" autocomplete={"off"} slot="end" name="images" value={formData?.images ? formData?.images[0] : ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
                                        
                                        </IonItem>

                                        <IonItem>
                                        <IonLabel>Type of investment</IonLabel>
                                        <IonSelect slot="end" value={formData.typeofinvestment || ''} name="typeofinvestment" onIonChange={(e: any) => handleChange(e)}>
                                            {
                                                ['EQUITY'].map((element: string, index: number) => <IonSelectOption key={index} value={element}>{element}</IonSelectOption>)
                                            }
                                        </IonSelect>
                                        
                                        </IonItem>   
                                        <IonItem>
                                        <IonLabel>Type of property</IonLabel>
                                        <IonSelect slot="end" value={formData.typeofproperty || ''} name="typeofproperty" onIonChange={(e: any) => handleChange(e)}>
                                            {
                                                ['RESIDENTIAL', 'RETAIL', 'OFFICE', 'LAND', 'LOGISTICS', 'INDUSTRIAL'].map((element: string, index: number) => <IonSelectOption key={index} value={element}>{element}</IonSelectOption>)
                                            }
                                            
                                        </IonSelect>
                                    
                                        </IonItem>    
                                        <IonItem>
                                        <IonLabel>Type of project</IonLabel>
                                        <IonSelect slot="end" value={formData.project || ''} name="project" onIonChange={(e: any) => handleChange(e)}>
                                            {
                                                ['EXISTING', 'DEVELOPMENT'].map((element: string, index: number) => <IonSelectOption key={index} value={element}>{element}</IonSelectOption>)
                                            }
                                        </IonSelect>
                                        
                                        </IonItem>
               
                                        <IonItem>
                                            <IonLabel>Yield per month</IonLabel>
                                            <IonInput slot="end" autocomplete={"off"} name="yieldpa" value={formData.yieldpa || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Volume total</IonLabel>
                                            <IonInput slot="end" autocomplete={"off"} name="volumetotal" value={formData.volumetotal || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Minimum investment</IonLabel>
                                            <IonInput slot="end" autocomplete={"off"} name="minimuminvestment" value={formData.minimuminvestment || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

                                        </IonItem>

                                        
                                        <IonItem>
                                            <IonLabel>Currency</IonLabel>
                                            <IonSelect slot="end" value={formData.currency || ''} name="currency" onIonChange={(e: any) => handleChange(e)}>
                                                {
                                                    ['EUR', 'GBP', 'PLN', 'CZK'].map((element: string, index: number) => <IonSelectOption key={index} value={element}>{element}</IonSelectOption>)
                                                }
                                            </IonSelect>
                                        
                                        </IonItem>

                                        
                                        
                                    </IonList>
                                </IonCardContent>

                            </IonCard>

                            <IonCard>

                                <IonCardContent>
                                    <IonList>

                                        
                                        <IonItem>
                                            <IonLabel>Short Description</IonLabel>
                                            
                                        </IonItem>
                                        <IonItem>
                                            <IonTextarea name="description" value={formData.description || ""} onIonChange={(e: any) => handleChange(e)}></IonTextarea>
                                        
                                        </IonItem>

                                        <IonItem>
                                            <IonLabel>Long Description</IonLabel>
                                            
                                        </IonItem>
                                        <IonItem>
                                            <IonTextarea name="long_description" value={formData.long_description || ""} onIonChange={(e: any) => handleChange(e)}></IonTextarea>
                                        
                                        </IonItem>
                                        
                                    </IonList>
                                </IonCardContent>


                            </IonCard>
                            {
                                formData.status !== "UNDER_CONSIDERATION" ?
                                    <IonCard>

                                        <IonCardContent>
                                            <IonList>

                                                            
                                                <IonItem>
                                                    <IonLabel>Start date</IonLabel>
                                                    <IonInput type="date" autocomplete={"off"} slot="end" name="startdate" value={formData.startdate || moment().format('YYYY-MM-DD') || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
                                                
                                                </IonItem>

                                                <IonItem>
                                                    <IonLabel>Close date</IonLabel>
                                                    <IonInput type="date" autocomplete={"off"} slot="end" name="closedate" value={formData.closedate || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
                                                
                                                </IonItem>
                                                
                                            </IonList>
                                        </IonCardContent>


                                    </IonCard> : false
                            }
                            
                            <IonCard>

                                <IonCardContent>
                                    <IonList>

                                                     
                                    <IonItem>
                                        <IonLabel>Status</IonLabel>
                                        <IonSelect slot="end" name="status" value={formData.status || ""} onIonChange={(e: any) => handleChange(e)}>
                                            {
                                                ['UNDER_CONSIDERATION', 'OPEN'].map((element: string, index: number) => <IonSelectOption key={index} value={element}>{element}</IonSelectOption>)
                                            }
                                        </IonSelect>
                                        
                                        </IonItem>
                                        
                                    </IonList>
                                </IonCardContent>


                            </IonCard>
                            <IonCard>
                                <IonCardContent>
                                    <IonList>
                                    
                                        <IonItem>
                                            <form onSubmit={(e: any) => handleSubmit(e)} className="ion-items-center">
                                                <IonButton type='submit' size="default" slot="end" /* onClick={()=> nextSlide()} */>Save changes</IonButton>
                                            </form>
                                        </IonItem>
                                        <IonItem>
                                            <div className="ion-items-center">
                                            <IonButton type='submit' color="danger" size="default" slot="end" onClick={()=> displayDelete()}>DELETE</IonButton>
                                            </div>
                                        </IonItem>
                                    </IonList>
                                </IonCardContent>


                            </IonCard>

                    </Fragment>
                }
                {
                    selectView?.overview && <Fragment>

                        <IonCard style={{ position: 'relative' }}>
                                

                            <IonCardHeader>
                                
                                <IonItem>
                                    
                                <IonBadge className="no-padding" color="light" slot="end" /* style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }} */>
                                    <Flag code={getCountryCode(projectData?.country) || ""} height="30" />
                                </IonBadge>
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
                                    <div className="ion-text-wrap" style={{ textAlign: 'left' }}>
                                        {projectData.projectname}
                                    </div>
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
                                    Yield
                                </IonText>
                                <IonText slot="end">
                                    {projectData.yieldpa}%
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
                                <IonItem>
                                <IonText>
                                    Number of investors
                                </IonText>
                                <IonText slot="end">
                                    {project?.project?.investors?.length || 0}
                                </IonText>
                                    
                                </IonItem>
                                
                                {
                                projectData.status !== "UNDER_CONSIDERATION" && <Fragment>
                                    <IonItem style={{ position: 'relative'}}>
                                        <IonBadge style={{ position: 'absolute', top: '10px', left: 0, padding: 0, fontSize: '16px', fontWeight: 'normal', opacity: '1' }} color="none"><IonText color="dark">Invested: {projectData.volumeinvested} {projectData.currency} ({ (projectData.volumeinvested / projectData.volumetotal * 100).toFixed(3)} %)</IonText></IonBadge>
                                        <IonProgressBar style={{ position: 'absolute', bottom: '12px', left: 0, padding: 0 }} value={projectData.volumeinvested / projectData.volumetotal * 100}></IonProgressBar>
                                        
                                    </IonItem>
                                </Fragment>
                                }
                                
                                
                            </IonCardHeader>
                            <IonCardContent>


                            {
                                projectData.images && <IonImg src={projectData.images ? projectData.images[0] : "" } onIonError={(e) => handleDefaultSrc(e)} alt="property" />
                            }

                            
                            </IonCardContent>

                            </IonCard>

                            {
                                projectData.long_description ? <Fragment>

                                    <IonCard>
                                    <IonCardContent>

                                        <IonItem>
                                            <IonTitle>
                                                <div className="ion-items-center">
                                                    Project summary
                                                </div>
                                            </IonTitle>
                                        </IonItem>
                                        <IonItem>
                                            <IonText style={{ padding: '7.5px 0' }}>
                                                {projectData.long_description}
                                            </IonText>
                                        </IonItem>

                                    </IonCardContent>

                                    </IonCard>

                                </Fragment> : false
                            }


                    </Fragment>
                }
                
                {
                    ((auth?.user?.approved) && (project?.project?.status === "OPEN") && (project?.project?.owner_id?.toString() !== auth?.user?.user_id?.toString())) ? <Fragment>
                        <IonItem onClick={() => setIsOpen(!isOpen)}>
                        <IonIcon slot="start" icon={cardOutline}></IonIcon>
                        <IonRouterLink>
                            Invest now
                        </IonRouterLink>
                        </IonItem>
                    </Fragment> : false
                }

                {
                    (isOpen && auth?.user?.approved) && ((project?.project?.status === "OPEN") && (project?.project?.owner_id !== auth?.user?.user_id)) ? <Fragment>
                        
                        <CreateInvestment prevTsx={projectData} />
                        
                    </Fragment> : false
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
    auth: state.auth,
    tsx: state.tsx
})
export default connect(mapStateToProps, { getProject, updateProject, deleteProject })(withRouter(Project));
