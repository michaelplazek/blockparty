import React from 'react';
import { compose, lifecycle, withState } from 'recompose';
import {Grid, Typography} from "@material-ui/core";

const PermissionStatuses = ({
  locationEnabled,
  notificationsEnabled
}) => (
  <Grid container direction='column' alignItems='center'>
    <Grid item>
      <Typography variant='caption'>
        To enable services, go into browser settings
      </Typography>
    </Grid>
    <Grid item>
      <Typography>
        {notificationsEnabled ?
          "Notifications enabled." :
          "Notifications not enabled."
        }
      </Typography>
    </Grid>
    <Grid item>
      <Typography>
        {locationEnabled ?
          "Location enabled." :
          "Location not enabled."
        }
      </Typography>
    </Grid>
  </Grid>
);

export default compose(
  withState('notificationsEnabled', 'setNotificationsEnabled', false),
  withState('locationEnabled', 'setLocationEnabled', false),
  lifecycle({
    componentDidMount() {
      const { setNotificationsEnabled, setLocationEnabled } = this.props;
      navigator.permissions.query({ name: 'notifications' }).then(result => {
        result.state === 'granted' ? setNotificationsEnabled(true) : setNotificationsEnabled(false);
      });
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        result.state === 'granted' ? setLocationEnabled(true) : setLocationEnabled(false);
      });
    }
  }),
)(PermissionStatuses)