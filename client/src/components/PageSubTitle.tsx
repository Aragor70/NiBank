
import { IonItem } from '@ionic/react';

interface PageSubTitle {
    subTitle: string
}

const PageSubTitle: React.FC<PageSubTitle> = ({ subTitle }) => {


  return (
    <IonItem>
        <p>
            {subTitle}
        </p>
    </IonItem>
  );
};

export default PageSubTitle;
