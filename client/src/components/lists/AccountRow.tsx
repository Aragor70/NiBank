
import { IonItem, IonText } from '@ionic/react';


const AccountRow: React.FC<any> = ({ doSearch, setDoSearch, formData, setFormData, element, index }) => {

  const pickOne = () => {
    
    setFormData({ ...formData, to: element.public_key })
    setDoSearch(false)
  }

  return (
    <IonItem className="inner-text-active" onClick={() => pickOne()}>
      <IonText>
        {index + 1}. {element.email} - {element.public_key || 'N/A'}
      </IonText>
    </IonItem>
  );
};

export default AccountRow;
