
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem } from '@ionic/react';

interface PageSubTitle {
    subTitle: string
}

const PageSubTitle: React.FC<PageSubTitle | any> = ({ subTitle }) => {

  return (
    <IonItem>
        <IonCard style={{ boxShadow: 'none' }} className="no-padding no-borders">
            <IonCardSubtitle className="no-padding">
              <IonCardTitle style={{ fontSize: '16px' }} >
                {subTitle}
              </IonCardTitle>
            </IonCardSubtitle>
        </IonCard>
    </IonItem>
  );
};

export default PageSubTitle;
