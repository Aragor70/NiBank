
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonGrid, IonCol, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonRow } from '@ionic/react';
import { connect } from 'react-redux';
import { arrowForward, businessOutline, checkmark, people } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateProject from '../components/form/CreateProject';
import CreateTransfer from '../components/form/CreateTransfer';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import { clearProjects, getProjects } from '../store/actions/project';
import GlobalProjectListElement from '../components/project/GlobalProjectListElement';
import Loading from './Loading';

const ChooseTransaction: React.FC<any> = ({ location, project, getProjects, auth }) => {

  const [ selectView, setSelectView ] = useState<any>({
    investment: 0,
    transfer: 0
  });

  const { investment, transfer } = selectView;


  useEffect(() => {

    getProjects()

    return () => {
      
      clearProjects()
      setSelectView({
        investment: 0,
        transfer: 0
      })
    }
    
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
              <IonItem onClick={()=> setSelectView({ transfer: 0, investment: 1 })}>

                <IonIcon icon={businessOutline} slot="start" color="primary"></IonIcon>
                <IonText>
                  Invest
                </IonText>
                
              </IonItem>
              <IonItem onClick={()=> setSelectView({ investment: 0, transfer: 1 })}>

              <IonIcon icon={people} slot="start" color="primary"></IonIcon>
                <IonText>
                  Transfer
                </IonText>

              </IonItem>
                
              
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
