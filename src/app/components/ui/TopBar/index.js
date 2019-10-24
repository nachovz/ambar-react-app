import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'app/components/ui/Typography';
import Icon from 'app/components/ui/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Row from 'app/components/ui/Row';
import Box from '@material-ui/core/Box';
import { DarkContainer } from './elements';
import theme from 'app/styles/material';

const styles = {
  leftMargin: {
    marginLeft: `${theme.spacing(1)}px`
  }
};

const TopBar = ({
  title,
  rightText,
  actionIcon,
  action,
  secondaryActionIcon,
  secondaryAction,
  classes,
  ...props
}) => (
    <DarkContainer>
      <ListItem {...props}>
        <ListItemText
          disableTypography
          primary={
            <Row spaceBetween>
              <Box fontWeight={500}>
                {title}
              </Box>
              <Typography noWrap variant="caption" display="block">
                {rightText}
              </Typography>
            </Row>
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
                  <Icon icon={secondaryActionIcon} />
                </IconButton>
              }
            </Row>
          </ListItemSecondaryAction>
        }
      </ListItem>
    </DarkContainer>
  );

export default withStyles(styles)(TopBar);