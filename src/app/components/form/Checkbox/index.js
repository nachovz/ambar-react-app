import React, { PureComponent } from 'react';
import UICheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//Types

class Checkbox extends PureComponent {
  handleChange = (e) => {
    if (e && e.target) {
      const { onChange } = this.props.input;
      onChange && onChange(!!e.target.checked);
    }
  };

  render() {
    const { input = {}, color = 'primary', ...props } = this.props;
    return (
      <FormControlLabel
        label={props.label}
        control={
          <UICheckbox
            {...props}
            color={color}
            onClick={this.handleChange}
            checked={input.value}
          />
        }
      />
    );
  }
}

export default Checkbox;
