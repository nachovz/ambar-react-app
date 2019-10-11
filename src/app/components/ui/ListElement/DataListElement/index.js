import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from 'app/components/ui/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from 'app/components/ui/Typography';
import Row from 'app/components/ui/Row';
import theme from 'app/styles/material';

const styles = {
  rowContainer:{
    padding: `${theme.spacing(0.5)}px ${theme.spacing()}px` ,
    borderBottom: '1px solid lightgrey'
  },
  titleColumn:{
    width: '50%',
    flexGrow: 1,
    paddingRight: `${theme.spacing(0.5)}px`,
    overflowWrap: 'break-word'
  },
  valueColumn:{
    width: '15%'
  },
  iconColumn:{
    width: '12%'
  }
}

const DataListElement = ({
  icon,
  title,
  subtitle = '',
  quantities,
  classes,
  actionIcon,
  action,
  actionIconSize = 'small'
}) =>(
  <Row
    customClass={classes.rowContainer}
  >
    {!!icon &&
      <div className={classes.iconColumn}>
        <Icon
          icon={icon}
          color="primary"
        />
      </div>
    }
    <div className={classes.titleColumn}>
      <Typography>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {subtitle}
      </Typography>
    </div>
    <div className={classes.valueColumn}>
      <Typography>
        {quantities[0]}
      </Typography>
    </div>
    {!!quantities[1] &&
      <div className={classes.valueColumn}>
        <Typography>
          {quantities[1]}
        </Typography>
      </div>
    }
    {!!actionIcon &&
      <div className={classes.iconColumn}>
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
      </div>
    }
  </Row>
);

export default withStyles(styles)(DataListElement);