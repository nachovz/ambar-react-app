import React from 'react';
import Typography from 'app/components/ui/Typography';
import Icon from 'app/components/ui/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Row from 'app/components/ui/Row';

const ListElement = ({
  title,
  quantities,
  secondaryText,
  field,
  icon,
  noIcon = false,
  iconColor,
  actionIcon,
  actionIconSize = 'default',
  action,
  informative,
  ...props
}) => (
    <ListItem {...props}>
      {!noIcon &&
        <ListItemIcon>
          {!!icon ?
            <Icon
              icon={icon}
              color={iconColor}
            />
            :
            <React.Fragment />
          }
        </ListItemIcon>
      }

      <ListItemText
        disableTypography
        primary={
          <Row spaceBetween>
            <Typography noWrap variant="body1">
              {title}
            </Typography>
            {quantities}
          </Row>
        }
        secondary={secondaryText}
      />
      {!!actionIcon &&
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label={actionIcon}
            onClick={action}
          >
            <Icon
              icon={actionIcon}
              color="primary"
              fontSize={actionIconSize}
            />
          </IconButton>
        </ListItemSecondaryAction>
      }
    </ListItem>
  );

export default ListElement;
