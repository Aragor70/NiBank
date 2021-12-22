
import { IonBreadcrumb, IonBreadcrumbs, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonText } from '@ionic/react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

interface PageSubTitle {
    subTitle: string
}

const PageSubTitle: React.FC<PageSubTitle | any> = ({ subTitles, history }) => {

  return (
    <IonItem>
        <IonCard style={{ boxShadow: 'none' }} className="no-padding no-borders">
            <IonCardSubtitle className="no-padding">
              {/* <IonCardTitle style={{ fontSize: '16px' }} >
                {subTitle}
              </IonCardTitle> */}
              <IonBreadcrumbs>
                {/* {
                  values.map((element: any) => <IonBreadcrumb href="#">{element}</IonBreadcrumb>)
                } */}
                {
                  subTitles?.map((element: any) => <Fragment>
                    <IonBreadcrumb onClick={ element.action ? () =>element.action() : element.path ? () => history.push(element.path) : () => false} style={{ display: 'flex', itemsAlign: 'center' }}>

                      {
                        element.icon ? <IonIcon icon={element.icon} slot="start"></IonIcon> : false
                      }

                      <IonText>{element.text || 'N/A'}</IonText>

                    </IonBreadcrumb>
                  </Fragment>)
                }
                
                
              </IonBreadcrumbs>
            </IonCardSubtitle>
        </IonCard>
    </IonItem>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, {  })(withRouter(PageSubTitle));
