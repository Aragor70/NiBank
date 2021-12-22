
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonItemDivider, IonInput, IonButtons } from '@ionic/react';
import { home } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import PageSubTitle from '../../components/PageSubTitle';
import { preRecovery, setForgotCredentials, updateCredentials } from '../../store/actions/auth';

const RecoverPassword: React.FC <any> = ({ auth, setForgotCredentials, updateCredentials, preRecovery, history }) => {

  const [formDataOne, setFormDataOne] = useState<any>({
    code: '',
    email: ''
  })

  const [formDataTwo, setFormDataTwo] = useState<any>({
    code: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [ step, setStep ] = useState<any>(0);

  useEffect(() => {

    if (auth?.preLogin?.email) {
      setFormDataTwo({ ...formDataTwo, email: auth?.preLogin?.email })

      setForgotCredentials({ email: auth?.preLogin?.email })
    }

    return () => {
      setFormDataTwo({
        code: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      })
    }

  }, [])
  
  const handleSubmit = async(e: any) => {
    try {
      e.preventDefault();

      if (!formDataOne?.email) {
        return false;
      }

      setForgotCredentials({ email: formDataOne?.email })

      
    } catch (err: any) {

      console.log(err.message)
      
    }

  }
  
  const handleVerify = async(e: any) => {
    try {
      e.preventDefault();

      if (!formDataTwo?.email || !formDataTwo?.code) {
        return false;
      }

      preRecovery(formDataTwo, setStep);

      
    } catch (err: any) {

      console.log(err.message)
      
    }

  }
  
  const handleUpdate = async(e: any) => {
    try {
      e.preventDefault();

      
      if (!formDataTwo?.email || !formDataTwo?.code || !formDataTwo?.password || !formDataTwo?.passwordConfirmation) {
        return false;
      }

      updateCredentials(formDataTwo, history)
      
    } catch (err: any) {

      console.log(err.message)
      
    }

  }

  const handleChangeOne = (e: any) => {
    return setFormDataOne({...formDataOne, [e.target.name]: e.target.value})
  }

  const handleChangeTwo = (e: any) => {
    return setFormDataTwo({...formDataTwo, [e.target.name]: e.target.value})
  }

    
  const subTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }, 
    {
      text: "Recover password", path: '/recover_password', icon: '', 
    
    }
  ]

  return (
    <IonPage>

      <PageHeader />

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={subTitles} />
        
      <IonList>
          
          <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
              Forgot your password? 

            </IonTitle>
          </IonListHeader>
          
          {
            step === 0 && <Fragment>

              {
                auth?.preLogin?.email ? false : <Fragment>

                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle mode="md">
                        Recover password

                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      
                        <IonItem>
                          We will send a recovery code to the email provided it belongs to an account. Type the code in the next step to update your password.
                        </IonItem>
                        <form onSubmit={(e: any) => handleSubmit(e)}>
                          <IonItem>
                              <IonLabel>
                                Email
                              </IonLabel>
                              <IonInput name="email" slot="end" value={ formDataOne.email || '' } onIonChange={(e: any)=> handleChangeOne(e)}></IonInput>
                          </IonItem>
                          <IonItem>
                            <IonButton type="submit" slot="end" size="default" disabled={ !(formDataOne.email) }>Send</IonButton>
                          </IonItem>
                        </form>
                        
                        
                    </IonCardContent>
                  </IonCard>


                </Fragment>
              }
              
              {/* <IonAccordionGroup>
                <IonAccordion value="Verify the code">
                  <IonItem slot="header">

                  </IonItem>
                </IonAccordion>
              </IonAccordionGroup> */}

              <IonCard>
                <IonCardHeader>
                  <IonCardTitle mode="md">
                    Verify the code
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <form onSubmit={(e: any) => handleVerify(e)}>
                      <IonItem>
                          <IonLabel>
                            Email
                          </IonLabel>
                          <IonInput name="email" value={ formDataTwo.email || '' } onIonChange={(e: any)=> handleChangeTwo(e)} slot="end"></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel>
                          Code
                        </IonLabel>
                        <IonInput name="code" value={ formDataTwo.code || '' } onIonChange={(e: any)=> handleChangeTwo(e)} slot="end"></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonButton type="submit" slot="end" size="default" disabled={ !(formDataTwo.code && formDataTwo.email) }>
                          Submit
                        </IonButton>
                      </IonItem>
                    </form>
                </IonCardContent>
                
              </IonCard>

            </Fragment>
          }

          {
            step === 1 && <Fragment>

              <IonCard>
                
                <IonCardContent>
                <form onSubmit={(e: any) => handleUpdate(e)}>
                  <IonItem>
                    <IonLabel>
                      New password
                    </IonLabel>
                    <IonInput value={ formDataTwo.password || '' } name="password" slot="end" onIonChange={(e: any)=> handleChangeTwo(e)}></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      Confirm password
                    </IonLabel>
                    <IonInput value={ formDataTwo.passwordConfirmation || '' } name="passwordConfirmation" slot="end" onIonChange={(e: any)=> handleChangeTwo(e)}></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonButton type="submit" slot="end" size="default" disabled={ !(formDataTwo.email && formDataTwo.password && formDataTwo.passwordConfirmation) }>
                      Submit
                    </IonButton>
                  </IonItem>
                </form>
                </IonCardContent>
                
              </IonCard>

            </Fragment>
          }
          

          
          
      </IonList>
        
      </IonContent>

      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, { setForgotCredentials, updateCredentials, preRecovery })(withRouter(RecoverPassword));
