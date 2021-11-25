
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonGrid, IonRow, IonCol, IonInput, IonSelect, IonSelectOption } from '@ionic/react';
import { checkmark, lockClosed, lockOpen } from 'ionicons/icons';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Balance from '../components/Balance';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import users from '../store/reducers/users';

const Settings: React.FC<RouteComponentProps | any> = ({ history, auth }) => {


    const [ selected, setSelected ] = useState(0)

    const [ openSecret, setOpenSecret ] = useState(false)

    const [ formData, setFormData ] = useState<any>({
        firstName: '',
        lastName: '',
        genderTitle: 'None',
        dateOfBirth: moment().format('YYYY-MM-DD'),
        country: '',
        email: ''
    })


    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handlePersonalData = (e: any) => {
        
        try {
            e.preventDefault()


        } catch (err: any) {
            console.log(err.message)
        }
        
    }

    useEffect(() => {
        if (auth?.user) {
            setFormData({ ...formData, ...auth.user })
        }
        


    }, [auth?.user, auth?.loading])


  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > Settings"} />
        

      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                Settings

            </IonTitle>
        </IonListHeader>

        <IonList>
            <IonCard>

                <IonCardHeader>
                        <IonItem>
                            <IonGrid>
                                <IonRow>
                                    <IonCol className="ion-items-center" style={ selected === 0 ? { fontWeight: 'bold' } : {} }>
                                        <span onClick={() => setSelected(0)}>My profile</span>

                                    </IonCol>
                                    <IonCol className="ion-items-center" style={ selected === 1 ? { fontWeight: 'bold' } : {} }>
                                        <span onClick={() => setSelected(1)}>My wallets</span>

                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        {
                            selected === 0 || !selected ? <Fragment>
                                
                                <IonItem>
                                    <div className="ion-items-center">
                                        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOth66OC9IjxBJ2qqyFqbdzg19cZ1Bhbj4AWkruWZtygzopH9DUbV6vgrL7NlL_cOth6k&usqp=CAU"} />
                                    </div>
                                </IonItem>
                                <IonItem>
                                    <div className="ion-items-center">
                                        <IonButton color="grey" style={{ color: "#000"}}>
                                            Update your picture
                                        </IonButton>
                                    </div>
                                </IonItem>


                                <form onSubmit={(e: any) => handlePersonalData(e)}>
                                    
                                    <IonItem>
                                        <IonLabel slot="start">
                                            First name
                                        </IonLabel>
                                        <IonInput value={formData.firstName || ''} max="250" type="text" name="firstName" onIonChange={ (e: any) => handleChange(e)}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel slot="start">
                                            Last name
                                        </IonLabel>
                                        <IonInput value={formData.lastName || ''} max="250" type="text" name="lastName" onIonChange={ (e: any) => handleChange(e)}></IonInput>
                                    </IonItem>   
                                    <IonItem>
                                    <IonLabel>Title</IonLabel>
                                        <IonSelect slot="end" name="genderTitle" value={formData.genderTitle || ''} onIonChange={(e: any) => handleChange(e)}>
                                            <IonSelectOption value="none">None</IonSelectOption>
                                            <IonSelectOption value="Ms">Ms</IonSelectOption>
                                            <IonSelectOption value="Mr">Mr</IonSelectOption>
                                            <IonSelectOption value="Mx">Mx</IonSelectOption>
                                            <IonSelectOption value="Mrs">Mrs</IonSelectOption>
                                            <IonSelectOption value="Miss">Miss</IonSelectOption>
                                        </IonSelect>
                                    
                                    </IonItem>  
                                    <IonItem>
                                        <IonLabel slot="start">
                                            E-mail address
                                        </IonLabel>

                                        <IonInput value={formData.email || ''} max="50" type="text" name="email" onIonChange={ (e: any) => handleChange(e)}></IonInput>
                                    </IonItem>            
                                    <IonItem>
                                        <IonLabel>Date of birth</IonLabel>
                                        <IonInput type="date" slot="end" name="dateOfBirth" value={moment(formData.dateOfBirth).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD') || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
                                        
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel slot="start">
                                            Country
                                        </IonLabel>

                                        <IonInput value={formData.country || ''} max="50" type="text" name="email" onIonChange={ (e: any) => handleChange(e)}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <div className="ion-items-center">
                                        <IonButton disabled={!(formData.email && formData.lastName && formData.title && formData.firstName && formData.email.includes('@') && formData.email.includes('.') && !(new RegExp("\\\\","").test(formData.email)) && !(new RegExp("\\\\","").test(formData.firstName)) && !(new RegExp("\\\\","").test(formData.lastName)))} type="submit" size="default" color="primary">
                                            Save changes
                                        </IonButton>
                                        </div>
                                    </IonItem>
                                </form>

                            </Fragment> : selected === 1 ? <Fragment>

                                <IonList>

                                    <IonItem>
                                        <IonIcon slot="start" icon={lockOpen}></IonIcon>
                                        <IonText>Public key (account number)</IonText>
                                    </IonItem>
                                    <IonItem>
                                        <IonText style={{ wordBreak: 'break-all' }}>{auth?.user?.public_key || "N/A"}</IonText>
                                    </IonItem>
                                    <IonItem onClick={() => setOpenSecret(!openSecret)}>
                                        <IonIcon slot="start" icon={openSecret ? lockOpen : lockClosed}></IonIcon>
                                        <IonText>Private key (signature number)</IonText>
                                    </IonItem>
                                    {
                                        openSecret && <IonItem>
                                            <IonText style={{ wordBreak: 'break-all' }}>{auth?.user?.private_key || "N/A"}</IonText>
                                        </IonItem>
                                    }
                                    
                                </IonList>


                            </Fragment> : false
                        }
                        
                    </IonList>

                </IonCardContent>
            </IonCard>
        </IonList>
                
        </IonList>
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(withRouter(Settings));
