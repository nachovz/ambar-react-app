import React from 'react';
import ExpansionPanelUI from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from 'app/components/ui/Typography';
import ExpandMoreIcon from 'app/components/ui/Icon';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  details:{
    padding:0
  }
};

const ExpansionPanel = ({ classes, content: { content, title}, ...props}) => {
  //const { classes } = props;
  return(
    <ExpansionPanelUI {...props}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon icon='arrow-drop-up' />}>
          <Typography>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        {content}
      </ExpansionPanelDetails>
    </ExpansionPanelUI>

  );
};

export default withStyles(styles)(ExpansionPanel);