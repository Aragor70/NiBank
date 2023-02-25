
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonText } from '@ionic/react';
import { alert, alertCircleOutline, close, home, informationCircleOutline } from 'ionicons/icons';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Balance from '../components/Balance';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import FooterLoggedOut from '../components/footer/FooterLoggedOut';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import { logout } from '../store/actions/auth';

const PageNotFound: React.FC<RouteComponentProps | any> = ({ history, logout, isAuthenticated }) => {


    
  const subTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }, 
    {
      text: "404 page not found", path: '/', icon: close, 
    }
  ]

  return (
        <IonPage>
            <PageHeader />

            <IonContent fullscreen>

            <PageSubTitle subTitles={subTitles} />

            <IonItem>
                
                <IonTitle className="ion-text-center">
                    <IonIcon size="large" color="secondary" icon={alertCircleOutline}></IonIcon>
                </IonTitle>
            </IonItem>
            <IonItem>
                
                <IonTitle className="ion-text-center">
                    Page not found
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
