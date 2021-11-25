
import { IonItem, IonSpinner, IonTitle } from '@ionic/react';

const Loader: React.FC<any> = () => {


  return (
    <IonItem>
        <div className="ion-items-center">
            <IonSpinner duration={1500} color="primary"></IonSpinner>
        </div>
    </IonItem>
  );
};
export default Loader;
