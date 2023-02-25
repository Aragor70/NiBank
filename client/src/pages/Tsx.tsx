
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonRouterLink, IonItemDivider, IonCardSubtitle } from '@ionic/react';
import { checkmark, home, informationCircleOutline, swapHorizontal } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FooterLoggedIn from '../components/footer/FooterLoggedIn';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import PageHeader from '../components/PageHeader';
import PageSubTitle from '../components/PageSubTitle';
import TsxDetails from '../components/TsxDetails';
import { clearTsx, getTsx } from '../store/actions/tsx';

const Tsx: React.FC<any> = ({ tsx, match, getTsx, clearTsx, auth, users }) => {
    const [ loadingData, setLoadingData ] = useState(false)

    const [tsxData, setTsxData] = useState<any>(null)
    const [isUp, setIsUp] = useState(false);

    
    const [ from, setFrom ] = useState<any>(null)


    const getData = async () => {

        if (match.params.tsx_id) {

            const value = await getTsx(match.params.tsx_id)
            setTsxData(value)
            
            if (value?.from_id) {

                const userValue: any[] = users?.users?.filter((element: any) => element?.user_id === value?.from_id) || []

                setFrom(userValue[0])

            }
            
        }

    }

    
  useEffect(() => {

    if (tsx?.from_id === auth?.user?.user_id) {
      setIsUp(false)
    } else {
      setIsUp(true)
    }

    return () => {
      setIsUp(false)
    }
  }, [auth.user, match.params.tsx_id])


    useEffect(() => {
        
        getData()

        /* return () => {
            console.log('clear')
            clearTsx()
        } */
        
    }, [match?.params?.tsx_id, tsxData?.tsx_id, tsx?.loading])

    
  
  const subTitles: any[] = [
    {
      text: "Home", path: '/', icon: home
    }, 
    {
      text: "Transaction page", path: `/transactions/${tsxData?.tsx_id}`, icon: swapHorizontal, 
    
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
                Transaction # {tsx?.tsx?.tsx_id}

            </IonTitle>
            <IonCardSubtitle>
              History of the transaction
            </IonCardSubtitle>
        </IonListHeader>
        {
            tsx.loading || users.loading ? <Loader /> : tsxData ? <Fragment>
                
                {
                    auth?.user ? ((tsxData.from_id === auth?.user?.user_id) || (tsxData.to_user_id === auth?.user?.user_id)) ? <Fragment>
                        <TsxDetails access='user' tsx={tsxData} from={from} />
                    </Fragment> : <Fragment>
                        <TsxDetails access='guest' tsx={tsxData} from={from} />
                    </Fragment> : false
                }

            </Fragment> : <NotFound message="Transaction not found." />

        }      
        
      </IonList>
        
        
      </IonContent>

      <FooterLoggedIn />
      
    </IonPage>
  );
};
const mapStateToProps = (state: any) => ({
    tsx: state.tsx,
    auth: state.auth,
    users: state.users,
})
export default connect(mapStateToProps, { getTsx, clearTsx })(withRouter(Tsx));
