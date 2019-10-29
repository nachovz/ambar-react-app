import React from 'react';
import Select from 'react-select';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import AsyncSelect from 'react-select/async';
import NoOptionsMessage from './NoOptionsMessage';
import Control from './Control';
import Option from './Option';
import Placeholder from './Placeholder';
import SingleValue from './SingleValue';
import ValueContainer from './ValueContainer';
import Menu from './Menu';
import { FieldWrapper, Error } from './elements';
import debounce from 'debounce-promise';
import omitBy from 'app/utils/omitBy';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 290,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
}));

const defaultComponents = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

export default function IntegrationReactSelect(
  {
    meta,
    suggestions,
    isDisabled,
    async,
    fakeAsync,
    loadAsyncOptions,
    value,
    onChange,
    menuIsOpen,
    components = {},
    readonly,
    placeholder = "Buscar opciones"
  }) {
  const classes = useStyles();
  const theme = useTheme();

  const fakeAsyncOptions = (inputValue) => {
    return new Promise((resolve) => {
      resolve(suggestions.filter((suggestion) =>
        inputValue && suggestion.label.toLowerCase().includes(inputValue.toLowerCase())
      ));
    });
  }


  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  const Component = (async || fakeAsync) ? AsyncSelect : Select;
  const error = meta && meta.touched && meta.error;

  const optionsGetter = fakeAsyncOptions; //async ? loadAsyncOptions : this.fakeAsyncOptions;

  const props = omitBy({
    options: (!async && !fakeAsync) ? suggestions : null,
    loadOptions: (async || fakeAsync) ? debounce(optionsGetter, 1000) : null,
    cacheOptions: async
  }, (prop) => !prop);


  return (
    <FieldWrapper>
      <Component
        {...props}
        classes={classes}
        menuIsOpen={menuIsOpen}
        isClearable
        isDisabled={isDisabled}
        styles={selectStyles}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        components={{ ...defaultComponents, ...components }}
        isSearchable={!readonly}

        inputId="react-select-single"
        TextFieldProps={{
          label: 'Country',
          InputLabelProps: {
            htmlFor: 'react-select-single',
            shrink: true,
          },
        }}
      />
      {error && (
        <Error> {error} </Error>
      )}
    </FieldWrapper>
  );

}