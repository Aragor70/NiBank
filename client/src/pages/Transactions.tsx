
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider } from '@ionic/react';
import { checkmark, home, information, informationCircleOutline } from 'ionicons/icons';
import moment from 'moment';
import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import GlobalTsxListElement from '../components/tsx/GlobalTsxListElement';
import getMonthlyArry from '../utils/getMonthlyArry';

const Transactions: React.FC<any> = ({ tsx }) => {


  
  const subTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }, 
    {
      text: "Global transactions", path: '/transactions', icon: '', 
    
    }
  ]

  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitles={subTitles} />
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }} className="no-padding">
                Global transactions

            </IonTitle>
        </IonListHeader>

        <IonCard>
            <IonCardContent>
              <IonList>
                {
                  tsx.loading ? <Loader /> : tsx?.tsxs?.length > 0 ? Object.values(getMonthlyArry(tsx?.tsxs, 'DD-MM-YYYY')).map((elem: any, index: number) => <Fragment key={index}><IonList className="no-padding"><IonListHeader className="no-padding ion-items-center">{moment(elem[0].created_on).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY') ? "Today" : moment(elem[0].created_on).format('DD-MM-YYYY')}</IonListHeader>{elem.map((element: any, index: any) => <GlobalTsxListElement key={element?.tsx_id || index} tsx={element} index={index} />)}</IonList></Fragment>) : 
                    <NotFound message="No available transactions." />
                }
              </IonList>
            </IonCardContent>
        </IonCard>
      </IonList>
        
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
  tsx: state.tsx
})
export default connect(mapStateToProps, { })(withRouter(Transactions));
