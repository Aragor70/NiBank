
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonGrid, IonCol, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonRow } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateProject from '../components/form/CreateProject';
import CreateTransfer from '../components/form/CreateTransfer';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';

const ChooseTransaction: React.FC<any> = ({ location }) => {

  const [ selectView, setSelectView ] = useState<any>({
    investment: 0,
    transfer: 0
  });

  const { investment, transfer } = selectView;

  useEffect(() => {

    return () => {
      setSelectView({
        investment: 0,
        transfer: 0
      })
    }
    
  }, [location.pathname])

  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
        

        {
          investment || transfer ? <Fragment>

            {
              !!investment &&
              
              <Fragment>
                {
                  investment === 1 && <Fragment>
                    <PageSubTitle subTitle={"Home > Choose transaction > Investments"} />
                    <IonList>
                      <IonListHeader>
                        <IonTitle style={{ textAlign: 'center' }}>
                            List of open investments

                        </IonTitle>
                      </IonListHeader>

                      <IonItem>
                        <div className="ion-items-center">
                          <IonButton onClick={()=> setSelectView({ transfer: 0, investment: 2 })}>Create a new project</IonButton>
                        </div>
                      </IonItem>
                    </IonList>
                  </Fragment>
                }
                {
                  investment === 2 && <Fragment>
                    <PageSubTitle subTitle={"Home > Choose transaction > Investments > New project"} />
                    <IonList>
                      <IonListHeader>
                        <IonTitle style={{ textAlign: 'center' }}>
                            New investment project
                        </IonTitle>
                      </IonListHeader>

                      <CreateProject />
                    </IonList>
                  </Fragment>
                }
              </Fragment>

              
            }
            {
              !!transfer && <Fragment>
                <PageSubTitle subTitle={"Home > Choose transaction > New transfer"} />
                <IonList>
                  <IonListHeader>
                    <IonTitle style={{ textAlign: 'center' }}>
                        New transfer

                    </IonTitle>
                  </IonListHeader>
                  
                  <CreateTransfer />
                  
                </IonList>
              </Fragment>
            }
            
          </Fragment> : <Fragment>

            <IonList>
              <IonListHeader>
                <IonTitle style={{ textAlign: 'center' }}>
                    Choose transaction

                </IonTitle>
              </IonListHeader>
              <IonGrid>
                <IonRow style={{ columnGap: '15px' }}>
                    <IonCol style={{ border: '1px solid #121212', borderRadius: '7.5px' }} onClick={()=> setSelectView({ transfer: 0, investment: 1 })}>
                        <br/>
                        <br/>
                        <IonText className="ion-items-center">
                            Investment
                        </IonText>
                        <br/>
                        <br/>
                    </IonCol>
                    <IonCol style={{ border: '1px solid #121212', borderRadius: '7.5px' }} onClick={()=> setSelectView({ investment: 0, transfer: 1 })}>
                        <br/>
                        <br/>
                        <IonText className="ion-items-center">
                            Transfer
                        </IonText>
                        <br/>
                        <br/>
                    </IonCol>
                </IonRow>
              </IonGrid>
              
            </IonList>
          </Fragment>
        }
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};

export default withRouter(ChooseTransaction);
