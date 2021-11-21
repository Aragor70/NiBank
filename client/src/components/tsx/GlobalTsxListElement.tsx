
import { IonAvatar, IonBadge, IonIcon, IonItem, IonText } from '@ionic/react';
import { addCircleOutline, addOutline, businessOutline, people, peopleOutline, trendingDown, trendingUp } from 'ionicons/icons';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


const MyTsxListElement: React.FC<any> = ({ tsx, auth, history }) => {

  const [isUp, setIsUp] = useState(false);

  useEffect(() => {

    if (tsx?.from_id === auth?.user?.user_id) {
      setIsUp(false)
    } else {
      setIsUp(true)
    }
  }, [auth.user])



  return (
    <Fragment>
      {
        tsx.to_project_id !== null ? <Fragment>
          <IonItem style={{ position: 'relative' }} onClick={()=> history.push(`/transactions/${tsx.tsx_id}`)}>
            <IonText style={{ position: 'absolute', top: '-3.5px', right: 0, fontSize: '13px' }}>
              {moment(tsx.created_on).format('DD-MM-YYYY')}
            </IonText>
            <IonAvatar slot="start" style={{ position: 'relative' }}>
            <IonIcon icon={tsx.to_project_id !== null ? businessOutline : people} size="large" color="secondary"></IonIcon>
            </IonAvatar>
            <IonText>
              {tsx.projectname}
            </IonText>
            <IonBadge slot="end" >{tsx.amount}</IonBadge>
          </IonItem>
        </Fragment> : <Fragment>

          <IonItem style={{ position: 'relative' }} onClick={()=> history.push(`/transactions/${tsx.tsx_id}`)}>
            <IonText style={{ position: 'absolute', top: '-3.5px', right: 0, fontSize: '13px' }}>
              {moment(tsx.created_on).format('DD-MM-YYYY')}
            </IonText>
            <IonAvatar slot="start" style={{ position: 'relative' }}>
            <IonIcon icon={tsx.to_project_id !== null ? businessOutline : people} size="large" color="secondary"></IonIcon>
            </IonAvatar>
            <IonText>
              {tsx.name} 
              
              
            </IonText>
            <IonBadge slot="end" >{tsx.amount}</IonBadge>
          </IonItem>

        </Fragment>
      }
      
    </Fragment>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, {})(withRouter(MyTsxListElement));
