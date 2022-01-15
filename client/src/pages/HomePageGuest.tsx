
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonCardSubtitle, IonText, IonGrid, IonRow, IonCol, IonLabel, IonButtons, IonImg } from '@ionic/react';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import tsx from '../store/reducers/tsx';
import { connect } from 'react-redux';
import { registerables  } from 'chart.js';
import Chart from 'chart.js/auto';

import { ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title} from 'chart.js' 


import { Fragment, useEffect } from 'react';
import { analytics, bookmarksOutline, bookOutline, businessOutline, card, extensionPuzzleOutline, home, open, people } from 'ionicons/icons';
import Loader from '../components/Loader';
import GlobalProjectListElement from '../components/project/GlobalProjectListElement';



import CountUp from 'react-countup';
import { PROJECTS_PALETTE } from '../utils/constants';

const Home: React.FC <RouteComponentProps | any> = ({ history, tsx, users, project }) => {

  const setArryOfColors = (values: any[]) => {

    const arry: any[] = values.slice()
    
    
    let colors = PROJECTS_PALETTE.map((element: any, index: any) => {return { sortBy: arry[index], ...element}})

    let toReturn: any[] = []

    values.forEach((key: any) => {
        let found = false;
        colors = colors.filter(function(item: any) {
            if(!found && item.sortBy == key) {
                toReturn.push(item);
                found = true;
                return false;
            } else 
                return true;
        })
    })

    /* console.log(toReturn) */
    return toReturn.map((element: any) => element.value)
  }
        
  const options: any = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      xAxes:
        {
          stacked: true,
          display: true,
        }
      ,
      yAxis: {
        display: false,
      }
    }
  };

  const sortedDataset: any[] = [
    { value: project?.underConsiderationProjects?.length || 0, label: 'COMING SOON' },
    { value: project?.openProjects?.length || 0, label: 'ACTIVE' },
    { value: project?.closedProjects?.length || 0, label: 'CLOSED' },
  ]

  const values: any[] = sortedDataset.map((element: any) => element?.value)

  const labels: any[] = sortedDataset.map((element: any) => element?.label)

  const data: any = {
    labels,
    datasets: [
      {
        label: '',
        data: values,
        backgroundColor: setArryOfColors(values),
        borderColor: setArryOfColors(values),
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
      if (!project.loading) {


        
      const myChart: any = new Chart('myChart', { 
        type: 'bar',
        data: data,
        options
      });

      Chart?.register(...registerables);

      Chart?.register(LineController, LineElement, PointElement, LinearScale, Title);

      return () => {
        
        myChart.destroy()
        
      }

      }

    }, [project.openProjects, project.underConsiderationProjects, project.closedProjects, project.projects, project.loading])


    
  const subTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }
  ]

  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitles={subTitles} />



        <IonList>

          <IonCard>

            <IonCardHeader>
              
              <IonListHeader>
                <IonTitle style={{ textAlign: 'center', fontSize: '25px', lineHeight: '1.8', fontWeight: 'bold' }} color="primary">

                  Welcome to <span style={{ color: '#3880ff', fontWeight: 'bold' }}>Ni</span><span style={{ color: '#3dc2ff', fontWeight: 'bold' }}>Vest</span>

                </IonTitle>
                
              </IonListHeader>

              <IonCardTitle style={{ textAlign: 'center', fontSize: '25px', lineHeight: '1.8', fontWeight: 'bold' }}>
                Real Estate Crowdfunding Market Simulator
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <IonItem>
                <div className="ion-items-center">
                  <IonIcon style={{ fontSize: '64px', padding: '7.5px' }} icon={analytics}></IonIcon>
                </div>
              </IonItem>
              <IonItem>
                
                <IonText>
                  Start learning how to invest with virtual money to sharpen your knowledge of how the market works and how to use an online Blockchain investment platform.
                </IonText>
              </IonItem>
            </IonCardContent>
          </IonCard>



        </IonList>
        <IonList>
          
          <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
              Getting started

            </IonTitle>
          </IonListHeader>
          <IonCard>
            <IonCardHeader>
            <IonCardTitle mode="md">
              If you’re not yet an Mobile Investor:

            </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                Follow the instructions to register and activate your Digital Secure Key.
              </IonItem>
              
              <IonToolbar mode="md">
                <IonButton onClick={() => history.push('/register')} type="button" size="small" color="secondary" slot="end">Register {">"}</IonButton>
              </IonToolbar>
              
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
            <IonCardTitle mode="md">
              If you’re already registered for online investing:

            </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                Follow the instructions of the Mobile app by entering your online log on details.

              </IonItem>
              
              <IonToolbar mode="md">
                <IonButton onClick={() => history.push('/logon')} type="button" size="small" color="primary" slot="end">Log on {">"}</IonButton>
              </IonToolbar>
            </IonCardContent>
          </IonCard>

        </IonList>
        <IonList>
          <IonCard>

            <IonCardHeader>
              <IonCardTitle className="ion-text-center">
                NiVest
              </IonCardTitle>
              <IonCardSubtitle className="ion-text-center" style={{ fontSize: '16px' }} mode={"md"}>
              Cross-platform app. Powered by the Web.
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonText>
                  NiVest simulates the real crowdfunding market with Blockchain technology. By creating an account, you join the Internet community.
                </IonText>
              </IonItem>
            </IonCardContent>

          </IonCard>

        </IonList>


        <IonList>
            <IonListHeader>
              <IonTitle style={{ textAlign: 'center' }}>
                Statistics

              </IonTitle>
            </IonListHeader>
          <IonCard>

            <IonCardContent>
              
              <IonList>
              <IonGrid>
                <IonRow>
                  <IonCol className="ion-items-center">
                    <IonIcon size="large" icon={people}></IonIcon>
                    <IonText color='dark'>Investors</IonText>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className="ion-items-center">
                    <IonText style={{ fontSize: '22px' }}><CountUp end={users?.users?.length || 0} duration={1} /></IonText>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className="ion-items-center">
                    <IonIcon size="large" icon={card}></IonIcon>
                    <IonText color='dark'>Transactions</IonText>
                  </IonCol>
                  <IonCol className="ion-items-center">
                    <IonIcon size="large" icon={businessOutline}></IonIcon>
                    <IonText color='dark'>Projects</IonText>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className="ion-items-center">
                    <IonText style={{ fontSize: '22px' }}><CountUp end={tsx?.tsxs?.length || 0} duration={1} /></IonText>
                  </IonCol>
                  <IonCol className="ion-items-center">
                    <IonText style={{ fontSize: '22px' }}><CountUp end={project?.projects?.length || 0} duration={1} /></IonText>
                  </IonCol>
                </IonRow>
              </IonGrid>
              </IonList>
            </IonCardContent>
          
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="ion-items-center" style={{ textAlign: 'center'}}>
                Investment opportunities
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                
                
                  {/* <Bar 
                    data={data}
                    options={options}
                    redraw={false} 
                  /> */}
                  {
                    project?.loading ? <Loader /> : <canvas id="myChart" width="400" height="400"></canvas>
                  }
                  
                  
                
                  <IonGrid>
                    <IonRow>
                      <IonCol className="ion-items-center">
                        <IonText style={{ fontSize: '22px' }}>{project?.underConsiderationProjects?.length === undefined ? 'N/A' : project?.underConsiderationProjects?.length}</IonText>
                      </IonCol>
                      <IonCol className="ion-items-center">
                        <IonText style={{ fontSize: '22px' }}>{project?.openProjects?.length === undefined ? 'N/A' : project?.openProjects?.length}</IonText>
                      </IonCol>
                      <IonCol className="ion-items-center">
                        <IonText style={{ fontSize: '22px' }}>{project?.closedProjects?.length === undefined ? 'N/A' : project?.closedProjects?.length}</IonText>
                      </IonCol>
                    </IonRow>
                  </IonGrid>

              </IonList>

            </IonCardContent>

          </IonCard>
          
          {
            project?.loading ? <Loader /> : project?.projects?.filter((element: any) => element?.images?.length ).length ? <Fragment>

              <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-items-center">
                      Marketplace
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent style={{ rowGap: '15px', }} className="ion-items-center">
                      {
                        project?.projects?.filter((element: any) => element?.images?.length )?.slice(0, 2).map((element: any, index: any) => <GlobalProjectListElement key={element.project_id || index} project={element} index={index} />)
                      }
                      
                  
                  <IonCard>
                    <IonCardContent>
                      <IonItem>
                      <IonIcon size="large" icon={bookOutline} slot="start" color="primary"></IonIcon>
                    
                      <IonText className="ion-items-center no-padding" style={{ fontSize: '16px', fontWeight: 'bold' }} color="primary" onClick={() => history.push('/projects')}>Show more opportunities</IonText>
                      </IonItem>
                    </IonCardContent>
                  </IonCard>
                </IonCardContent>
              </IonCard>
            </Fragment> : false
          }
        </IonList>
        
        {
          users.loading ? <Loader /> : users?.users?.length ? <Fragment>

            <IonList>
            <IonCard>
              
              <IonCardHeader>
                <IonCardTitle className="ion-items-center">
                  Join now
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                
                <IonText style={{ textAlign: 'center', fontSize: '20px' }} className="ion-items-center">Join {users?.users?.length} other investors and make your money work for you.</IonText>
                <IonItem>
                  <div className="ion-items-center" style={{ padding: '15px 0' }} >
                    <IonButton color="primary" style={{ fontWeight: 'bold', fontSize: '20px' }} onClick={() => history.push('/register')}>
                      Sign up
                    </IonButton>
                  </div>
                </IonItem>
              </IonCardContent>
            </IonCard>


            </IonList>
          </Fragment> : false
        }

        <IonList>

          <IonListHeader>
          <IonTitle style={{ textAlign: 'center' }}>
            Why use the app?
          </IonTitle>
          </IonListHeader>
          {/* <IonCard>
            <IonCardHeader>
              Transaction notifications

            </IonCardHeader>
            <IonCardContent>
              Get notified when money goes in or out of your account.

            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              Chat with us

            </IonCardHeader>
            <IonCardContent>
              Chat with us at a time that’s convenient for you with 24/7 support on mobile chat. 


            </IonCardContent>
          </IonCard> */}
          <IonCard>
            <IonCardHeader>
              This app virtualize the market

            </IonCardHeader>
            <IonCardContent>
              You use this application for free of charge without providing any financial information. The funds are strictly simulated.
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              You have no other choice

            </IonCardHeader>
            <IonCardContent>
              The NiVest platform exists only as a mobile app.

            </IonCardContent>
          </IonCard>
        </IonList>
        
      {/* <img src={snowman} width='100%' style={{ position: 'fixed', bottom: 0, zIndex: 1, opacity: '0.6' }} /> */}
      </IonContent>
      
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
  tsx: state.tsx,
  users: state.users,
  project: state.project
})

export default connect(mapStateToProps, {})(withRouter(Home));
