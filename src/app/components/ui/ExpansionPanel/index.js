import React from 'react';
import ExpansionPanelUI from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from 'app/components/ui/Typography';
import Icon from 'app/components/ui/Icon';
import theme from 'app/styles/material';
import Spacer from 'app/components/ui/Spacer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  details:{
    padding:0,
    display: 'block'
  },
  root:{
    padding: `0px ${theme.spacing(2)}px`,
    backgroundColor: ({ background }) => background,
    color: ({ background = {} }) => (typeof background.isValid === 'function' && background.isValid()) ? 'white' : 'inherit'
  },
  content:{
    alignItems: 'center'
  }
});

const ExpansionPanel = ({ 
  content: { content, title, icon, background, leyend=[] },
  noPadding=false,
  expanded=true, 
  ...props
}) => {
  const classes = useStyles({ background });
  return(
    <ExpansionPanelUI defaultExpanded={expanded} {...props}>
      <ExpansionPanelSummary 
        expandIcon={<Icon icon='arrow_less' white={!!background} />}
        classes={{
          root: classes.root,
          content: classes.content
        }}
      >
        {!!icon && (
          <React.Fragment>
            <Icon
              icon={icon}
              white={!!background}
            />
            <Spacer direction="horizontal" size="xl"/>
          </React.Fragment>
        )}
        <Typography>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={(noPadding && classes.details) || ''}>
        {content}
      </ExpansionPanelDetails>
    </ExpansionPanelUI>

  );
};

export default ExpansionPanel;