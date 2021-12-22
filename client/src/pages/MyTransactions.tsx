
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonBadge } from '@ionic/react';
import { checkmark, home, informationCircleOutline } from 'ionicons/icons';
import moment from 'moment';
import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import CreateTransfer from '../components/form/CreateTransfer';
import NotFound from '../components/NotFound';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import MyTsxListElement from '../components/tsx/MyTsxListElement';
import { clearTsxs, getBalance } from '../store/actions/tsx';
import getMonthlyArry from '../utils/getMonthlyArry';

const Transactions: React.FC<any> = ({ account }) => {

  useEffect(() => {
    getBalance()

    return () => {
      console.log('clearr tsxs')
      clearTsxs()
    }
  }, [])

  
  const subTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }, 
    {
      text: "My transactions", path: '/my_transactions', icon: '', 
    }
  ]
  
  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitles={subTitles} />
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                Recent transactions

            </IonTitle>
        </IonListHeader>

        <IonCard>
            <IonCardContent>
            <IonList>
            {
              account?.tsxs?.length > 0 ? Object.values(getMonthlyArry(account?.tsxs, 'DD-MM-YYYY')).map((elem: any, index: number) => <Fragment key={index}><IonList className="no-padding"><IonListHeader className="no-padding ion-items-center">{moment(elem[0].created_on).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY') ? "Today" : moment(elem[0].created_on).format('DD-MM-YYYY')}</IonListHeader>{elem.map((element: any, index: any) => <MyTsxListElement key={element?.tsx_id} tsx={element} index={index} />)}</IonList></Fragment> ) :
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
  account: state.account
})
export default connect(mapStateToProps, {  })(withRouter(Transactions));
