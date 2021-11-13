
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonSearchbar, IonText, useIonAlert, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonAlert, IonVirtualScroll, IonRouterLink, IonSelect, IonSelectOption } from '@ionic/react';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadUsers } from '../../store/actions/auth';
import { newTsx } from '../../store/actions/tsx';
import AccountRow from '../lists/AccountRow';


const CreateTransfer: React.FC<any> = ({ newTsx, history, user, users, loadUsers }) => {


  useEffect(() => {

    loadUsers()

  }, [])

  const [doSearch, setDoSearch] = useState(false)
  
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

      await newTsx(formData, history, present)

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
              <IonLabel>From</IonLabel>
              <IonText slot="end">{user.accountType || "You"}</IonText>
            
            </IonItem>
            <IonItem>
              <IonLabel>To</IonLabel>
              <IonInput slot="end" name="to" value={formData.to || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

            </IonItem>
            <IonItem>
              <IonLabel>Description</IonLabel>
              <IonInput slot="end" name="description" onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>
            <IonItem>
              <IonLabel>Amount</IonLabel>
              <IonInput slot="end" name="amount" onIonChange={(e: any) => handleChange(e)}></IonInput>
            
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
              <IonLabel>date</IonLabel>
              <IonInput type="date" slot="end" name="accounting_date" value={formData.accounting_date || moment(Date.now()).format('YYYY-MM-DD') || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>
            <IonItem>
              <IonButton slot="end" type="submit">Confirm transfer</IonButton>
            </IonItem>
            
        <IonItem>
          <IonRouterLink onClick={() => setDoSearch(true)}>
            Forgot the recipient account?
          </IonRouterLink>
        </IonItem>
        </form>
        
        {
          doSearch && <Fragment>
            
            <IonCard className="ion-alert-searchbar">
              <IonCardHeader>
                <IonToolbar>
                  <IonSearchbar></IonSearchbar>
                </IonToolbar>
              </IonCardHeader>
              <IonCardContent>
                
                <IonList>
                  {
                    users.map((element: any, index: number) => <AccountRow key={index} element={element} index={index} doSearch={doSearch} setDoSearch={setDoSearch} formData={formData} setFormData={setFormData} />)
                  }
                </IonList>
                <IonItem>
                  <IonButton slot="end" onClick={()=> setDoSearch(false)}>Cancel</IonButton>
                </IonItem>
              </IonCardContent>
              
            </IonCard>
          </Fragment>
        }
    </IonItem>
  );
};
const mapStateToProps = (state: any) => ({
  users: state.users.users,
  user: state.auth.user
})
export default connect(mapStateToProps, {newTsx, loadUsers})(withRouter(CreateTransfer));
