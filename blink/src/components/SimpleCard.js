import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  card: {
    minWidth: 300,
    margin: '50px',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

function SimpleCard(props) {
  const { classes, children} = props;

  return (
    <div>
    <Grid container spacing={24}>
      <Card className={classes.card}>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </Grid>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
