
import { IonAvatar, IonBadge, IonButton, IonButtons, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonText } from '@ionic/react';
import { addCircleOutline, addOutline, businessOutline, people, trendingDown, trendingUp } from 'ionicons/icons';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


const MyTsxListElement: React.FC<any> = ({ tsx, auth, extendTsx, setExtendTsx, index, history, users }) => {

  const [isUp, setIsUp] = useState(false);

  const [detailsOn, setDetailsOn] = useState(false)

  useEffect(() => {

    if (tsx?.from_id === auth?.user?.user_id) {
      setIsUp(false)
    } else {
      setIsUp(true)
    }

    return () => {
      setIsUp(false)
    }
  }, [auth.user])


  const [ from, setFrom ] = useState<any>(null)

  useEffect(() => {

    const value: any[] = users?.users?.filter((element: any) => element.user_id === tsx?.from_id) || []
    console.log(value[0])
    setFrom(value[0])

  }, [users?.users, users?.loading])


  return (
    <Fragment>
      {
        tsx.to_project_id !== null ? <Fragment>
          <IonItem style={{ position: 'relative', padding: '10px 0' }} onClick={()=> history.push(`/transactions/${tsx.tsx_id}`)}>
            
            <IonAvatar slot="start" style={{ position: 'relative' }}>
              <IonIcon icon={tsx.to_project_id !== null ? businessOutline : people} size="small" style={{ position: 'absolute', top: '-9px', right: 0, zIndex: 10 }}></IonIcon>
              <IonIcon size="large" color="secondary" icon={isUp ? trendingUp : trendingDown}></IonIcon>
            </IonAvatar>
              <div style={{ textAlign: 'left' }} >
              <IonLabel style={{ fontSize: '15px', marginBottom: '2px' }}>
                {moment(tsx.created_on).format('DD-MM-YYYY')}
              </IonLabel>
              <IonText style={{ fontWeight: 'normal', fontSize: '16px', textAlign: 'left' }}>
                {tsx.projectname}
              </IonText>
              </div>
              
            
            <IonBadge slot="end" color={isUp ? "success" : "primary"} style={{ width: '90px', textAlign: 'center', lineHeight: '1.6' }} className="ion-text-wrap" onClick={() => setDetailsOn(!detailsOn)}>{isUp ? "+" : "-"}{tsx.amount} {tsx.currency}</IonBadge>
            
          </IonItem>
          
        </Fragment> : (tsx.to_user_id === auth.user.user_id && tsx.from_id === auth.user.user_id) ? <Fragment>

        <IonItem style={{ position: 'relative', padding: '10px 0' }} onClick={()=> history.push(`/transactions/${tsx.tsx_id}`)}>
            
            <IonAvatar slot="start" style={{ position: 'relative' }}>
              <IonIcon icon={tsx.to_project_id !== null ? businessOutline : people} size="small" style={{ position: 'absolute', top: '-9px', right: 0, zIndex: 10 }}></IonIcon>
              <IonIcon size="large" color="secondary" icon={!isUp ? trendingUp : trendingDown}></IonIcon>
            </IonAvatar>
            <div style={{ textAlign: 'left' }}>
              <IonLabel style={{ fontSize: '15px', marginBottom: '2px' }}>
                {moment(tsx.created_on).format('DD-MM-YYYY')}
              </IonLabel>
              <IonText style={{ fontWeight: 'normal', fontSize: '16px', textAlign: 'left'}}>
                {isUp ? from?.user_id === 1 ? from?.first_name : from?.name || "N/A" : tsx.name }
              </IonText>
              </div>
            <IonBadge slot="end" color={!isUp ? "success" : "primary"} style={{ width: '90px', textAlign: 'center', lineHeight: '1.6' }} className="ion-text-wrap" onClick={() => setDetailsOn(!detailsOn)}>{!isUp ? "+" : "-"}{tsx.amount} {tsx.currency}</IonBadge>
            
          </IonItem>
        <IonItem style={{ position: 'relative', padding: '10px 0' }} onClick={()=> history.push(`/transactions/${tsx.tsx_id}`)}>
            
            <IonAvatar slot="start" style={{ position: 'relative' }}>
              <IonIcon icon={tsx.to_project_id !== null ? businessOutline : people} size="small" style={{ position: 'absolute', top: '-9px', right: 0, zIndex: 10 }}></IonIcon>
              <IonIcon size="large" color="secondary" icon={isUp ? trendingUp : trendingDown}></IonIcon>
            </IonAvatar>
            <div style={{ textAlign: 'left' }}>
              <IonLabel style={{ fontSize: '15px', marginBottom: '2px' }}>
                {moment(tsx.created_on).format('DD-MM-YYYY')}
              </IonLabel>
              <IonText style={{ fontWeight: 'normal', fontSize: '16px', textAlign: 'left'}}>
                {isUp ? from?.user_id === 1 ? from?.first_name : from?.name || "N/A" : tsx.name }
              </IonText>
              </div>
            <IonBadge slot="end" color={isUp ? "success" : "primary"} style={{ width: '90px', textAlign: 'center', lineHeight: '1.6' }} className="ion-text-wrap" onClick={() => setDetailsOn(!detailsOn)}>{isUp ? "+" : "-"}{tsx.amount} {tsx.currency}</IonBadge>
            
          </IonItem>
          
        </Fragment> : <Fragment>

          
        <IonItem style={{ position: 'relative', padding: '10px 0' }} onClick={()=> history.push(`/transactions/${tsx.tsx_id}`)}>
            
            <IonAvatar slot="start" style={{ position: 'relative' }}>
              <IonIcon icon={tsx.to_project_id !== null ? businessOutline : people} size="small" style={{ position: 'absolute', top: '-9px', right: 0, zIndex: 10 }}></IonIcon>
              <IonIcon size="large" color="secondary" icon={isUp ? trendingUp : trendingDown}></IonIcon>
            </IonAvatar>
            <div style={{ textAlign: 'left' }}>
              <IonLabel style={{ fontSize: '15px', marginBottom: '2px' }}>
                {moment(tsx.created_on).format('DD-MM-YYYY')}
              </IonLabel>
              <IonText style={{ fontWeight: 'normal', fontSize: '16px', textAlign: 'left'}}>
                {isUp ? from?.user_id === 1 ? from?.first_name : from?.name || "N/A" : tsx.name }
              </IonText>
              </div>
            <IonBadge slot="end" color={isUp ? "success" : "primary"} style={{ width: '90px', textAlign: 'center', lineHeight: '1.6' }} className="ion-text-wrap" onClick={() => setDetailsOn(!detailsOn)}>{isUp ? "+" : "-"}{tsx.amount} {tsx.currency}</IonBadge>
            
          </IonItem>

        </Fragment>
      }

      
    </Fragment>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth,
  users: state.users
})
export default connect(mapStateToProps, {})(withRouter(MyTsxListElement));
