
import { IonAvatar, IonIcon, IonItem, IonText } from '@ionic/react';
import { accessibility, addCircleOutline, addOutline, businessOutline, peopleOutline, trendingDown, trendingUp } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';


const GlobalTsxListElement: React.FC<any> = ({ tsx, index }) => {


  return (
    <Fragment>
      <IonItem>
        <IonAvatar slot="start">
          <IonIcon size="large" color="secondary" icon={tsx.to_project_id ? businessOutline : peopleOutline}></IonIcon>
        </IonAvatar>
        <IonText>
          {tsx.tsx_id}. {tsx.amount}
        </IonText>
      </IonItem>
    </Fragment>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, {})(GlobalTsxListElement);
