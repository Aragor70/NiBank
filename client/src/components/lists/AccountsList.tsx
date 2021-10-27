
import { IonCard, IonItem, IonList, IonListHeader, IonTitle } from '@ionic/react';
import AccountRow from './AccountRow';


const AccountsList: React.FC<any> = ({ }) => {


  return (
    <IonList>
        
      <IonList>

        <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                Transactions

            </IonTitle>
        </IonListHeader>

        <AccountRow />
        <AccountRow />
        <AccountRow />
        
      </IonList>
    </IonList>
  );
};

export default AccountsList;
