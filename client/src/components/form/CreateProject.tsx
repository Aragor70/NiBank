
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
              <IonInput slot="end" name="projectname" value={formData.projectname || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

            </IonItem>
            <IonItem>
              <IonLabel>Country</IonLabel>
              <IonInput slot="end" name="country" value={formData.country || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

            </IonItem>
            <IonItem>
              <IonLabel>YieldPA</IonLabel>
              <IonInput slot="end" name="yieldpa" value={formData.yieldpa || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

            </IonItem>
            <IonItem>
              <IonLabel>Volume total</IonLabel>
              <IonInput slot="end" name="volumetotal" value={formData.volumetotal || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

            </IonItem>
            <IonItem>
              <IonLabel>Minimum investment</IonLabel>
              <IonInput slot="end" name="minimuminvestment" value={formData.minimuminvestment || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

            </IonItem>
            <IonItem>
              <IonLabel>Description</IonLabel>
              <IonInput slot="end" name="description" value={formData.description || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>
            <IonItem>
              <IonLabel>Status</IonLabel>
              <IonSelect slot="end" name="status" onIonChange={(e: any) => handleChange(e)}>
                <IonSelectOption value="UNDER_CONSIDERATION">UNDER CONSIDERATION</IonSelectOption>
                <IonSelectOption value="OPEN">OPEN</IonSelectOption>
              </IonSelect>
            
            </IonItem>
            <IonItem>
              <IonLabel>Type of investment</IonLabel>
              <IonSelect slot="end" name="typeofinvestment" onIonChange={(e: any) => handleChange(e)}>
                <IonSelectOption value="DEBT">DEBT</IonSelectOption>
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
            <IonItem>
              <IonLabel>Currency</IonLabel>
              <IonSelect slot="end" name="currency" onIonChange={(e: any) => handleChange(e)}>
                <IonSelectOption value="EUR">EUR</IonSelectOption>
                <IonSelectOption value="GBP">GBP</IonSelectOption>
                <IonSelectOption value="PLN">PLN</IonSelectOption>
                <IonSelectOption value="CZK">CZK</IonSelectOption>
              </IonSelect>
            
            </IonItem>            
            <IonItem>
              <IonLabel>Start date</IonLabel>
              <IonInput type="date" slot="end" name="startdate" value={formData.startdate || moment(Date.now()).format('YYYY-MM-DD') || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>            
            <IonItem>
              <IonLabel>Close date</IonLabel>
              <IonInput type="date" slot="end" name="closedate" value={formData.closedate || moment(Date.now()).format('YYYY-MM-DD') || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>
            <IonItem>
              <IonButton slot="end" type="submit">Confirm transfer</IonButton>
            </IonItem>
            
        <IonItem>
          <IonRouterLink>
            Forgot the recipient account?
          </IonRouterLink>
        </IonItem>
        </form>
        
    </IonItem>
  );
};
const mapStateToProps = (state: any) => ({
  user: state.auth.user
})
export default connect(mapStateToProps, { newProject })(withRouter(CreateProject));
