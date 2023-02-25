import React from 'react';
import { connect } from 'react-redux';

interface AlertState {
    alert: { loading: boolean, alerts: { id: string, message: string, type: string }[] }
}

interface AlertProperties {
    alert: { loading: boolean, alerts: { id: string, message: string, type: string }[] }
}

const Alert = ({ alert: { alerts, loading } }: AlertProperties): any => {

    if (loading) return <div>...</div>

    return (
        alerts !== null && alerts.length > 0 && (<div className="alert">
            <div key={alerts[0].id} className={`alert-message alert-${alerts[0].type}`}>
                {alerts[0].message}
            </div>
        </div>)
    )
    
}
    
    
const mapStateToProps = (state: AlertState) => ({
    alert: state.alert
})
export default connect(mapStateToProps)(Alert);