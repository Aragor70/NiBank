
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonText, IonGrid, IonRow, IonCol, IonBadge, IonRouterLink, IonAvatar, IonSlides, IonSlide, IonLabel } from '@ionic/react';
import { add, addCircle, addCircleOutline, alert, businessOutline, card, informationCircleOutline, person, pinOutline } from 'ionicons/icons';
import moment from 'moment';
import { Fragment, useEffect, useRef, useState } from 'react';
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
import Approval from '../components/Approval';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';

const Home: React.FC<RouteComponentProps | any> = ({ history, logout, account, project, auth, tsx }) => {

  const slides: any = useRef(null)

  const getCountryCode = (str: string) => {

    return Object.keys(ISO_COUNTRY_CODES).filter(function(key) {return ISO_COUNTRY_CODES[key]?.toLowerCase() === str?.toLowerCase()})[0];
    
  }
  const [extendTsx, setExtendTsx] = useState(0)

  const [selectWalletView, setSelectWalletView] = useState(0)
  
  const handleWalletChange = async (id: number) => {

    if (slides.current) {

      const swiper = await slides.current.getSwiper();
      
      swiper.slideTo(id)

    }

  }

  /* console.log(await slides.current.getActiveIndex()) */

  const handleWalletSwipe = async () => {

    const value = await slides.current.getActiveIndex()
    setSelectWalletView(value)
  }

  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      <PageSubTitle subTitle={"Home"} />
        

      
      <IonList>
        <IonCard style={{ boxShadow: 'none' }}>
        <IonCardHeader color="primary" style={{ borderRadius: '7.5px', minHeight: '120px', lineHeight: '2' }}>
          
          <IonTitle style={{ fontSize: '22px' }}>
            <span>Welcome { (auth?.user?.first_name && auth?.user?.last_name) ? (auth?.user?.first_name + ' ' + auth?.user?.last_name) : auth?.user?.name || "N/A"}</span>
            
          </IonTitle>
          <IonTitle style={{ fontSize: '16px' }}>
            <span>Here is a quick look at your accounts.</span>
          </IonTitle>
        </IonCardHeader>

        </IonCard>
        
        {
          auth?.user?.approved === false && <Fragment>
            <Approval />
          </Fragment>
        }
        <IonSlides ref={slides} onIonSlideDidChange={() => handleWalletSwipe()}>

            {
              auth?.user?.approved ? account.wallets.length ? <Fragment> {account.wallets.map((element: any, index: number) => <Fragment key={index}>
                

                <IonSlide>


                  <IonCard style={{ width: '100%'}}>
                    <IonCardHeader>
                    <IonItem style={{ padding: '10px 0'}}>
                        
                      <IonCol>
                        <IonText className="ion-items-center" style={{ fontSize: '18px' }}>
                          Pay account
                        </IonText>
                      </IonCol>
                      <IonCol>
                        
                            <IonText style={{ fontSize: '24px', textAlign: 'center' }} className="ion-items-center">
                                { element ? element.balance : 'N/A' } { element ? element.currency : 'N/A' }
                            </IonText>
                        
                      </IonCol>
                        
                      
                    </IonItem>
                    </IonCardHeader>
                    <IonCardContent>
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
                            <IonItem lines="none" style={{ border: '1px solid #000' }}>
                            
                                  <IonText className="ion-items-center" style={{ color: '#000', fontWeight: 'bold', textAlign: 'center' }}>
                                      { element ? element.in : 'N/A' } { element ? element.currency : 'N/A' }
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
                            
                              <IonText className="ion-items-center" style={{ color: '#000', fontWeight: 'bold', textAlign: 'center' }}>
                                  { element ? '-' + element.out : 'N/A' } { element ? element.currency : 'N/A' }
                              </IonText>

                            </IonItem>
                          </IonCol>
                        </IonRow>

                      </IonGrid>
                    </IonCardContent>
                  </IonCard>

                </IonSlide>

                
              </Fragment>)} 
              
              <IonSlide>


<IonCard style={{ width: '100%'}}>
  <IonCardHeader>
  <IonItem style={{ padding: '10px 0'}} onClick={() => history.push('/settings')}>
      
    <IonCol>
      <IonText className="ion-items-center" style={{ fontSize: '18px' }}>
        Create a new wallet
      </IonText>
      
          <IonText style={{ fontSize: '24px' }} className="ion-items-center">
              <IonIcon icon={addCircleOutline}></IonIcon>
          </IonText>
      
    </IonCol>
      
    
  </IonItem>
  </IonCardHeader>
  
</IonCard>

</IonSlide> </Fragment> : <Fragment>
                

                <IonSlide>


                  <IonCard style={{ width: '100%'}}>
                    <IonCardHeader>
                    <IonItem style={{ padding: '10px 0'}} onClick={() => history.push('/settings')}>
                        
                      <IonCol>
                        <IonText className="ion-items-center" style={{ fontSize: '18px' }}>
                          Create a new wallet
                        </IonText>
                        
                            <IonText style={{ fontSize: '24px' }} className="ion-items-center">
                                <IonIcon icon={addCircleOutline}></IonIcon>
                            </IonText>
                        
                      </IonCol>
                        
                      
                    </IonItem>
                    </IonCardHeader>
                    
                  </IonCard>

                </IonSlide>

                
              </Fragment>
            : false}


          </IonSlides>
          {
            auth?.user?.approved ? <Fragment>
                <IonList className="ion-items-center" style={{ flexDirection: 'row' }} >
                  {
                    account?.wallets?.length ? <Fragment>{account?.wallets?.map((element: any, index: number) => <IonItem key={index}><div className="ion-items-center" onClick={() => handleWalletChange(index)}><IonIcon color={selectWalletView === index ? 'primary' : ''} icon={card} size="small"></IonIcon><IonText color={selectWalletView === index ? 'primary' : ''}>{element.currency}</IonText></div></IonItem>)}<IonItem><div className="ion-items-center" onClick={() => handleWalletChange(account?.wallets?.length || 0)}><IonIcon color={selectWalletView === (account?.wallets?.length || 0) ? 'primary' : ''} icon={addCircle} size="small"></IonIcon><IonText color={selectWalletView === (account?.wallets?.length || 0) ? 'primary' : ''}>NEW</IonText></div></IonItem></Fragment> : <Fragment><IonItem><div className="ion-items-center"><IonIcon color="primary" icon={addCircle} size="small"></IonIcon><IonText color="primary">NEW</IonText></div></IonItem></Fragment>
                  }
                </IonList>
            </Fragment> : false
          }
            
          
          </IonList>

          {
            auth.user.approved && <Fragment>

                
              <IonList>
                <IonCard>
                  <IonCardHeader>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonText style={{ textAlign: 'center', fontWeight: 'bold' }}>
                          Set up a new order
                        </IonText>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                  </IonCardHeader>
                  <IonCardContent>
                  <IonList>
                    <IonItem >
                      <IonIcon icon={add} slot="start" onClick={() => history.push('/new_transaction')}></IonIcon>
                      <IonRouterLink onClick={() => history.push('/new_transaction')}>
                        New transaction
                      </IonRouterLink>
                    </IonItem>
                    
                  
                    <IonItem>
                      <IonIcon icon={add} slot="start" onClick={() => history.push('/new_project')}></IonIcon>
                      <IonRouterLink onClick={() => history.push('/new_project')}>
                        New project
                      </IonRouterLink>
                    </IonItem>
                  </IonList>
                  </IonCardContent>
                </IonCard>
              </IonList>



            </Fragment>
          }

      <IonList>
        <IonCard>
        <IonCardHeader>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonText style={{ textAlign: 'center', fontWeight: 'bold' }}>
                   Recent transactions
                </IonText>
              </IonCol>
              <IonCol style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}>
                <IonRouterLink onClick={() => history.push('/my_transactions')}>
                  Show more
                </IonRouterLink>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardHeader>
        <IonCardContent className="no-padding">
        <IonGrid>
        <IonCard style={{ boxShadow: 'none' }}>
            <IonCardContent className="no-padding">
            <IonList>
              {
                account?.loading ? <Loader /> : account?.tsxs?.length > 0 ? Object.values(getMonthlyArry(account?.tsxs.slice(0, 3), 'DD-MM-YYYY')).map((elem: any, index: number) => <Fragment key={index}><IonList className="no-padding"><IonListHeader className="no-padding ion-items-center">{moment(elem[0].created_on).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY') ? "Today" : moment(elem[0].created_on).format('DD-MM-YYYY')}</IonListHeader>{elem.map((element: any, index: any) => <MyTsxListElement key={element?.tsx_id} tsx={element} index={index} extendTsx={extendTsx} setExtendTsx={setExtendTsx} />)}</IonList></Fragment> ) : 
                <NotFound message="No available transactions." />
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
        </IonCardContent>
        </IonCard>
      </IonList>


      <IonList>
        <IonCard>
        <IonCardHeader>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonText style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  Recent Investments
                </IonText>
              </IonCol>
              <IonCol style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}>
                <IonRouterLink onClick={() => history.push('/my_investments')}>
                  Show more
                </IonRouterLink>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardHeader>
        <IonCardContent className="no-padding">
        <IonGrid>
        <IonCard style={{ boxShadow: 'none' }}>
            <IonCardContent className="no-padding">
            <IonList>
          {
            /* project.projects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem.user_id === auth?.user?.user_id)[0]) */account?.loading ? <Loader /> : account?.investments?.length > 0 ? account?.investments?.slice(0, 3).map((element: any) => <Fragment key={element.project_id}>
              
              <IonRow>
                <IonItem>
                <IonCol style={{ fontWeight: 'bold', display: 'flex', alignItems: 'left', justifyContent: 'center', flexDirection: 'column', lineHeight: '2' }}>
                  <IonText>{element.projectname}</IonText>
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
                
                  <NotFound message="No available investments." />

              </Fragment>
          }
          </IonList>
          </IonCardContent>
        </IonCard>
        </IonGrid>
        </IonCardContent>
        </IonCard>
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
