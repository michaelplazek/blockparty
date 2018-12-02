import React from "react";
import PropTypes from "prop-types";
import theme from "../../../../../theme";

import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const ContactDetailItem = ({ name, value, isLast, onClick, contact }) => (
  <ListItem
    style={theme.palette.inverse}
    divider={false}
  >
    <Grid
      direction="column"
      container
    >
      <Grid item>
        <Grid container justify="space-between" onClick={onClick}>
          <Grid item>
            <ListItemText
              disableTypography
              primary={
              <Typography
                style={theme.palette.inverse}
                variant="subheading"
              >
                {name}
              </Typography>}
            />
          </Grid>
          <Grid item>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  style={theme.palette.inverse}
                  variant="subheading"
                >
                  {value}
                </Typography>}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction='column'
          alignItems='center'
          style={{ marginTop: "1em", marginBottom: "1em" }}
        >
          <Grid item>
            <Typography
              style={theme.palette.inverse}
              variant="headline"
            >
              {contact}
              </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </ListItem>
);

const UserDetailItem = ({ name, value, isLast, onClick }) => (
  <ListItem divider={true}>
  <Grid direction="column" container>
      <Grid container justify="space-between" onClick={onClick}>
        <Grid item>
          <ListItemText
            disableTypography
            primary={<Typography>{name}</Typography>}
          />
        </Grid>
        <Grid item>
          <ListItemText
            primary={<Typography variant="subheading">{value}</Typography>}
          />
        </Grid>
      </Grid>
  </Grid>
  </ListItem>
);

const TransactionDetailListItem = ({ name, value, isLast, onClick, contact }) => (
  <div>
    {!isLast &&
      <UserDetailItem
        name={name}
        value={value}
        isLast={isLast}
        onClick={onClick}
      />
    }
    {isLast &&
      <ContactDetailItem
        name={name}
        value={value}
        isLast={isLast}
        onClick={onClick}
        contact={contact}
      />
    }
  </div>

);

TransactionDetailListItem.propTypes = {
  name: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
  onClick: PropTypes.func
};

TransactionDetailListItem.defaultProps = {
  isLast: false,
  onClick: undefined
};

export default TransactionDetailListItem;
