import React from 'react';
import { connect } from 'react-redux';

interface AlertState {
    alert: { alerts: { id: string, message: string, type: string }[] }
}

interface AlertProperties {
    alert: { alerts: { id: string, message: string, type: string }[] }
}

const Alert = ({ alert: { alerts } }: AlertProperties): any => 
    
    
    alerts !== null && alerts.length > 0 && <div className="alert">
    {
        alerts.map(element => (
            <div key={element.id} className={`alert-message alert-${element.type}`}>
                {element.message}
            </div>))
    }
    </div>
    
    
const mapStateToProps = (state: AlertState) => ({
    alert: state.alert
})
export default connect(mapStateToProps)(Alert);