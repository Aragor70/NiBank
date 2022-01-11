
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonItem, IonToggle, IonMenuToggle } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';


import { menuController } from '@ionic/core';
import { moon, sunny } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const PageHeader: React.FC<RouteComponentProps | any> = ({ history, auth }) => {

  const [ isDarkMode, setIsDarkMode ] = useState(false)

  const handleToggle = async () => {

    document.body.classList.toggle("dark");
    setIsDarkMode(!isDarkMode)
  }

/*   useEffect(() => {

    const value = new Date().getHours();

    const isDark = document.body.classList.contains('dark');

    if (value >= 17 && !isDark) {

      handleToggle()

    }

  }, [auth?.user]) */


  return (
      <IonHeader>
        <IonItem mode="md">
          <IonTitle className="no-padding"><span onClick={() => history.push("/")} className="brand-icon"><span style={{ color: '#3880ff' }}>Ni</span><span style={{ color: '#3dc2ff' }}>Vest</span> <span style={{ color: '#3dc2ff', fontSize: '12.5px' }}>Beta 1.1.2</span></span></IonTitle>
          
            <IonIcon icon={isDarkMode ? sunny : moon} onClick={() => handleToggle()} slot="end"></IonIcon>
            
            <IonMenuToggle slot="end" className="vertical-center" style={{ marginLeft: '15px'}}>
              <IonIcon size="large" color="dark" name="menu-outline"></IonIcon>
            </IonMenuToggle>
        </IonItem>
      </IonHeader>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, {})(withRouter(PageHeader));
