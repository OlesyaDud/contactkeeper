import React, { Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


export default () => (
  <Fragment>
   <CircularProgress color="secondary"
      style={{ width: '30px', height: '30px', margin: 'auto', display: 'block' }}
    />
  </Fragment>
);