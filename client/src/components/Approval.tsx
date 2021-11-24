
import { IonIcon, IonItem, IonText } from '@ionic/react';
import { alert } from 'ionicons/icons';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


const Approval: React.FC<any> = ({ auth, history }) => {


  return (
    <Fragment>
        <IonItem color="danger" style={{ padding: '7.5px 15%'}} onClick={() => history.push('/account_approvement')}>
            <IonIcon icon={alert} slot="start"></IonIcon>
            <IonText className="ion-items-center">Approve your account</IonText>
        </IonItem>
    </Fragment>
  );
};
const mapStateToProps = (state: any) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { })(withRouter(Approval));
