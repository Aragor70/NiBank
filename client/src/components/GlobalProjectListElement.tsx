
import { IonAvatar, IonIcon, IonItem, IonText } from '@ionic/react';
import { accessibility, addCircleOutline, addOutline, businessOutline, lockClosed, lockOpen, open, peopleOutline, trendingDown, trendingUp } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


const GlobalProjectListElement: React.FC<any> = ({ project, index, history }) => {


  return (
    <Fragment>
      <IonItem onClick={() => history.push(`/projects/${project.project_id}`)}>
        <IonAvatar slot="start">
          <IonIcon size="large" color="secondary" icon={project.status === "OPEN" ? lockOpen : lockClosed}></IonIcon>
        </IonAvatar>
        <IonText>
          {index + 1}. {project.projectname}
        </IonText>
      </IonItem>
    </Fragment>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, {})(withRouter(GlobalProjectListElement));
