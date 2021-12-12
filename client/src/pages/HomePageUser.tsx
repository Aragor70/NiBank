
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonText, IonGrid, IonRow, IonCol, IonBadge, IonRouterLink, IonAvatar, IonSlides, IonSlide, IonLabel, IonButtons, IonImg } from '@ionic/react';
import { add, addCircle, addCircleOutline, alert, businessOutline, card, cardOutline, informationCircleOutline, person, pinOutline, returnDownBack, returnDownForward, returnUpForward } from 'ionicons/icons';
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

    return Object.keys(ISO_COUNTRY_CODES).filter(function(key) {return ISO_COUNTRY_CODES[key]?.toLowerCase()?.includes(str?.toLowerCase())})[0];
    
  }
  const [extendTsx, setExtendTsx] = useState(0)

  const [selectWalletView, setSelectWalletView] = useState(0)
  
  const handleWalletChange = async (id: number) => {

    if (slides.current) {

      const swiper = await slides.current.getSwiper();
      
      swiper.slideTo(id)

    }

  }  
  
  const prevSlide = async () => {

    if (slides.current) {

      const swiper = await slides.current.getSwiper();
      
      swiper.slidePrev()

    }

  }
  const nextSlide = async () => {

    if (slides.current) {

      const swiper = await slides.current.getSwiper();
      
      swiper.slideNext()

    }

  }


  const handleWalletSwipe = async () => {

    const value = await slides.current.getActiveIndex()
    setSelectWalletView(value)
  }

  
    const handleDefaultSrc = (e: any) => {
        e.target.src = 'https://www.investopedia.com/thmb/FKP-u7NEKNODSvAkMo-9WUz0E_c=/2121x1193/smart/filters:no_upscale()/GettyImages-1169053915-76068125fc394f9691db9edaf7c76baf.jpg'
    }

  const walletOptions = {
    initialSlide: 0,
    speed: 400,
    centeredSlides: true,
  }

  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      <PageSubTitle subTitle={"Home"} />
        

      
      <IonList>
        <IonCard style={{ boxShadow: 'none' }} className="no-borders">
        <IonCardHeader color="primary" style={{ borderRadius: '7.5px', minHeight: '120px', lineHeight: '2' }}>
          
          <IonTitle style={{ fontSize: '22px' }}>
            Welcome { (auth?.user?.first_name && auth?.user?.last_name) ? (auth?.user?.first_name + ' ' + auth?.user?.last_name) : auth?.user?.name || "N/A"}
            
          </IonTitle>
          <IonTitle style={{ fontSize: '16px' }}>
            <IonText>Here is a quick look at your accounts.</IonText>
          </IonTitle>
        </IonCardHeader>

        </IonCard>
        
        {
          auth?.user?.approved === false && <Fragment>
            <Approval />
          </Fragment>
        }
        <section style={{ position: 'relative' }}>

          {
            auth?.user?.approved ? account?.wallets?.length ? 

              <IonSlides pager={false} options={walletOptions} ref={slides} onIonSlideDidChange={() => handleWalletSwipe()}>
                
                
                {account?.wallets?.map((element: any, index: number) => <Fragment key={index}>
                    
                    <IonSlide>


                      <IonCard style={{ width: '100%'}}>
                        <IonCardHeader>
                          <IonGrid style={{ padding: '0 10px'}}>
                            <IonItem style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                
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
                        </IonGrid>
                        </IonCardHeader>
                        <IonCardContent>
                          <IonGrid>
                            <IonRow>    
                              <IonCol>
                                <IonItem >
                                  <IonText className="ion-items-center" color='dark' style={{ fontWeight: 'bold' }}>
                                      In
                                  </IonText>
                                </IonItem>
                              </IonCol>
                              <IonCol>
                                <IonItem >
                                
                                      <IonText className="ion-items-center" color='dark' style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                          { element ? element.in : 'N/A' } { element ? element.currency : 'N/A' }
                                      </IonText>

                                </IonItem>
                              </IonCol>
                            </IonRow>

                            
                            <IonRow>
                              <IonCol>
                                <IonItem >
                                  <IonText className="ion-items-center" color='dark' style={{  fontWeight: 'bold' }}>
                                      Out
                                  </IonText>
                                </IonItem>
                              </IonCol>
                              <IonCol>
                                <IonItem >
                                
                                  <IonText className="ion-items-center" color='dark' style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                      { element ? element.out > 0 ? '-' + element.out : element.out : 'N/A' } { element ? element.currency : 'N/A' }
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

                  </IonSlide>

              </IonSlides> : 


                  <IonCard>
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

              : false
          }

          {
            selectWalletView > 0 && <IonIcon onClick={() => prevSlide()} icon={returnDownBack} size="large" color="dark" style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 10 }}></IonIcon>
          }
          {
            selectWalletView < account?.wallets?.length && <IonIcon onClick={() => nextSlide()} icon={returnDownForward} size="large" color="dark" style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 10 }}></IonIcon>
          }
          </section>
              {
                auth?.user?.approved ? <Fragment>

                <IonCard>
                          
                    <IonCardContent>

                      <IonList className="ion-items-center" style={{ flexDirection: 'row' }} >
                        {
                          account?.wallets?.length ? <Fragment>{account?.wallets?.map((element: any, index: number) => <IonItem key={index}><div className="ion-items-center" onClick={() => handleWalletChange(index)}><IonIcon color={selectWalletView === index ? 'primary' : ''} icon={card} size="small"></IonIcon><IonText color={selectWalletView === index ? 'primary' : ''}>{element.currency}</IonText></div></IonItem>)}<IonItem><div className="ion-items-center" onClick={() => handleWalletChange(account?.wallets?.length || 0)}><IonIcon color={selectWalletView === (account?.wallets?.length || 0) ? 'primary' : ''} icon={addCircle} size="small"></IonIcon><IonText color={selectWalletView === (account?.wallets?.length || 0) ? 'primary' : ''}>NEW</IonText></div></IonItem></Fragment> : <Fragment><IonItem><div className="ion-items-center"><IonIcon color="primary" icon={addCircle} size="small"></IonIcon><IonText color="primary">NEW</IonText></div></IonItem></Fragment>
                        }
                      </IonList>

                    </IonCardContent>
                </IonCard>
            
                </Fragment> : false
              }
          
          </IonList>

          {
            auth?.user?.approved && <Fragment>

                
              <IonList>
                <IonCard>
                  {/* <IonCardHeader>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonText style={{ textAlign: 'center', fontWeight: 'bold' }}>
                          Where do you want to invest today?
                        </IonText>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                  </IonCardHeader> */}
                  <IonCardContent>

                    <IonGrid>
                      <IonRow>
                        <IonCol>
                          <IonItem onClick={() => history.push('/new_transaction')}>
                            <IonAvatar style={{ postion: 'relative' }} slot="start">
                              <IonIcon style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 10 }} icon={add}></IonIcon>
                              <IonIcon size="large" icon={cardOutline}></IonIcon>
                            </IonAvatar>
                            <IonText>Transfer</IonText>
                          </IonItem>
                        </IonCol>
                        <IonCol>
                          <IonItem onClick={() => history.push('/new_project')}>
                            <IonAvatar style={{ postion: 'relative' }} slot="start">
                              <IonIcon style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 10 }} icon={add}></IonIcon>
                              <IonIcon size="large" icon={businessOutline}></IonIcon>
                            </IonAvatar>
                            <IonText>Project</IonText>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonGrid>



                  {/* <IonList>
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
                  </IonList> */}
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
                    element.images ? <IonImg onIonError={(e: any) => handleDefaultSrc(e)} src={element.images[0]} alt="property" /> : <IonImg onIonError={(e: any) => handleDefaultSrc(e)} src="https://www.investopedia.com/thmb/FKP-u7NEKNODSvAkMo-9WUz0E_c=/2121x1193/smart/filters:no_upscale()/GettyImages-1169053915-76068125fc394f9691db9edaf7c76baf.jpg" alt="property" />
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
