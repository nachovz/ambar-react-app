import React from 'react';
import Typography from 'app/components/ui/Typography';
import Icon from 'app/components/ui/Icon';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const MainListElement = ({
    title,
    subtitle,
    subtitle2,
    icon,
    actionIcon,
    action,
    informative,
    ...props
}) => (
  <React.Fragment>
    <ListItem {...props}>
      <ListItemIcon>
      {!!icon
        ?
          <Icon
              style={{height: 'auto'}}
              icon={icon}
          />
        :
          <React.Fragment/>
      }
      </ListItemIcon>

      <ListItemText
        disableTypography
        primary={
          <Typography noWrap variant="body1">
            { title }
          </Typography>
          }
        secondary={
          <React.Fragment>
            <Typography noWrap={!informative} variant="body2" color="textSecondary">
              {subtitle}
            </Typography>
            <Typography noWrap variant="body2" color="textSecondary">
              {subtitle2}
            </Typography>
          </React.Fragment>
        }
      />
      {!!actionIcon &&
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label={actionIcon}>
            <Icon icon={actionIcon} button color="primary"/>
          </IconButton>
        </ListItemSecondaryAction>
      }
    </ListItem>
    <Divider component="li" variant={informative && 'inset'}/>
  </React.Fragment>
);

export default MainListElement;