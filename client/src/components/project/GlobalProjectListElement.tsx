
import { IonAvatar, IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonIcon, IonItem, IonProgressBar, IonRouterLink, IonText, IonTitle } from '@ionic/react';
import { accessibility, addCircleOutline, addOutline, businessOutline, cardOutline, lockClosed, lockClosedOutline, lockOpen, open, openOutline, peopleOutline, stopwatch, stopwatchOutline, trendingDown, trendingUp } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Flag from "react-world-flags"
import { ISO_COUNTRY_CODES } from '../../utils/constants'

const GlobalProjectListElement: React.FC<any> = ({ project, index, history }) => {

  
  const getCountryCode = (str: string) => {

    return Object.keys(ISO_COUNTRY_CODES).filter(function(key) {return ISO_COUNTRY_CODES[key]?.toLowerCase() === str?.toLowerCase()})[0];
    
  }

  return (
    <Fragment>

      <IonCard style={{ position: 'relative' }}>
        
          <IonBadge color="light" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
            <Flag code={getCountryCode(project.country) || ""} height="30" />
          </IonBadge>

        <IonCardHeader>
          
          <IonItem>
            <IonAvatar slot="start">
              {/* <IonIcon size="large" color="secondary" icon={project.status === "OPEN" ? lockOpen : lockClosed}></IonIcon> */}
              {
                project.status === "UNDER_CONSIDERATION" ? 
                <IonIcon size="large" color="secondary" icon={stopwatchOutline}></IonIcon>
                : project.status !== "OPEN" ? <IonIcon size="large" color="secondary" icon={lockClosedOutline}></IonIcon>
                : <IonIcon size="large" color="secondary" icon={cardOutline}></IonIcon>
                
              }
            </IonAvatar>
            <IonTitle>
              {project.projectname}
            </IonTitle>
          </IonItem>
          <IonItem>
            <IonText style={{ padding: '7.5px 0' }}>
              {project.description}
            </IonText>
          </IonItem>
          <IonItem>
            <IonText>
              Volume total
            </IonText>
            <IonText slot="end">
              {project.volumetotal} {project.currency}
            </IonText>
              
          </IonItem>

          <IonItem>
            <IonText>
              YieldPA
            </IonText>
            <IonText slot="end">
              {project.yieldpa}
            </IonText>
              
          </IonItem>
          <IonItem>
            <IonText>
              Term
            </IonText>
            <IonText slot="end">
              {
                project.term ? <Fragment>{project.term} days</Fragment> : 'N/A'
              }
              
            </IonText>
              
          </IonItem>
          <IonItem>
            <IonText>
              Type of property
            </IonText>
            <IonText slot="end">
              {
                project.typeofproperty
              }
              
            </IonText>
              
          </IonItem>
          <IonItem>
            <IonText>
              Type of investment
            </IonText>
            <IonText slot="end">
              {
                project.typeofinvestment
              }
              
            </IonText>
              
          </IonItem>
          <IonItem>
            <IonText>
              Minimum investment
            </IonText>
            <IonText slot="end">
              {project.minimuminvestment} {project.currency}
            </IonText>
              
          </IonItem>
          
          {
            project.status !== "UNDER_CONSIDERATION" && <Fragment>
                <IonItem style={{ position: 'relative'}}>
                  <IonBadge style={{ position: 'absolute', top: '10px', left: 0, padding: 0, fontSize: '16px', fontWeight: 'normal', opacity: '1', backgroundColor: '#fff' }} color="light">Invested: {project.volumeinvested} {project.currency} ({ (project.volumeinvested / project.volumetotal).toFixed(3)} %)</IonBadge>
                  <IonProgressBar style={{ position: 'absolute', bottom: '12px', left: 0, padding: 0 }} value={project.volumeinvested / project.volumetotal}></IonProgressBar>
                    
                </IonItem>
            </Fragment>
          }
          
          
        </IonCardHeader>
        <IonCardContent>


        {
          project.images && <img src={project.images[0] } />
        }
        <IonItem>
          <div className="ion-items-center">
            <IonButton style={{ fontWeight: 'bold', fontSize: '17px' }} onClick={() => history.push(`/projects/${project.project_id}`)}>Get more</IonButton>
          </div>
        </IonItem>
        </IonCardContent>

      </IonCard>
    </Fragment>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, {})(withRouter(GlobalProjectListElement));
