
import { IonBreadcrumb, IonBreadcrumbs, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonList, IonText } from '@ionic/react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

interface PageSubTitle {
    subTitle: string
}

const PageSubTitle: React.FC<PageSubTitle | any> = ({ subTitles, history }) => {

  return (
    <IonList>
    <IonItem>
        <IonCard style={{ boxShadow: 'none' }} className="no-padding no-borders" mode="md">
            <IonCardHeader className="no-padding">
              {/* <IonCardTitle style={{ fontSize: '16px' }} >
                {subTitle}
              </IonCardTitle> */}
              <IonBreadcrumbs>
                {/* {
                  values.map((element: any) => <IonBreadcrumb href="#">{element}</IonBreadcrumb>)
                } */}
                {
                  subTitles?.map((element: any) => <Fragment>
                    <IonBreadcrumb onClick={ element.action ? () => element.action() : element.path ? () => history.push(element.path) : () => false} style={{ display: 'flex', itemsAlign: 'center' }}>

                      {
                        element.icon ? <IonIcon icon={element.icon} slot="start"></IonIcon> : false
                      }

                      <IonText>{element.text || 'N/A'}</IonText>

                    </IonBreadcrumb>
                  </Fragment>)
                }
                
                
              </IonBreadcrumbs>
            </IonCardHeader>
        </IonCard>
    </IonItem>
    </IonList>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, {  })(withRouter(PageSubTitle));
