
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon } from '@ionic/react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Balance from '../components/Balance';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import FooterLoggedOut from '../components/footer/FooterLoggedOut';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import { logout } from '../store/actions/auth';

const PageNotFound: React.FC<RouteComponentProps | any> = ({ history, logout, isAuthenticated }) => {
  return (
        <IonPage>
            <PageHeader />
            

            <IonContent fullscreen>

            <PageSubTitle subTitle={"404 Page not found"} />
            <IonItem>
                <IonTitle className="ion-text-center">
                404 Page not found
                </IonTitle>
            </IonItem>
            <IonItem>
                <div className="ion-items-center">
                <IonButton onClick={() => history.push('/')}>Go to dashboard</IonButton>
                </div>
            </IonItem>
            </IonContent>
            {
                isAuthenticated ? <FooterLoggedIn /> : <FooterLoggedOut />
            }

        </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { logout })(withRouter(PageNotFound));
