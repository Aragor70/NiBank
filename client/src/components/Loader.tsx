
import { IonItem, IonSpinner, IonTitle } from '@ionic/react';

const Loader: React.FC<any> = () => {


  return (
    <IonItem>
        <IonTitle className="ion-items-center">
            <IonSpinner duration={1500} color="primary"></IonSpinner>
        </IonTitle>
    </IonItem>
  );
};
export default Loader;
