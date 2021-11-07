
import { IonItem, IonText } from '@ionic/react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


const Balance: React.FC<any> = ({ account }) => {


  return (
    <IonItem>    
        <IonText className="ion-text-wrap" slot='start'>
            Balance
        </IonText>
        <IonText className="ion-items-center">
            { account.balance }
        </IonText>
    </IonItem>
  );
};
const mapStateToProps = (state: any) => ({
  account: state.account
})
export default connect(mapStateToProps, { })(withRouter(Balance));
