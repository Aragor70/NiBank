
import { IonAvatar, IonCard, IonCardContent, IonIcon, IonItem, IonText } from '@ionic/react';
import { alert, star } from 'ionicons/icons';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


const Approval: React.FC<any> = ({ auth, history }) => {


  return (
    <Fragment>
      <IonCard style={{ boxShadow: 'none' }} className="no-borders">
        <IonCardContent style={{ paddingLeft: '0', paddingRight: '0', paddingBottom: '0' }}>
        <IonItem lines="none" className="ion-items-center" style={{ border: '2px solid #3880ff', fontWeight: 'bold' }} onClick={() => history.push('/account_approvement')}>
            <IonAvatar slot="start" className="no-margin vertical-center" style={{ alignItems: 'center' }}>
              <IonIcon color="primary" size="large" icon={star}></IonIcon>
            </IonAvatar>
            <IonText color="primary" className="ion-items-center" >Upgrade the account to Approved</IonText>
        </IonItem>
        </IonCardContent>
      </IonCard>
    </Fragment>
  );
};
const mapStateToProps = (state: any) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { })(withRouter(Approval));
