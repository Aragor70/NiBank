
import { IonAvatar, IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonIcon, IonImg, IonItem, IonProgressBar, IonRouterLink, IonText, IonTitle } from '@ionic/react';
import { accessibility, addCircleOutline, addOutline, businessOutline, cardOutline, lockClosed, lockClosedOutline, lockOpen, open, openOutline, peopleOutline, stopwatch, stopwatchOutline, trendingDown, trendingUp } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Flag from "react-world-flags"
import { ISO_COUNTRY_CODES } from '../../utils/constants'

const GlobalProjectListElement: React.FC<any> = ({ project, auth, history, isSample = false }) => {

  
  const getCountryCode = (str: string) => {
    if (!str) return ""
    return Object.keys(ISO_COUNTRY_CODES).filter(function(key) {return ISO_COUNTRY_CODES[key]?.toLowerCase()?.includes(str?.toLowerCase())})[0];
    
  }

  
    const handleDefaultSrc = (e: any) => {
        e.target.src = 'https://www.investopedia.com/thmb/FKP-u7NEKNODSvAkMo-9WUz0E_c=/2121x1193/smart/filters:no_upscale()/GettyImages-1169053915-76068125fc394f9691db9edaf7c76baf.jpg'
    }

  return (
    <Fragment>

      <IonCard style={{ position: 'relative' }}>
        

        <IonCardHeader>
          
          <IonItem>
            
            <IonBadge className="no-padding" color="light" slot="end" style={{ minWidth: '45px' }}>
              <Flag code={getCountryCode(project?.country || '') || ""} height="30" />
            </IonBadge>
            <IonAvatar slot="start">
              {/* <IonIcon size="large" color="secondary" icon={project.status === "OPEN" ? lockOpen : lockClosed}></IonIcon> */}
              {
                project.status === "UNDER_CONSIDERATION" ? 
                <IonIcon size="large" color="secondary" icon={stopwatchOutline}></IonIcon>
                : project.status !== "OPEN" ? <IonIcon size="large" color="secondary" icon={lockClosedOutline}></IonIcon>
                : <IonIcon size="large" color="secondary" icon={cardOutline}></IonIcon>
                
              }
            </IonAvatar>
            <IonItem lines="none">
              <IonText>{project.status === "UNDER_CONSIDERATION" ? "COMING SOON" : project.status}</IonText>
            </IonItem>
          </IonItem>
            
          <IonItem mode="md">
            <IonTitle className="no-padding">
              <div className="ion-text-wrap" style={{ textAlign: 'left' }}>
                {project.projectname}
              </div>
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
              Yield per month
            </IonText>
            <IonText slot="end">
              {project.yieldpa}%
            </IonText>
              
          </IonItem>
          {
            !isSample && 
            
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
          }
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
            ((project.status !== "UNDER_CONSIDERATION") && !isSample) && <Fragment>
                <IonItem style={{ position: 'relative'}}>
                  <IonBadge style={{ position: 'absolute', top: '10px', left: 0, padding: 0, fontSize: '16px', fontWeight: 'normal', opacity: '1' }} color="none"><IonText color="dark">Invested: {project.volumeinvested} {project.currency} ({ (project.volumeinvested / project.volumetotal * 100).toFixed(3)} %)</IonText></IonBadge>
                  <IonProgressBar style={{ position: 'absolute', bottom: '12px', left: 0, padding: 0 }} value={project.volumeinvested / project.volumetotal * 100}></IonProgressBar>
                    
                </IonItem>
            </Fragment>
          }
          
          
        </IonCardHeader>
        <IonCardContent>


        {
          project?.images && <IonImg src={project?.images[0] || "" } onIonError={(e) => handleDefaultSrc(e)} alt="property" />
        }
        {
          !isSample && 
            <IonItem>
              <div className="ion-items-center">
                <IonButton style={{ fontWeight: 'bold', fontSize: '17px' }} onClick={auth?.user?.user_id ? () => history.push(`/projects/${project.project_id}`) : () => history.push('/logon') }>Get more</IonButton>
              </div>
            </IonItem>
        }
        
        </IonCardContent>

      </IonCard>
    </Fragment>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, {})(withRouter(GlobalProjectListElement));
