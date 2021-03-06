
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonSearchbar, IonText, useIonAlert, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonAlert, IonVirtualScroll, IonRouterLink, IonSelect, IonSelectOption } from '@ionic/react';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadUsers } from '../../store/actions/auth';
import { getTsx, newTsx } from '../../store/actions/tsx';
import AccountRow from '../lists/AccountRow';
import Loader from '../Loader';
import NotFound from '../NotFound';


const CreateTransfer: React.FC<any> = React.memo(({ newTsx, history, user, users, tsx, loadUsers, prevTsx = null }) => {


  useEffect(() => {

    loadUsers()
    
  }, [])

  const [doSearch, setDoSearch] = useState(false)
  
  const [formData, setFormData] = useState({
    tsx_id: '',
    to: '',
    amount: '',
    accounting_date: moment().format('YYYY-MM-DD'),
    public_key: '',
    description: '',
    currency: ''
  })

  

  useEffect(() => {

    if (prevTsx && tsx?.tsx) {

      setFormData({...formData, ...prevTsx, to: prevTsx.public_key, accounting_date: moment().format('YYYY-MM-DD')})

    }

    return () => {
      
      setFormData({
        tsx_id: '',
        to: '',
        amount: '',
        accounting_date: moment().format('YYYY-MM-DD'),
        public_key: '',
        description: '',
        currency: ''
      })

    }
    
  }, [prevTsx, tsx.loading, formData?.tsx_id])


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

  if (tsx.loading) {
    return <Loader />
  }

  return (
    <form onSubmit={(e: any) => handleSubmit(e)}>
        
      {
        doSearch ? <Fragment>
          
          <IonCard>
            <IonCardHeader>
              <IonToolbar mode="md">
                <IonSearchbar></IonSearchbar>
              </IonToolbar>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonCard>
                  <IonCardContent>
                    
                    <IonList>
                      {
                        users?.length ? users?.map((element: any, index: number) => <AccountRow key={index} element={element} index={index} doSearch={doSearch} setDoSearch={setDoSearch} formData={formData} setFormData={setFormData} />) : <NotFound message="User not found" />
                      }
                    </IonList>
                  </IonCardContent>
                </IonCard>

                <IonItem>
                  <IonButton type="button" slot="end" onClick={()=> setDoSearch(false)}>Cancel</IonButton>
                </IonItem>
              </IonList>
            </IonCardContent>
            
          </IonCard>
        </Fragment> : <Fragment>


            <IonItem>
              <IonLabel>From</IonLabel>
              <IonText slot="end">{user?.accountType || "You"}</IonText>
            
            </IonItem>
            <IonItem>
              <IonLabel>To</IonLabel>
              <IonInput slot="end" autocomplete={"off"} name="to" value={formData.to || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>

            </IonItem>
            <IonItem>
              <IonLabel>Description</IonLabel>
              <IonInput slot="end" autocomplete={"off"} name="description" value={formData.description || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>
            <IonItem>
              <IonLabel>Amount</IonLabel>
              <IonInput slot="end" autocomplete={"off"} name="amount" value={formData.amount || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>   
            <IonItem>
              <IonLabel>Currency</IonLabel>
              <IonSelect slot="end" name="currency" value={formData.currency || ""} onIonChange={(e: any) => handleChange(e)}>
                {
                  ['EUR', 'GBP', 'PLN', 'CZK'].map((element: string, index: number) => <IonSelectOption key={index} value={element}>{element}</IonSelectOption>)
                }
              </IonSelect>
            
            </IonItem>            
            <IonItem>
              <IonLabel>date</IonLabel>
              <IonInput type="date" autocomplete={"off"} slot="end" name="accounting_date" value={moment(formData.accounting_date).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD') || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
            
            </IonItem>
            <IonItem>
              <IonButton slot="end" type="submit">Confirm</IonButton>
            </IonItem>
            
        <IonItem>
          <IonRouterLink onClick={() => setDoSearch(true)}>
            Forgot the recipient account?
          </IonRouterLink>
        </IonItem>
          
        </Fragment>
      }
    </form>
        
  );
});
const mapStateToProps = (state: any) => ({
  users: state.users.users,
  user: state.auth.user,
  tsx: state.tsx
})
export default connect(mapStateToProps, {newTsx, loadUsers, getTsx})(withRouter(CreateTransfer));
