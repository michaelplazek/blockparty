import React from "react";
import { compose, lifecycle } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/es/Typography/Typography";
import Grid from "@material-ui/core/Grid";

const styles = () => ({
    root: {
        border: "1px solid #f2f2f2"
    }
});

const Logo = ({ classes }) => (
    <Typography variant="headline">Block Party</Typography>
);

export default compose(withStyles(styles))(Logo);
