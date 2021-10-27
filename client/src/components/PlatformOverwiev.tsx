
import { IonCard, IonCardContent, IonCardHeader, IonItem, IonList, IonTitle } from '@ionic/react';


const PlatformOverwiev: React.FC<any> = ({ }) => {


  return (
    <IonCard>
        <IonCardHeader>
            
        <IonTitle style={{ textAlign: 'center' }}>
            Platform overview

        </IonTitle>

        </IonCardHeader>
        <IonCardContent>
            <IonList>
                <IonItem>
                    Total Supply:
                </IonItem>
                <IonItem>
                    Investors:
                </IonItem>
                <IonItem>
                    Transactions:
                </IonItem>


            </IonList>
        </IonCardContent>
    </IonCard>
  );
};

export default PlatformOverwiev;


