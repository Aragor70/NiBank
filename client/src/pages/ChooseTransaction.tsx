
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonGrid, IonCol, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonRow } from '@ionic/react';
import { connect } from 'react-redux';
import { checkmark } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateProject from '../components/form/CreateProject';
import CreateTransfer from '../components/form/CreateTransfer';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import { getProjects } from '../store/actions/project';
import GlobalProjectListElement from '../components/GlobalProjectListElement';

const ChooseTransaction: React.FC<any> = ({ location, project, getProjects }) => {

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

  useEffect(() => {

    getProjects()
    
  }, [])

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
                            Currently open projects

                        </IonTitle>
                      </IonListHeader>
                      {
                        project.openProjects.map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />)
                      }
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
const mapStateToProps = (state: any) => ({
  project: state.project
})
export default connect(mapStateToProps, { getProjects })(withRouter(ChooseTransaction));
