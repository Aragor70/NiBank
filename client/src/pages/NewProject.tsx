
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonCardSubtitle, IonGrid, IonCol, IonRow, IonSlides, IonSlide, IonInput, useIonAlert, IonSelect, IonSelectOption, IonButtons, IonTextarea } from '@ionic/react';
import { alert, checkmark } from 'ionicons/icons';
import moment from 'moment';
import { Fragment, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Approval from '../components/Approval';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateInvestment from '../components/form/CreateInvestment';
import CreateProject from '../components/form/CreateProject';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import PlatformOverwiev from '../components/PlatformOverwiev';
import { clearProject, getProject, newProject } from '../store/actions/project';

const NewProject: React.FC<any> = ({ auth, newProject, history }) => {
    const [ loadingData, setLoadingData ] = useState(false)

    
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
  });


    
  const [present] = useIonAlert();

  const handleSubmit = async(e: any) => {
    try {
      e.preventDefault();

      await newProject(formData, history, present)
      setFormData({})

    } catch (err: any) {

      console.log(err.message)
      
    }

  }
  const handleChange = (e: any) => {
    return setFormData({...formData, [e.target.name]: e.target.value})
  }


  
  const slides: any = useRef(null)
  const prevSlide = async () => {

    if (slides.current) {

      const swiper = await slides.current.getSwiper();
      
      swiper.slidePrev()

    }

  }
  const nextSlide = async () => {

    if (slides.current) {

      const swiper = await slides.current.getSwiper();
      
      swiper.slideNext()

    }

  }


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

        
        <IonSlides ref={slides}>

            <IonSlide>
              <IonList>
                <IonCard>
                    <IonCardHeader>
                      <IonCardTitle className="ion-items-center">
                        Submit your project
                      </IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>

                      
                    <IonItem>
                      <IonText>
                        Provide details of the property project. 
                      </IonText>
                    </IonItem>
                      
                    <IonItem>
                      <IonText>
                        We will confirm your application whether is appropriate to start the fundraising process or not.
                      </IonText>
                    </IonItem>

                    </IonCardContent>
                </IonCard>

                <IonItem>
                  <div className="ion-items-center">
                    <IonButton size="default" slot="end" onClick={()=> nextSlide()}>Let's get started</IonButton>
                  </div>
                </IonItem>
              </IonList>
            </IonSlide>

              {
                auth?.user?.approved ? <Fragment>
                  <IonSlide>
                  <IonList>
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
                          <IonInput type="text" autocomplete={"off"} slot="end" name="image" value={formData.image || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
                        
                        </IonItem>

                        
                        

                        </IonList>

                      </IonCardContent>

                    </IonCard>
                    <IonItem>
                      <IonButtons>
                      <IonButton size="default" slot="start" color="secondary" onClick={()=> prevSlide()}>Cancel</IonButton>
                      <IonButton size="default" slot="end" onClick={()=> nextSlide()}>Continue {'>'}</IonButton>
                      </IonButtons>
                    </IonItem>
                  </IonList>
                  </IonSlide>

                  <IonSlide>
                  <IonList style={{ width: '100%' }}>
                    <IonCard>

                      <IonCardContent>

                        
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

                      </IonCardContent>

                    </IonCard>


                    <IonItem>
                      <IonButtons>
                        <IonButton size="default"  slot="start" color="secondary" onClick={()=> prevSlide()}>Go back</IonButton>
                        <IonButton size="default"  slot="end" onClick={()=> nextSlide()}>Continue {'>'}</IonButton>
                      </IonButtons>
                    </IonItem>

                    </IonList>
                  </IonSlide>
                  <IonSlide>
                  <IonList style={{ width: '100%'}}>
                    <IonCard >

                      <IonCardContent>
                        <IonList>
                        <IonItem>
                          <IonLabel>Status</IonLabel>
                          <IonSelect slot="end" name="status" onIonChange={(e: any) => handleChange(e)}>
                            <IonSelectOption value="UNDER_CONSIDERATION">UNDER CONSIDERATION</IonSelectOption>
                          </IonSelect>
                        
                        </IonItem>

                        <IonItem>
                          <IonLabel>Type of investment</IonLabel>
                          <IonSelect slot="end" name="typeofinvestment" onIonChange={(e: any) => handleChange(e)}>
                            <IonSelectOption value="EQUITY">EQUITY</IonSelectOption>
                          </IonSelect>
                        
                        </IonItem>   
                        <IonItem>
                          <IonLabel>Type of property</IonLabel>
                          <IonSelect slot="end" name="typeofproperty" onIonChange={(e: any) => handleChange(e)}>
                            <IonSelectOption value="RESIDENTIAL">RESIDENTIAL</IonSelectOption>
                            <IonSelectOption value="RETAIL">RETAIL</IonSelectOption>
                            <IonSelectOption value="OFFICE">OFFICE</IonSelectOption>
                            <IonSelectOption value="LAND">LAND</IonSelectOption>
                            <IonSelectOption value="LOGISTICS">LOGISTICS</IonSelectOption>
                            <IonSelectOption value="INDUSTRIAL">INDUSTRIAL</IonSelectOption>
                          </IonSelect>
                    
                        </IonItem>    
                        <IonItem>
                          <IonLabel>Type of project</IonLabel>
                          <IonSelect slot="end" name="project" onIonChange={(e: any) => handleChange(e)}>
                            <IonSelectOption value="EXISTING">EXISTING</IonSelectOption>
                            <IonSelectOption value="DEVELOPMENT">DEVELOPMENT</IonSelectOption>
                          </IonSelect>
                        
                        </IonItem>
                        </IonList>
                      </IonCardContent>

                    </IonCard>

                        
                    <IonItem>
                      <IonButtons>
                        <IonButton size="default"  slot="start" color="secondary" onClick={()=> prevSlide()}>Go back</IonButton>
                        <IonButton size="default"  slot="end" onClick={()=> nextSlide()}>Continue {'>'}</IonButton>
                      </IonButtons>
                    </IonItem>
                  </IonList>
                  </IonSlide>
                  
                  <IonSlide>
                  <IonList>
                    <IonCard>

                      <IonCardContent>

                      <IonItem>
                        <IonLabel>Yield</IonLabel>
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
                        <IonSelect slot="end" name="currency" onIonChange={(e: any) => handleChange(e)}>
                          <IonSelectOption value="EUR">EUR</IonSelectOption>
                          <IonSelectOption value="GBP">GBP</IonSelectOption>
                          <IonSelectOption value="PLN">PLN</IonSelectOption>
                          <IonSelectOption value="CZK">CZK</IonSelectOption>
                        </IonSelect>
                      
                      </IonItem>

                      </IonCardContent>

                    </IonCard>
                    
                    
                      <IonItem>
                        <IonButtons>
                          <IonButton size="default"  slot="start" color="secondary" onClick={()=> prevSlide()}>Go back</IonButton>
                          <IonButton size="default"  slot="end" onClick={()=> nextSlide()}>Continue {'>'}</IonButton>
                        </IonButtons>
                      </IonItem>
                  </IonList>
                  </IonSlide>
                  
                  {
                    (formData?.status && formData?.status !== 'UNDER_CONSIDERATION') ? <Fragment>
                        <IonSlide>
                          <IonList>
                            <IonCard>

                              <IonCardContent>

                                              
                                <IonItem>
                                  <IonLabel>Start date</IonLabel>
                                  <IonInput type="date" autocomplete={"off"} slot="end" name="startdate" value={formData.startdate || moment().format('YYYY-MM-DD') || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
                                
                                </IonItem>            
                                <IonItem>
                                  <IonLabel>Close date</IonLabel>
                                  <IonInput type="date" autocomplete={"off"} slot="end" name="closedate" value={formData.closedate || moment().format('YYYY-MM-DD') || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
                                
                                </IonItem>

                              </IonCardContent>

                            </IonCard>
                              
                            <IonItem>
                              <IonButtons>
                                <IonButton size="default"  slot="start" color="secondary" onClick={()=> prevSlide()}>Go back</IonButton>
                                <IonButton size="default"  slot="end" onClick={()=> nextSlide()}>Continue {'>'}</IonButton>
                              </IonButtons>
                            </IonItem>
                          </IonList>
                        </IonSlide>
                    </Fragment> : false
                  }
                                    
                  <IonSlide>
                  <IonList style={{ width: '100%'}}>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardTitle className="ion-items-center">
                          Confirm
                        </IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>

                      <IonItem>
                        
                      </IonItem>

                      </IonCardContent>

                    </IonCard>

                    
                      <IonItem>
                        <form onSubmit={(e: any) => handleSubmit(e)}>
                        <IonButtons>
                          <IonButton size="default" type="button" slot="start" color="secondary" onClick={()=> prevSlide()}>Go back</IonButton>
                          <IonButton size="default" type="submit" slot="end" onClick={(e: any)=> handleSubmit(e)}>SUBMIT</IonButton>
                        </IonButtons>
                        </form>
                      </IonItem>
                  </IonList>
                  </IonSlide>

                </Fragment> : <Approval />
              }

              

        </IonSlides>
        
        
        
    
      </IonList>
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, { getProject, newProject })(withRouter(NewProject));
