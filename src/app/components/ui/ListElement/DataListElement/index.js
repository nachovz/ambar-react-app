import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListElement from '../';
import Icon from 'app/components/ui/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from 'app/components/ui/Typography';
import Row from 'app/components/ui/Row';
import theme from 'app/styles/material';

const styles = {
  quantityBlock:{
    marginLeft: `${theme.spacing(2)}px`
  },
  quantitiesRow:{
    marginRight: `${theme.spacing(2)}px`
  },
  rowContainer:{
    padding: '4px 8px',
    borderBottom: '1px solid lightgrey'
  },
  titleColumn:{
    width: '50%',
    flexGrow: 1,
    paddingRight: '4px',
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

/*
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
  */