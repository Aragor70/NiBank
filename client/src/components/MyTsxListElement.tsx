
import { IonAvatar, IonIcon, IonItem, IonText } from '@ionic/react';
import { addCircleOutline, addOutline, businessOutline, trendingDown, trendingUp } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';


const MyTsxListElement: React.FC<any> = ({ tsx, auth }) => {

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
      <IonItem>
        <IonAvatar slot="start">
          <IonIcon size="large" color="secondary" icon={tsx.to_project_id ? businessOutline : isUp ? trendingUp : trendingDown}></IonIcon>
        </IonAvatar>
        <IonText>
          {tsx.tsx_id}. {tsx.amount}
        </IonText>
      </IonItem>
    </Fragment>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, {})(MyTsxListElement);
