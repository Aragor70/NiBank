
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonSearchbar, IonText, useIonAlert, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonAlert, IonVirtualScroll, IonRouterLink, IonSelect, IonSelectOption } from '@ionic/react';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadUsers } from '../../store/actions/auth';
import { newTsx } from '../../store/actions/tsx';


const CreateProject: React.FC<any> = ({ newTsx, history, user }) => {


  const [formData, setFormData] = useState({
    to: '',
    amount: '',
    accounting_date: '',
    public_key: ''
  })
  
  const [present] = useIonAlert();

  const handleSubmit = async(e: any) => {
    try {
      e.preventDefault();

      
      

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
              <IonInput slot="end" name="to" value={formData.to || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

            </IonItem>
            <IonItem>
              <IonLabel>Country</IonLabel>
              <IonInput slot="end" name="to" value={formData.to || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

            </IonItem>
            <IonItem>
              <IonLabel>YieldPA</IonLabel>
              <IonInput slot="end" name="to" value={formData.to || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

            </IonItem>
            <IonItem>
              <IonLabel>Volume total</IonLabel>
              <IonInput slot="end" name="to" value={formData.to || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

            </IonItem>
            <IonItem>
              <IonLabel>Minimum investment</IonLabel>
              <IonInput slot="end" name="to" value={formData.to || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

            </IonItem>
            <IonItem>
              <IonLabel>Description</IonLabel>
              <IonInput slot="end" name="description" onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>
            <IonItem>
              <IonLabel>Status</IonLabel>
              <IonInput slot="end" name="status" onIonChange={(e: any) => handleChange(e)}></IonInput>
            
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
              <IonInput type="date" slot="end" name="accounting_date" value={formData.accounting_date || moment(Date.now()).format('YYYY-MM-DD') || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>            
            <IonItem>
              <IonLabel>Close date</IonLabel>
              <IonInput type="date" slot="end" name="accounting_date" value={formData.accounting_date || moment(Date.now()).format('YYYY-MM-DD') || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
            
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
export default connect(mapStateToProps, {})(withRouter(CreateProject));
