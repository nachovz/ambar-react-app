import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'app/components/ui/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Row from 'app/components/ui/Row';
import theme from 'app/styles/material';

const styles = {
  leftMargin: {
    marginLeft:`${theme.spacing(1)}px`
  }
};

const DateBar = ({
    title,
    rightText,
    classes,
    ...props
}) => (
  <ListItem {...props}>
    <ListItemText
      disableTypography
      primary={
        <Row spaceBetween>
          <Typography noWrap variant="caption">
            { title }
          </Typography>
          <Typography noWrap variant="caption">
            { rightText }
          </Typography>
        </Row>
      }
    />
  </ListItem>
);

export default withStyles(styles)(DateBar);