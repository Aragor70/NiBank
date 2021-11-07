
import { IonItem } from '@ionic/react';
import { Fragment } from 'react';


const Transaction: React.FC<any> = ({ tsx }) => {


  return (
    <Fragment>
      <IonItem>
        {tsx.tsx_id}
      </IonItem>
    </Fragment>
  );
};

export default Transaction;
