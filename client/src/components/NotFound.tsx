
import { IonIcon, IonItem, IonSpinner, IonText, IonTitle } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import { Fragment } from 'react';

const NotFound: React.FC<any> = ({ message }) => {


  return (
        <Fragment>
            <IonItem>

                <IonIcon size="large" slot="start" color="secondary" icon={informationCircleOutline}></IonIcon>
                
                <IonText>
                    {message}
                </IonText>

            </IonItem>
        </Fragment>
    );
};
export default NotFound;
