
import { IonItem, IonText } from '@ionic/react';


const Balance: React.FC<any> = ({ }) => {


  return (
    <IonItem>    
        <IonText className="ion-text-wrap" slot='start'>
            Balance
        </IonText>
        <IonText className="ion-items-center">
            100 000,00 Kc
        </IonText>
    </IonItem>
  );
};

export default Balance;
