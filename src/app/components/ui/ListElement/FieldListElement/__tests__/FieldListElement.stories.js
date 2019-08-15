import React from 'react';
import { storiesOf } from '@storybook/react';
import FieldListElement from '../';
import TextField from 'app/components/form/TextField';
import SelectField from 'app/components/form/SelectField';
import List from 'app/components/ui/List';

storiesOf('List Elements', module)
  .add('FieldListElement', () => (
    <List>
      <FieldListElement
        icon="empty"
        title="Observaciones"
        field={
          <TextField
            fullWidth
            multiline
            placeholder="Aquí las observaciones"
          />
        }
      />
      <FieldListElement
        icon="empty"
        title="Familia de residuos*"
        field={
          <SelectField
            fullWidth
            value={1}
            options={[
              {
                label: "First option",
                value: 1
              }, {
                label: "Second option",
                value: 2
              }
            ]}

          />
        }
      />
    </List>
  ));
