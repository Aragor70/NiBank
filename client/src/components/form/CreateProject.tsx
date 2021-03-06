
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonSearchbar, IonText, useIonAlert, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonAlert, IonVirtualScroll, IonRouterLink, IonSelect, IonSelectOption } from '@ionic/react';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadUsers } from '../../store/actions/auth';
import { newProject } from '../../store/actions/project';
import { newTsx } from '../../store/actions/tsx';


const CreateProject: React.FC<any> = ({ newProject, history, user }) => {


  const [formData, setFormData] = useState({
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
  })
  
  const [present] = useIonAlert();

  const handleSubmit = async(e: any) => {
    try {
      e.preventDefault();

      await newProject(formData, history, present)
      

    } catch (err: any) {

      console.log(err.message)
      
    }

  }
  const handleChange = (e: any) => {
    return setFormData({...formData, [e.target.name]: e.target.value})
  }


  return (
    <IonItem>    
        <form onSubmit={(e: any) => handleSubmit(e)}>
            
            <IonItem>
              <IonLabel>Host</IonLabel>
              <IonText slot="end">{user.accountType || "You"}</IonText>
            
            </IonItem>
            <IonItem>
              <IonLabel>Project name</IonLabel>
              <IonInput slot="end" autocomplete={"off"} name="projectname" value={formData.projectname || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

            </IonItem>
            <IonItem>
              <IonLabel>Country</IonLabel>
              <IonInput slot="end" autocomplete={"off"} name="country" value={formData.country || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

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
              <IonLabel>Description</IonLabel>
              <IonInput slot="end" autocomplete={"off"} name="description" value={formData.description || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>            
            <IonItem>
              <IonLabel>Image</IonLabel>
              <IonInput type="text" autocomplete={"off"} slot="end" name="image" value={formData.image || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>
            <IonItem>
              <IonLabel>Status</IonLabel>
              <IonSelect slot="end" name="status" onIonChange={(e: any) => handleChange(e)}>
                {
                  ['UNDER_CONSIDERATION', 'OPEN'].map((element: string, index: number) => <IonSelectOption key={index} value={element}>{element}</IonSelectOption>)
                }
              </IonSelect>
            
            </IonItem>
            <IonItem>
              <IonLabel>Type of investment</IonLabel>
              <IonSelect slot="end" name="typeofinvestment" onIonChange={(e: any) => handleChange(e)}>
                {
                  ['DEBT', 'EQUITY'].map((element: string, index: number) => <IonSelectOption key={index} value={element}>{element}</IonSelectOption>)
                }
              </IonSelect>
            
            </IonItem>   
            <IonItem>
              <IonLabel>Type of property</IonLabel>
              <IonSelect slot="end" name="typeofproperty" onIonChange={(e: any) => handleChange(e)}>
                {
                  ['RESIDENTIAL', 'RETAIL', 'OFFICE', 'LAND', 'LOGISTICS', 'INDUSTRIAL'].map((element: string, index: number) => <IonSelectOption key={index} value={element}>{element}</IonSelectOption>)
                }
              </IonSelect>
         
            </IonItem>    
            <IonItem>
              <IonLabel>Type of project</IonLabel>
              <IonSelect slot="end" name="project" onIonChange={(e: any) => handleChange(e)}>
                {
                  ['EXISTING', 'DEVELOPMENT'].map((element: string, index: number) => <IonSelectOption key={index} value={element}>{element}</IonSelectOption>)
                }
              </IonSelect>
            
            </IonItem>   
            <IonItem>
              <IonLabel>Currency</IonLabel>
              <IonSelect slot="end" name="currency" onIonChange={(e: any) => handleChange(e)}>
                {
                  ['EUR', 'GBP', 'PLN', 'CZK'].map((element: string, index: number) => <IonSelectOption key={index} value={element}>{element}</IonSelectOption>)
                }
              </IonSelect>
            
            </IonItem>            
            <IonItem>
              <IonLabel>Start date</IonLabel>
              <IonInput type="date" autocomplete={"off"} slot="end" name="startdate" value={formData.startdate || moment().format('YYYY-MM-DD') || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>            
            <IonItem>
              <IonLabel>Close date</IonLabel>
              <IonInput type="date" autocomplete={"off"} slot="end" name="closedate" value={formData.closedate || moment().format('YYYY-MM-DD') || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>
            <IonItem>
              <IonButton slot="end" type="submit">Confirm</IonButton>
            </IonItem>
            
        
        </form>
        
    </IonItem>
  );
};
const mapStateToProps = (state: any) => ({
  user: state.auth.user
})
export default connect(mapStateToProps, { newProject })(withRouter(CreateProject));
