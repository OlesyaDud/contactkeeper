import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';
import ErrorIcon from '@material-ui/icons/Error';

const Alerts = props => {
    const alertContext = useContext(AlertContext);
    return (
       alertContext.alerts.length > 0 &&
       alertContext.alerts.map(alert => (
           <div key={alert.id} 
           className={ `alert alert-${alert.type}`}>
               <ErrorIcon /> {alert.msg}
           </div>
       ))
    )
}

Alerts.propTypes = {

}

export default Alerts;
