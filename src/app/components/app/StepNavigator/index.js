import React, { Fragment } from 'react';
import Button from 'app/components/ui/Button';
import Icon from 'app/components/ui/Icon';
import { Container } from './elements';

const StepNavigator = ({
  moveToPreviousText,
  moveToPreviousAction,
  moveToNextText,
  moveToNextAction,
}) => {
  return (
    <Container>
      <Button
        size="small"
        onClick={moveToPreviousAction}
        disabled={!!(!moveToPreviousText | !moveToPreviousAction)}
      >
        {!!moveToPreviousText && (
          <Fragment>
            <Icon icon="arrow_left" fontSize="small" />
            {moveToPreviousText}
          </Fragment>
        )}
      </Button>
      <Button
        size="small"
        onClick={moveToNextAction}
        disabled={!!(!moveToNextText | !moveToNextAction)}
      >
        {moveToNextText && (
          <Fragment>
            {moveToNextText}
            <Icon icon="arrow_right" fontSize="small" />
          </Fragment>
        )}
      </Button>
    </Container>
  );
};

export default StepNavigator;
