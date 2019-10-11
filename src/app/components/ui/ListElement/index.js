import React from 'react';
import Typography from 'app/components/ui/Typography';
import Icon from 'app/components/ui/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
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
            typeof(icon) === "string" ?
              <Icon
                icon={icon}
                color={iconColor}
              />
              :
              <ListItemAvatar>
                <Avatar alt={icon.alt} src={icon.src} />
              </ListItemAvatar>
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
          </Row>
        }
        secondary={secondaryText}
      />
      {(!!actionIcon || !!quantities) &&
        <ListItemSecondaryAction>
            <Row>
              <React.Fragment>
                {!!quantities && quantities}
                {!!actionIcon &&
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
                }
              </React.Fragment>
          </Row>
        </ListItemSecondaryAction>
      }
    </ListItem>
  );

export default ListElement;
