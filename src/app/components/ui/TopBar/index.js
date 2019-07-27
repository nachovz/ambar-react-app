import React from 'react';
import Typography from 'app/components/ui/Typography';
import Icon from 'app/components/ui/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { DarkContainer } from './elements';
import Row from 'app/components/ui/Row';
import theme from 'app/styles/material';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';

const styles = {
  leftMargin: {
    marginLeft:`${theme.spacing(1)}px`
  }
};

const MainListElement = (
  {
    title,
    actionIcon,
    action,
    secondaryActionIcon,
    secondaryAction,
    classes,
    ...props}
) => (
  <DarkContainer>
    <List>
      <ListItem {...props}>
        <ListItemText
          disableTypography
          primary={
            <Typography noWrap variant="button" display="block">
              { title }
            </Typography>
          }
        />
        {!!actionIcon &&
          <ListItemSecondaryAction>
            <Row>
              <IconButton edge="end" aria-label={actionIcon} onClick={action}>
                <Icon icon={actionIcon} />
              </IconButton>
              {!!secondaryActionIcon &&
                <IconButton
                  edge="end"
                  aria-label={secondaryActionIcon}
                  onClick={secondaryAction}
                  className={classes.leftMargin}>
                  <Icon icon={secondaryActionIcon} button />
                </IconButton>
              }
            </Row>
          </ListItemSecondaryAction>
        }
      </ListItem>
    </List>
  </DarkContainer>
);

export default withStyles(styles)(MainListElement);