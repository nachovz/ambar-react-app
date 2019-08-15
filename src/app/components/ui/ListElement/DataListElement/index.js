import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListElement from '../';
import Typography from 'app/components/ui/Typography';
import Row from 'app/components/ui/Row';
import theme from 'app/styles/material';

const styles = {
  quantityBlock:{
    marginLeft: `${theme.spacing(2)}px`
  },
  quantitiesRow:{
    marginRight: `${theme.spacing(2)}px`
  }
}

const DataListElement = ({
  subtitle,
  quantities,
  classes,
  ...props
}) =>(
  <ListElement
    secondaryText={
      <Typography noWrap variant="caption" color="textSecondary">
        { subtitle }
      </Typography>
    }
    quantities={
      <Row customClass={classes.quantitiesRow}>
        {quantities && quantities.map( (quantity, index) => (
          <Typography
            variant="body1"
            color="primary"
            key={index}
            className={classes.quantityBlock}
          >
            { quantity }
          </Typography>
        ))}
      </Row>
    }
    {...props}
  />
);

export default withStyles(styles)(DataListElement);