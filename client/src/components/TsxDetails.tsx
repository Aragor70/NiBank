
import { IonAvatar, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonRouterLink, IonRow, IonText, IonTitle } from '@ionic/react';
import { add, addCircleOutline, addOutline, businessOutline, cardOutline, people, trendingDown, trendingUp } from 'ionicons/icons';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateInvestment from './form/CreateInvestment';
import CreateTransfer from './form/CreateTransfer';


const TsxDetails: React.FC<any> = ({ tsx, from, auth, access = 'guest' }) => {

  const [ isOpen, setIsOpen ] = useState(false)
  

  return (
    <Fragment>
      {
        access === 'user' ? <Fragment>
            <IonCard>
                <IonCardHeader>
                    <IonTitle className="no-padding">
                        Transaction
                    </IonTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonList className="no-padding">
                      <IonItem className="no-padding">
                          <IonLabel slot="start">FROM</IonLabel>
                            <IonText className="ion-wrap-text text-to-left">{from?.name || "N/A"} </IonText>
                          </IonItem>
                          <IonItem className="no-padding">
                            <IonText style={{ wordBreak: 'break-all' }}>{from?.public_key || "N/A"}</IonText>

                          </IonItem>

                          <IonItem className="no-padding">
                            <IonLabel slot="start">TO</IonLabel>
                            <IonText className="ion-wrap-text text-to-left">{tsx?.name || tsx?.projectname || "N/A"}</IonText>
                          </IonItem>
                          {
                            tsx?.to_user_id && <Fragment>
                              <IonItem className="no-padding">
                                <IonText style={{ wordBreak: 'break-all' }}>{tsx?.public_key || "N/A"}</IonText>

                              </IonItem>
                            </Fragment>
                          }
                      
                      <IonItem className="no-padding">
                        <IonLabel slot="start">AMOUNT</IonLabel>
                        <IonText className="ion-wrap-text">{tsx?.amount} {tsx?.currency}</IonText>
                      </IonItem>
                      {
                        ((auth?.user?.user_id === tsx?.from_id) || (auth?.user?.user_id === tsx?.to_user_id)) ? <Fragment>
                          <IonItem className="no-padding">
                            <IonLabel slot="start">DESCRIPTION</IonLabel>
                            <IonText className="ion-wrap-text"></IonText>
                          </IonItem>

                          <IonItem className="no-padding ion-wrap-text">
                            <IonText className="ion-wrap-text" style={{ wordBreak: 'break-all' }}>{tsx?.description || "N/A"}</IonText>

                          </IonItem>


                        </Fragment> : false
                      }
                      
                      
                    </IonList>
                </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonTitle className="no-padding">
                  Protection
                </IonTitle>
              </IonCardHeader>
              <IonCardContent>
                
                  <IonItem className="no-padding">
                    <IonLabel slot="start">HASH</IonLabel>
                    <IonText className="ion-wrap-text"></IonText>
                  </IonItem>
                  <IonItem className="no-padding ion-wrap-text">
                    <IonText className="ion-wrap-text" style={{ wordBreak: 'break-all' }}>{tsx?.current_hash || "N/A"}</IonText>

                  </IonItem>
                  <IonItem className="no-padding">
                    <IonLabel slot="start">PREVIOUS HASH</IonLabel>
                    <IonText className="ion-wrap-text"></IonText>
                  </IonItem>
                  <IonItem className="no-padding">
                      <IonText className="ion-wrap-text" style={{ wordBreak: 'break-all' }}>{tsx?.previous_hash || "N/A"}</IonText>
                  
                  </IonItem>
              </IonCardContent>
            </IonCard>
            {
              ((tsx?.from_id === auth?.user?.user_id) && (auth?.user?.approved)) ? <Fragment>
                
                <IonCard>
                  <IonCardContent>
                    <IonItem className="inner-items-active" onClick={() => setIsOpen(!isOpen)}>
                      <IonIcon slot="start" icon={cardOutline}></IonIcon>
                      <IonRouterLink>
                        New transaction
                      </IonRouterLink>
                    </IonItem>
                    
                  </IonCardContent>
                </IonCard>
              </Fragment> : false
            }
            
            {
              (isOpen && auth?.user?.approved) && (tsx?.from_id === auth?.user?.user_id) ? tsx?.to_project_id ? <IonCard><IonCardContent><CreateInvestment prevTsx={tsx} user={auth?.user} /></IonCardContent></IonCard> : <IonCard><IonCardContent><CreateTransfer prevTsx={tsx} user={auth?.user} /></IonCardContent></IonCard> : false
            }
        </Fragment> : <Fragment>
            <IonCard>
                <IonCardHeader>
                    <IonTitle className="no-padding">
                        Transaction
                    </IonTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonList className="no-padding">
                      
                      <IonItem className="no-padding">
                        <IonLabel slot="start">AMOUNT</IonLabel>
                        <IonText className="ion-wrap-text">{tsx.amount} {tsx.currency}</IonText>
                      </IonItem>
                      

                    </IonList>
                </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonTitle className="no-padding">
                  Protection
                </IonTitle>
              </IonCardHeader>
              <IonCardContent>
                
                  <IonItem className="no-padding">
                    <IonLabel slot="start">HASH</IonLabel>
                    <IonText className="ion-wrap-text"></IonText>
                  </IonItem>
                  <IonItem className="no-padding">
                    <IonText style={{ wordBreak: 'break-all' }}>{tsx?.current_hash || "N/A"}</IonText>

                  </IonItem>
                  <IonItem className="no-padding">
                    <IonLabel slot="start">PREVIOUS HASH</IonLabel>
                    <IonText className="ion-wrap-text"></IonText>
                  </IonItem>
                  <IonItem className="no-padding">
                    <IonText style={{ wordBreak: 'break-all' }}>{tsx?.previous_hash || "N/A"}</IonText>

                  </IonItem>
              </IonCardContent>
            </IonCard>
        </Fragment>
      }
    </Fragment>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, {})(withRouter(TsxDetails));
