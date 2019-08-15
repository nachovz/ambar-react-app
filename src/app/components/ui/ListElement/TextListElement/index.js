import React from 'react';
import ListElement from '../';
import Typography from 'app/components/ui/Typography';
import Divider from '@material-ui/core/Divider';

const TextListElement = ({
  subtitle,
  subtitle2,
  informative,
  noDivider,
  secondaryText,
  ...props }) => (
    <React.Fragment>
      <ListElement
        secondaryText={
          secondaryText
          ||
          <React.Fragment>
            <Typography
              noWrap={!informative}
              variant="body2"
              color="textSecondary"
            >
              {subtitle}
            </Typography>
            <Typography noWrap variant="body2" color="textSecondary">
              {subtitle2}
            </Typography>
          </React.Fragment>
        }
        {...props}
      />
      {!noDivider &&
        <Divider component="li" variant={informative && 'inset'} />
      }
    </React.Fragment>
  );

export default TextListElement;