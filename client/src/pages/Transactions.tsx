
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider } from '@ionic/react';
import { checkmark, information, informationCircleOutline } from 'ionicons/icons';
import moment from 'moment';
import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import GlobalTsxListElement from '../components/tsx/GlobalTsxListElement';
import { getBalance } from '../store/actions/tsx';
import getMonthlyArry from '../utils/getMonthlyArry';

const Transactions: React.FC<any> = ({ tsx }) => {



  return (
    <IonPage>

      <PageHeader />     

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > Global transactions"} />
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                Global transactions

            </IonTitle>
        </IonListHeader>

        <IonCard>
            <IonCardContent>
            <IonList>
            {
              tsx?.tsxs?.length > 0 ? Object.values(getMonthlyArry(tsx?.tsxs, 'DD-MM-YYYY')).map((elem: any, index: number) => <Fragment key={index}><IonList className="no-padding"><IonListHeader className="no-padding ion-items-center">{moment(elem[0].created_on).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY') ? "Today" : moment(elem[0].created_on).format('DD-MM-YYYY')}</IonListHeader>{elem.map((element: any, index: any) => <GlobalTsxListElement key={element?.tsx_id || index} tsx={element} index={index} />)}</IonList></Fragment>) : <IonItem>
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={informationCircleOutline}></IonIcon>
                </IonAvatar>
                <IonText>
                No available transactions.
                </IonText>
                </IonItem>
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
