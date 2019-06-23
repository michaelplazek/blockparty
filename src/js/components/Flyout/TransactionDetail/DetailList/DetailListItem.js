import React from "react";
import PropTypes from "prop-types";
import { dark, light } from "../../../../../theme";

import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

import { isEmail, isPhoneNumber } from "../../../../utils/regex";

const getLink = (contact, theme) => {
  if (isPhoneNumber(contact)) {
    return (
      <Typography
        style={theme.palette.inverse}
        component="a"
        variant="headline"
        href={`tel:${contact}`}
      >
        {contact}
      </Typography>
    );
  }
  if (isEmail(contact)) {
    return (
      <Typography
        style={theme.palette.inverse}
        component="a"
        variant="headline"
        href={`mailto:${contact}`}
      >
        {contact}
      </Typography>
    );
  } else {
    return (
      <Typography style={theme.palette.inverse} variant="headline">
        {contact}
      </Typography>
    );
  }
};

const ContactDetailItem = ({ name, value, onClick, contact, isDarkMode }) => {
  const theme = isDarkMode ? dark : light;
  return (
    <ListItem style={theme.palette.inverse} divider={false}>
      <Grid direction="column" container>
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
                  </Typography>
                }
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
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{ marginTop: "1em", marginBottom: "1em" }}
          >
            <Grid item>{getLink(contact, theme)}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
};

const UserDetailItem = ({ name, value, onClick, isDarkMode }) => (
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

const TransactionDetailListItem = ({
  name,
  value,
  isLast,
  onClick,
  contact,
  isDarkMode
}) => (
  <div>
    {!isLast && (
      <UserDetailItem
        name={name}
        value={value}
        isLast={isLast}
        onClick={onClick}
        isDarkMode={isDarkMode}
      />
    )}
    {isLast && (
      <ContactDetailItem
        name={name}
        value={value}
        isLast={isLast}
        onClick={onClick}
        contact={contact}
        isDarkMode={isDarkMode}
      />
    )}
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
