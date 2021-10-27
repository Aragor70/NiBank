
import { IonItem } from '@ionic/react';


const AccountRow: React.FC<any> = ({ doSearch, setDoSearch, formData, setFormData, element, index }) => {

  const pickOne = () => {
    
    setFormData({ ...formData, to: element.public_key })
    setDoSearch(false)
  }

  return (
    <IonItem onClick={() => pickOne()}>
      {index + 1}. {element.email} - {element.public_key || 'N/A'}
    </IonItem>
  );
};

export default AccountRow;
