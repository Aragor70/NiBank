
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonGrid, IonCol, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonRow } from '@ionic/react';
import { connect } from 'react-redux';
import { alert, arrowForward, businessOutline, checkmark, home, people } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateProject from '../components/form/CreateProject';
import CreateTransfer from '../components/form/CreateTransfer';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import { clearProjects, getProjects } from '../store/actions/project';
import GlobalProjectListElement from '../components/project/GlobalProjectListElement';
import Approval from '../components/Approval';
import NotFound from '../components/NotFound';

const ChooseTransaction: React.FC<any> = ({ location, project, getProjects, auth }) => {

  const [ selectView, setSelectView ] = useState<any>({
    investment: 0,
    transfer: 0
  });

  const { investment, transfer } = selectView;


  useEffect(() => {

    getProjects(auth.user)

    return () => {
      
      setSelectView({
        investment: 0,
        transfer: 0
      })
    }
    
  }, [location.pathname])


  const investTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }, 
    {
      text: "Choose transaction", path: '/new_transaction', icon: '', 
    
      action: () => setSelectView({
        investment: 0,
        transfer: 0
      })
    },
    {
      text: "Investments", path: '/new_transaction', icon: '', 
    
      action: () => setSelectView({
        investment: 1,
        transfer: 0
      })
    }
  ]

  const transferTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }, 
    {
      text: "Choose transaction", path: '/new_transaction', icon: '', 
    
      action: () => setSelectView({
        investment: 0,
        transfer: 0
      })
    },
    {
      text: "New transfer", path: '/new_transaction', icon: '', 
    
      action: () => setSelectView({
        investment: 0,
        transfer: 1
      })
    }
  ]
  const subTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }, 
    {
      text: "Choose transaction", path: '/new_transaction', icon: '', 
    
      action: () => setSelectView({
        investment: 0,
        transfer: 0
      })
    }
  ]
  
  
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
                    <PageSubTitle subTitles={investTitles} />

                    <IonList>
                      <IonListHeader>
                        <IonTitle style={{ textAlign: 'center' }}>
                            Currently open projects

                        </IonTitle>
                      </IonListHeader>
                      <IonCard>
                        <IonCardContent>
                          {
                            project.openProjects.length ? project.openProjects.map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />) : <NotFound message="No available projects." />
                          }
                        </IonCardContent>
                      </IonCard>
                    </IonList>

                  </Fragment>
                }
                
              </Fragment>

              
            }
            {
              !!transfer && <Fragment>
                <PageSubTitle subTitles={transferTitles} />
                <IonList>
                  <IonListHeader>
                    <IonTitle style={{ textAlign: 'center' }}>
                        New transfer

                    </IonTitle>
                  </IonListHeader>
                  <IonCard>
                    <IonCardContent>
                      <CreateTransfer />
                    </IonCardContent>
                  </IonCard>
                </IonList>
              </Fragment>
            }
            
          </Fragment> : <Fragment>

            <PageSubTitle subTitles={subTitles} />
            <IonList>
              <IonListHeader>
                <IonTitle style={{ textAlign: 'center' }}>
                    New transaction

                </IonTitle>
              </IonListHeader>
              {
                auth?.user?.approved ? <Fragment>
                  
                  
                  <IonCard>
                    <IonCardContent>
                      <IonItem onClick={()=> setSelectView({ investment: 1 })}>

                      <IonIcon icon={businessOutline} slot="start" color="primary"></IonIcon>
                      <IonText>
                        Invest
                      </IonText>

                      </IonItem>
                      <IonItem onClick={()=> setSelectView({ transfer: 1 })}>

                      <IonIcon icon={people} slot="start" ></IonIcon>
                      <IonText>
                        Transfer to the recipient
                      </IonText>

                      </IonItem>
                    </IonCardContent>
                  </IonCard>
                    
                  
                </Fragment> : <Fragment>
                  <Approval />
                </Fragment>
              }
              
                
              
            </IonList>
          </Fragment>
        }
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
  project: state.project,
  auth: state.auth
})
export default connect(mapStateToProps, { getProjects })(withRouter(ChooseTransaction));
