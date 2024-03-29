
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonGrid, IonRow, IonCol, IonInput, IonSelect, IonSelectOption, IonButtons, IonImg, IonAccordion, IonAccordionGroup, IonCardSubtitle } from '@ionic/react';
import axios from 'axios';
import { checkmark, closeCircleOutline, home, lockClosed, lockOpen, settings } from 'ionicons/icons';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Approval from '../components/Approval';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import { createWallet, loadUser, update, updateCredentials, updateIncome } from '../store/actions/auth';
import { getBalance, updateMainWallet } from '../store/actions/tsx';


const Settings: React.FC<RouteComponentProps | any> = ({ history, auth, account, updateMainWallet, update, createWallet, updateIncome, updateCredentials, location }) => {




    const [ selected, setSelected ] = useState(0)


    const [ openSecret, setOpenSecret ] = useState(false);

    const [ openAvatarInput, setOpenAvatarInput ] = useState(false)

    const [ formData, setFormData ] = useState<any>({
        first_name: '',
        last_name: '',
        gender_title: 'None',
        date_of_birth: '',
        country: '',
        email: ''
    });

    const [ avatarField, setAvatarField ] = useState({
        avatar: ''
    });

    const [ mainWallet, setMainWallet ] = useState({
        main_wallet: ''
    })
    const [ incomeValue, setIncomeValue ] = useState({
        income: ''
    })

    useEffect(() => {
        if (location?.state?.new_wallet) {
            setSelected(1)
        } else {
            setSelected(0)
        }
    }, [location])

    const updateAvatar = async (e: any) => {

        try {
            e.preventDefault();

            await update(avatarField);

            setOpenAvatarInput(false);

        } catch (err: any) {
            console.log(err.message)
        }

    }


    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handlePersonalData = async (e: any) => {
        
        try {
            e.preventDefault()

            await update(formData)

        } catch (err: any) {
            console.log(err.message)
        }
        
    }

    const updateForm = async () => {
        
        setFormData({ ...formData, ...auth?.user })
        setMainWallet({ ...mainWallet, main_wallet: auth?.user?.main_wallet })
        setIncomeValue({ ...incomeValue, income: auth?.user?.income })
    }

    useEffect(() => {

        updateForm()

    }, [auth?.user, auth?.loading, selected, formData?.user_id])


    const handleDefaultSrc = (e: any) => {
        e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOth66OC9IjxBJ2qqyFqbdzg19cZ1Bhbj4AWkruWZtygzopH9DUbV6vgrL7NlL_cOth6k&usqp=CAU'
    }

    const handleMainWallet = async (e: any) => {

        try {
            e.preventDefault();
            if (e.target.value === auth.user.main_wallet) {
                return console.log('Value is the same.')
            }
            await updateMainWallet(e)

            setMainWallet({ main_wallet: e.target.value })


        } catch (err: any) {
            console.log(err.message)
        }
    }
    const handleWallet = async (e: any) => {

        try {
            e.preventDefault();
            if (auth?.user?.wallets?.indexOf(e.target.value) >= 0) {
                return console.log('Value is the same.')
            }
            await createWallet({ wallet: e.target.value })


        } catch (err: any) {
            console.log(err.message)
        }
    }
    const handleIncome = async (e: any) => {

        try {
            e.preventDefault();
            if (auth?.user?.income?.toString() === e?.target?.value?.toString()) {
                return console.log('Value is the same.')
            }
            await updateIncome({ income: e.target.value })


        } catch (err: any) {
            console.log(err.message)
        }
    }

    const [ passwordData, setPasswordData ] = useState({
        password: '',
        passwordConfirmation: ''
    })


    const handleChangePassword = (e: any) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
    }

    const handleUpdate = async (e: any) => {
        try {
            e.preventDefault();
            
            
            if (!passwordData?.password || !passwordData?.passwordConfirmation) {
              return false;
            }
      
            await updateCredentials(passwordData, history)
            
          } catch (err: any) {
      
            console.log(err.message)
            
          }
    }

    
  const subTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }, 
    {
      text: "Settings", path: '/settings', icon: settings, 
    
    }
  ]

  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitles={subTitles} />
        

      <IonList>

        <IonListHeader>
            
          <IonItem lines='none'>
            <IonIcon size="large" color='dark' icon={settings}></IonIcon>
          </IonItem>
            <IonTitle style={{ textAlign: 'center' }}>
                Settings

            </IonTitle>
            <IonCardSubtitle>
                Manage your account
            </IonCardSubtitle>
        </IonListHeader>

        {
          auth?.user?.approved === false && <Fragment>
            <Approval />
          </Fragment>
        }

        <IonList>
            <IonCard>

                <IonCardHeader>
                        <IonItem>
                            <IonGrid>
                                <IonRow>
                                    <IonCol className="ion-items-center inner-items-active" style={ selected === 0 ? { fontWeight: 'bold' } : {} }>
                                        <IonText onClick={() => setSelected(0)}>My profile</IonText>

                                    </IonCol>
                                    <IonCol className="ion-items-center inner-items-active" style={ selected === 1 ? { fontWeight: 'bold' } : {} }>
                                        <IonText onClick={() => setSelected(1)}>My wallet</IonText>
                                                
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        {
                            auth?.loading ? <Loader /> : (selected === 0 || !selected) ? <Fragment>
                                
                                
                                {
                                    <IonItem><div className="ion-items-center">
                                        <IonImg onIonError={(e) => handleDefaultSrc(e)} src={auth?.user?.avatar ? auth?.user?.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOth66OC9IjxBJ2qqyFqbdzg19cZ1Bhbj4AWkruWZtygzopH9DUbV6vgrL7NlL_cOth6k&usqp=CAU"} alt="avatar" />
                                    </div></IonItem>
                                }

                                <IonItem>
                                    <div className="ion-items-center">
                                        {
                                            openAvatarInput ? <Fragment>
                                                <form onSubmit={(e: any) => updateAvatar(e)} style={{ width: '100%'}} autoComplete={"off"} >
                                                <IonGrid>
                                                    <IonRow>
                                                        <IonCol className="ion-items-center">
                                                            Update your picture
                                                        </IonCol>
                                                    </IonRow>
                                                    <IonRow>
                                                        <IonCol className="ion-items-center">
                                                            <IonItem>
                                                                <IonInput onIonChange={(e: any) => setAvatarField({ avatar: e.target.value})} placeholder="https://..."></IonInput>
                                                            </IonItem>
                                                        </IonCol>
                                                    </IonRow>
                                                    <IonRow>
                                                        <IonCol className="ion-items-center">
                                                            <IonButton type="button" color="secondary" onClick={() => setOpenAvatarInput(false)} size="small" style={{ width: '80%'}}>Cancel</IonButton>
                                                        </IonCol>
                                                        <IonCol className="ion-items-center">
                                                            <IonButton type="submit" disabled={!(avatarField?.avatar)} size="small" style={{ width: '80%'}}>Save</IonButton>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonGrid>
                                                </form>
                                                </Fragment> : <IonButton color="white" onClick={() => setOpenAvatarInput(!openAvatarInput)}>
                                                    <IonText color="dark" >Update your picture</IonText>
                                                </IonButton>
                                        }

                                    </div>
                                </IonItem>

                                {
                                    auth?.loading ? <Loader /> : <form onSubmit={(e: any) => handlePersonalData(e)}>
                                    
                                        <IonItem>
                                            <IonLabel slot="start">
                                                First name
                                            </IonLabel>
                                            <IonInput value={formData.first_name || ''} autocomplete="off" maxlength={250} type="text" name="first_name" onIonChange={ (e: any) => handleChange(e)}></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel slot="start">
                                                Last name
                                            </IonLabel>
                                            <IonInput value={formData.last_name || ''} maxlength={250} autocomplete={"off"} type="text" name="last_name" onIonChange={ (e: any) => handleChange(e)}></IonInput>
                                        </IonItem>   
                                        <IonItem>
                                        <IonLabel>Title</IonLabel>
                                            <IonSelect slot="end" name="gender_title" value={formData.gender_title || ''} onIonChange={(e: any) => handleChange(e)}>
                                                {
                                                    ['None', 'Ms', 'Mr', 'Mx', 'Mrs', 'Miss'].map((element: string, index: number) => <IonSelectOption key={index} value={element}>{element}</IonSelectOption>)
                                                }
                                            </IonSelect>
                                        
                                        </IonItem>  
                                        <IonItem>
                                            <IonLabel slot="start">
                                                E-mail address
                                            </IonLabel>

                                            <IonInput value={formData.email || ''} autocomplete={"off"} maxlength={250} type="text" name="email" onIonChange={ (e: any) => handleChange(e)}></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Date of birth</IonLabel>
                                            <IonInput type="date" slot="end" name="date_of_birth" autocomplete={"off"} value={moment(formData.date_of_birth).format('YYYY-MM-DD') || ""} onIonChange={(e: any) => handleChange(e)}></IonInput>
                                            
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel slot="start">
                                                Country
                                            </IonLabel>

                                            <IonInput value={formData.country || ''} autocomplete={"off"} maxlength={250} type="text" name="country" onIonChange={ (e: any) => handleChange(e)}></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <div className="ion-items-center">
                                            <IonButton disabled={!(formData.email && formData.last_name && formData.gender_title && formData.country && formData.first_name && formData.date_of_birth && formData.email.includes('@') && formData.email.includes('.') && !(new RegExp("\\\\","").test(formData.email)) && !(new RegExp("\\\\","").test(formData.first_name)) && !(new RegExp("\\\\","").test(formData.last_name)))} type="submit" size="default" color="primary">
                                                Save changes
                                            </IonButton>
                                            </div>
                                        </IonItem>
                                    </form>
                                }

                                

                            </Fragment> : selected === 1 ? <Fragment>
                                <IonList>
                                    <IonListHeader className="ion-items-center">
                                        <IonTitle className="no-padding">
                                            Pay accounts

                                        </IonTitle>
                                    </IonListHeader>
                                    {
                                        account.loading ? <Loader /> : account.wallets.length ? account.wallets.map((element: any, index: number) => <Fragment key={index}>
                                            <IonItem style={{ fontSize: '16px' }}>
                                                { element ? element.balance : 'N/A' } { element ? element.currency : 'N/A' }
                                            </IonItem>
                                        </Fragment>) : <NotFound message={"No available wallets."} />
                                    }
                                </IonList>
                                {
                                    auth?.user?.approved ? <Fragment>
                                        
                                        {
                                            auth?.user?.wallets?.length && 
                                            
                                            <IonItem>
                                                {
                                                    mainWallet?.main_wallet ?
                                                        <IonLabel>
                                                            Primary
                                                        </IonLabel> : 
                                                        <IonLabel color="warning">
                                                            Primary
                                                        </IonLabel>
                                                }
                                                <IonSelect slot="end" name="main_wallet" value={mainWallet?.main_wallet || ""} onIonChange={(e: any) => handleMainWallet(e)}>
                                                    {
                                                        auth?.user?.wallets?.length ? auth?.user?.wallets?.map((element: any, index: number) => <IonSelectOption key={index} value={element}>{element}</IonSelectOption>) : <IonSelectOption value={''}>{''}</IonSelectOption>
                                                    }
                                                </IonSelect>
                                            </IonItem>
                                        }
                                        {
                                            auth?.user?.wallets?.length !== ['EUR', 'GBP', 'PLN', 'CZK'].length &&

                                                <IonItem>
                                                    {
                                                        auth?.user?.wallets?.length ?
                                                            <IonLabel>
                                                                Create a new wallet
                                                            </IonLabel> : 
                                                            <IonLabel color="warning">
                                                                Create a new wallet
                                                            </IonLabel>
                                                    }
                                                    
                                                    {
                                                        <IonSelect slot="end" name="wallet" onIonChange={(e: any) => handleWallet(e)}>
                                                            {
                                                                ['EUR', 'GBP', 'PLN', 'CZK'].map((element: string, index: number) => <IonSelectOption key={index} value={element}>{element}</IonSelectOption>)
                                                            }
                                                        </IonSelect>
                                                    }
                                                </IonItem>

                                        }
                                        {
                                            mainWallet?.main_wallet && 
                                                <IonItem>
                                                    {
                                                        incomeValue?.income === null ?
                                                        
                                                            <IonLabel color="warning">
                                                                Daily income
                                                            </IonLabel> : 
                                                            <IonLabel >
                                                                Daily income
                                                            </IonLabel>
                                                    }
                                                    {
                                                        
                                                        <IonSelect slot="end" name="wallet" value={ incomeValue?.income } onIonChange={(e: any) => handleIncome(e)}>
                                                            {
                                                                [0, 1000, 5000, 10000, 15000].map((element: number, index: number) => <IonSelectOption key={index} value={element}>{element}</IonSelectOption>)
                                                            }
                                                        </IonSelect>
                                                    }
                                                </IonItem>
                                        }
                                    </Fragment> : false
                                }


                                <IonList>
                                    
                                    <IonListHeader className="ion-items-center">
                                        <IonTitle className="no-padding">
                                            Protection

                                        </IonTitle>
                                    </IonListHeader>
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
            {
                !auth?.loading && selected === 0 && <Fragment>

                    <IonCard>
                    <IonCardHeader>
                        <IonCardTitle mode="md">
                        More information

                        </IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                        <IonToolbar mode="md">
                            <IonAccordionGroup>
                                <IonCard>
                                    <IonCardContent>
                                        <IonAccordion>
                                        <IonItem slot="header">

                                            <IonText>Change my password</IonText>
                                        
                                        </IonItem>
                                        <IonItem slot="content">
                                        <form onSubmit={(e: any) => handleUpdate(e)}>
                                            <IonItem>
                                                <IonLabel>
                                                New password
                                                </IonLabel>
                                                <IonInput type="password" value={ passwordData.password || '' } name="password" slot="end" onIonChange={(e: any)=> handleChangePassword(e)}></IonInput>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>
                                                Confirm password
                                                </IonLabel>
                                                <IonInput type="password" value={ passwordData.passwordConfirmation || '' } name="passwordConfirmation" slot="end" onIonChange={(e: any)=> handleChangePassword(e)}></IonInput>
                                            </IonItem>
                                            <IonItem>
                                                <IonButton type="submit" slot="end" size="default" disabled={ !(passwordData.password && passwordData.passwordConfirmation) }>
                                                Submit
                                                </IonButton>
                                            </IonItem>
                                        </form>
                                        </IonItem>
                                        </IonAccordion>
                                        
                                        <IonAccordion>
                                        <IonItem slot="header" >
                                        
                                            <IonText color="danger">Delete my account</IonText>
                                        
                                        </IonItem>

                                        
                                        <IonItem slot="content">
                                            This feature is coming soon. Please contact mikey.nivest@gmail.com
                                        </IonItem>

                                        </IonAccordion>
                                    </IonCardContent>
                                </IonCard>
                            </IonAccordionGroup>
                        </IonToolbar>
                        </IonCardContent>
                    
                    </IonCard>
                    
                </Fragment>

                    
            }
        </IonList>
                
        </IonList>
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
    auth: state.auth,
    account: state.account
})

export default connect(mapStateToProps, { updateMainWallet, update, createWallet, updateIncome, updateCredentials })(withRouter(Settings));
