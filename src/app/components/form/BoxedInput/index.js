import React from 'react';
import Typography from 'app/components/ui/Typography';
import Row from 'app/components/ui/Row';
import Icon from 'app/components/ui/Icon';
import Spacer from 'app/components/ui/Spacer';
import { CustomRow, BorderedContainer, CenteredDiv } from './elements';

const BoxedInput = ({
  topLabel,
  topValue,
  bottomLabel,
  icon,
  input,
  style
}) => (
  <CustomRow style={style}>
    <Row>
      <Icon
       icon={icon}
       color="primary"
      />
      <Spacer direction="horizontal"/>
      <CenteredDiv>
        <Typography>
          { topLabel }
        </Typography>
        <Typography variant="caption">
          { topValue }
        </Typography>
      </CenteredDiv>
    </Row>
    <BorderedContainer>
      {!!bottomLabel &&
        <Typography>
          { bottomLabel }
        </Typography>
      }
      {!!input && input}
    </BorderedContainer>
  </CustomRow>
);

export default BoxedInput;