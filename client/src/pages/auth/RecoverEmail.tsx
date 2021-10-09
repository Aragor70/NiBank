
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonAvatar, IonLabel, IonText, IonItemDivider } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import PageHeader from '../../components/PageHeader';
import PageSubTitle from '../../components/PageSubTitle';

const RecoverEmail: React.FC = () => {
  return (
    <IonPage>

      <PageHeader />

      <IonContent fullscreen>

      
      <PageSubTitle subTitle={"Home > Recover e-mail"} />
        
      <IonList>
          
          <IonListHeader>
            <IonTitle style={{ textAlign: 'center' }}>
                Forgot your e-mail? 

            </IonTitle>
          </IonListHeader>
          
          <IonCard>
            <IonCardHeader>
            <IonCardTitle>
                Recover e-mail

            </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              
                <IonItem>
                    Verification
                </IonItem>
                <IonItem>
                    Choose a verification method from the list and enter your details.

                    All fields are required
                </IonItem>
                
                
            </IonCardContent>
          </IonCard>
          
      </IonList>
        
      </IonContent>

      
    </IonPage>
  );
};

export default RecoverEmail;
