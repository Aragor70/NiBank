
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonSearchbar, IonText, useIonAlert, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonAlert, IonVirtualScroll, IonRouterLink, IonSelect, IonSelectOption } from '@ionic/react';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearTsx, getTsx, newInvest } from '../../store/actions/tsx';


const CreateInvestment: React.FC<any> = ({ newInvest, history, user, project, tsx, prevTsx = null, getTsx, clearTsx, match }) => {


  const [formData, setFormData] = useState({
    project_id: '',
    amount: '',
    accounting_date: moment().format('YYYY-MM-DD'),
    public_key: '',
    description: '',
    currency: '',
    projectname: ''
  })

  

  useEffect(() => {

    if (prevTsx) {

      setFormData({...formData, ...prevTsx, description: 'Investment', accounting_date: moment().format('YYYY-MM-DD')})

    }

    return () => {

      console.log('clear invest from')
      setFormData({
        project_id: '',
        amount: '',
        accounting_date: moment().format('YYYY-MM-DD'),
        public_key: '',
        description: '',
        currency: '',
        projectname: ''
      })

    }

  }, [prevTsx, tsx.loading, project.loading])
  
  const [present] = useIonAlert();

  const handleSubmit = async(e: any) => {
    try {

      e.preventDefault();
      console.log(formData)

      if (prevTsx) {

        await newInvest(tsx.tsx.to_project_id, formData, history, present)

      } else {

        await newInvest(project.project.project_id, formData, history, present)

      }

    } catch (err: any) {

      console.log(err.message)

    }

  }
  const handleChange = (e: any) => {
    return setFormData({...formData, [e.target.name]: e.target.value})
  }

  if (tsx.loading || project.loading) {
    return <IonItem>loading...</IonItem>
  }
  return (
    <IonItem>    
        <form onSubmit={(e: any) => handleSubmit(e)}>
            
            <IonItem>
              <IonLabel>From</IonLabel>
              <IonText slot="end">{user?.accountType || "You"}</IonText>
            
            </IonItem>
            <IonItem>
              <IonLabel>Project</IonLabel>
              <IonText slot="end">{formData?.projectname ? formData?.projectname || "N/A" : "N/A" }</IonText>

            </IonItem>
            <IonItem>
              <IonLabel>Description</IonLabel>
              <IonInput slot="end" name="description" value={formData.description || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>
            <IonItem>
              <IonLabel>Amount</IonLabel>
              <IonInput slot="end" name="amount" value={formData.amount || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>   
            <IonItem>
              <IonLabel>Currency</IonLabel>
              <IonSelect slot="end" name="currency" value={formData.currency || ""} onIonChange={(e: any) => handleChange(e)}>
                <IonSelectOption value="EUR">EUR</IonSelectOption>
                <IonSelectOption value="GBP">GBP</IonSelectOption>
                <IonSelectOption value="PLN">PLN</IonSelectOption>
                <IonSelectOption value="CZK">CZK</IonSelectOption>
              </IonSelect>
            
            </IonItem>            
            <IonItem>
              <IonLabel>date</IonLabel>
              <IonInput type="date" slot="end" name="accounting_date" value={moment(formData.accounting_date).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD') || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>
            <IonItem>
              <IonButton slot="end" type="submit">Confirm</IonButton>
            </IonItem>
        
        </form>
        
        
    </IonItem>
  );
};
const mapStateToProps = (state: any) => ({
  user: state.auth.user,
  project: state.project,
  tsx: state.tsx
})
export default connect(mapStateToProps, {newInvest, getTsx, clearTsx})(withRouter(CreateInvestment));
