
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonText, IonGrid, IonRow, IonCol, IonBadge, IonRouterLink, IonAvatar } from '@ionic/react';
import { add, businessOutline, card, informationCircleOutline, person } from 'ionicons/icons';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Flag from 'react-world-flags';
import Balance from '../components/Balance';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import MyTsxListElement from '../components/tsx/MyTsxListElement';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import { logout } from '../store/actions/auth';
import { ISO_COUNTRY_CODES } from '../utils/constants';
import getMonthlyArry from '../utils/getMonthlyArry';

const Home: React.FC<RouteComponentProps | any> = ({ history, logout, account, project, auth, tsx }) => {


  const getCountryCode = (str: string) => {

    return Object.keys(ISO_COUNTRY_CODES).filter(function(key) {return ISO_COUNTRY_CODES[key]?.toLowerCase() === str?.toLowerCase()})[0];
    
  }
  const [extendTsx, setExtendTsx] = useState(0)

  
  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home"} />
        

      
      <IonList>
        <IonListHeader color="primary" style={{ borderRadius: '7.5px' }}>
          <IonTitle>
            <span>Welcome {auth.user.name}</span>
          </IonTitle>
        </IonListHeader>

            <IonItem style={{ padding: '10px 0'}}>
                
              <IonCol>
                <IonText className="ion-items-center" style={{ fontSize: '18px' }}>
                  Pay account
                </IonText>
              </IonCol>
              <IonCol>
                <IonText style={{ fontSize: '24px' }} className="ion-items-center">
                    { account.balance }
                </IonText>
              </IonCol>
                
              
            </IonItem>
        
        <IonGrid>
          <IonRow>    
            <IonCol>
              <IonItem lines="none" style={{ border: '1px solid #000'}}>
                <IonText className="ion-items-center" style={{ color: '#000', fontWeight: 'bold' }}>
                    In
                </IonText>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem lines="none" style={{ border: '1px solid #000'}}>
                <IonText className="ion-items-center" style={{ color: '#000', fontWeight: 'bold' }}>
                    { account.yieldPA === undefined ? 'N/A' : account.yieldPA }
                </IonText>
              </IonItem>
            </IonCol>
          </IonRow>

          
          <IonRow>
            <IonCol>
              <IonItem lines="none" style={{ border: '1px solid #000'}}>
                <IonText className="ion-items-center" style={{ color: '#000', fontWeight: 'bold' }}>
                    Out
                </IonText>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem lines="none" style={{ border: '1px solid #000'}}>
                <IonText className="ion-items-center" style={{ color: '#000', fontWeight: 'bold' }}>
                { account.totalFunds === undefined ? 'N/A' : account.totalFunds > 0 ? '-' + account.totalFunds : account.totalFunds }
                </IonText>
              </IonItem>
            </IonCol>
          </IonRow>

        </IonGrid>
      </IonList>

      <IonItem>
        <IonGrid>
          <IonRow>
            <IonCol className="ion-items-center">
              <IonItem onClick={() => history.push('/new_transaction')}>
              <IonIcon icon={add} slot="start"></IonIcon>
              <IonRouterLink>
                New transaction
              </IonRouterLink>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem lines="none">
              {/* <IonButton slot="end">
                <IonIcon icon={person} size="small"></IonIcon>
              </IonButton> */}
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
      
      <IonList>
        <IonListHeader>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonText style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  My Transactions
                </IonText>
              </IonCol>
              <IonCol style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}>
                <IonRouterLink onClick={() => history.push('/my_transactions')}>
                  Show more
                </IonRouterLink>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonListHeader>
        <IonGrid>
        <IonCard style={{ boxShadow: 'none' }}>
            <IonCardContent className="no-padding">
            <IonList>
              {
                account?.tsxs?.length > 0 ? Object.values(getMonthlyArry(account?.tsxs.slice(0, 3), 'DD-MM-YYYY')).map((elem: any, index: number) => <Fragment key={index}><IonList className="no-padding"><IonListHeader className="no-padding ion-items-center">{moment(elem[0].created_on).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY') ? "Today" : moment(elem[0].created_on).format('DD-MM-YYYY')}</IonListHeader>{elem.map((element: any, index: any) => <MyTsxListElement key={element?.tsx_id} tsx={element} index={index} extendTsx={extendTsx} setExtendTsx={setExtendTsx} />)}</IonList></Fragment> ) : <IonItem>
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={informationCircleOutline}></IonIcon>
                </IonAvatar>
                <IonText>
                No available transactions.
                </IonText>
                </IonItem>
              }
            {/* {
              account?.tsxs?.length > 0 ? account?.tsxs?.slice(0, 3).map((element: any, index: number) => <MyTsxListElement key={element?.tsx_id || index} tsx={element} index={index} extendTsx={extendTsx} setExtendTsx={setExtendTsx} />) : <IonItem>
              <IonAvatar slot="start">
                  <IonIcon size="large" color="secondary" icon={informationCircleOutline}></IonIcon>
              </IonAvatar>
              <IonText>
              No available transactions.
              </IonText>
              </IonItem>
            } */}
            </IonList>
            </IonCardContent>
        </IonCard>
        </IonGrid>


      </IonList>


      <IonList>
        <IonListHeader>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonText style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  My Investments
                </IonText>
              </IonCol>
              <IonCol style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}>
                <IonRouterLink onClick={() => history.push('/my_investments')}>
                  Show more
                </IonRouterLink>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonListHeader>
        <IonGrid>
        <IonCard style={{ boxShadow: 'none' }}>
            <IonCardContent className="no-padding">
            <IonList>
          {
            /* project.projects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]) */account?.loading ? "loading..." : account?.investments?.length > 0 ? account?.investments?.slice(0, 3).map((element: any) => <Fragment key={element.project_id}>
              
              <IonRow>
                <IonItem>
                <IonCol style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', lineHeight: '2' }}>
                  <IonText>{element.projectname}</IonText>
                  <IonText>Status: {element.status}</IonText>
                  <IonText>Invested: {(element?.listofinvestors?.filter((elem: any) => (elem?.user_id === auth?.user?.user_id) ).map((elem: any) => elem?.amount) || [])?.reduce((a: any, b: any) => a + b, 0 )}</IonText>
                  <IonRouterLink onClick={() => history.push(`/projects/${element.project_id}`)}>Get more</IonRouterLink>
                </IonCol>
                <IonCol style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  {
                    element.images ? <img src={element.images[0]} /> : <img src="https://www.investopedia.com/thmb/FKP-u7NEKNODSvAkMo-9WUz0E_c=/2121x1193/smart/filters:no_upscale()/GettyImages-1169053915-76068125fc394f9691db9edaf7c76baf.jpg" />
                  }
                  
                  <IonBadge color="light" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                    <Flag code={getCountryCode(element.country) || ""} height="20px" />
                  </IonBadge>
                </IonCol>
                </IonItem>

              </IonRow>
              
              </Fragment>) : <Fragment>
                
                  <IonItem>
                  <IonAvatar slot="start">
                      <IonIcon size="large" color="secondary" icon={informationCircleOutline}></IonIcon>
                  </IonAvatar>
                  <IonText>
                  No available investments.
                  </IonText>
                  </IonItem>

              </Fragment>
          }
          </IonList>
          </IonCardContent>
        </IonCard>
        </IonGrid>


      </IonList>

      </IonContent>
      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
  account: state.account,
  project: state.project,
  auth: state.auth,
  tsx: state.tsx
})
export default connect(mapStateToProps, { logout })(withRouter(Home));
