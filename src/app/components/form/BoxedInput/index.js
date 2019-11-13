import React from 'react';
import Typography from 'app/components/ui/Typography';
import Icon from 'app/components/ui/Icon';
import Spacer from 'app/components/ui/Spacer';
import Box from '@material-ui/core/Box';
import { CustomRow, CenteredDiv, InnerRow } from './elements';

const BoxedInput = ({
  topLabel = "% del llenado",
  topValue = "",
  bottomLabel,
  icon,
  input,
  style
}) => (
  <CustomRow style={style}>
    <InnerRow>
      <Icon
       icon={icon}
       color="primary"
      />
      <Spacer direction="horizontal" size="xl"/>
      <CenteredDiv>
        <Typography color="textSecondary" variant="caption">
          {topLabel} <strong>{topValue}</strong>
        </Typography>
      </CenteredDiv>
    </InnerRow>
    <InnerRow>
      {!!bottomLabel &&
        <React.Fragment>
          <Box whiteSpace="nowrap">
            <Typography variant="overline" >
              { bottomLabel }
            </Typography>
          </Box>
          <Spacer direction="horizontal" />
        </React.Fragment>
      }
      {!!input && input}
    </InnerRow>
  </CustomRow>
);

export default BoxedInput;