import React from 'react';
import { storiesOf } from '@storybook/react';
import { styled } from 'styletron-react';
import Icon from '../';
import PaddedContainer from 'app/components/ui/PaddedContainer';
import ICONS from 'app/constants/icons';


const IconHolder = styled('div', {
  textAlign: 'center',
  margin: '20px',
  width: '100px'
});

storiesOf('Icon', module)
  .add('Sizes', () => (
    <PaddedContainer>
      {ICONS.map( (icon, ind) => (
        <IconHolder key={ind}>
          <PaddedContainer>
            <Icon
              icon={icon}
              fontSize="small"
            />
            <Icon
              icon={icon}
              fontSize="default"
            />
            <Icon
              icon={icon}
              fontSize="large"
            />
          </PaddedContainer>
          <br/>
          <span> { icon } </span>
        </IconHolder>
        ))
      }
    </PaddedContainer>
  )).add('appearance - regular', () => (
    <PaddedContainer>
      {ICONS.map((icon, ind) => (
        <IconHolder key={ind}>
          <Icon icon={icon} />
          <br/>
          <span> { icon } </span>
        </IconHolder>
        ))
      }
    </PaddedContainer>
  )).add('appearance - action', () => (
    <PaddedContainer>
      {ICONS.map( (icon, ind) => (
        <IconHolder key={ind}>
          <Icon
            icon={icon}
            color="action"
          />
          <br/>
          <span> { icon } </span>
        </IconHolder>
        ))
      }
    </PaddedContainer>
  )).add('appearance - primary', () => (
    <PaddedContainer>
      {ICONS.map((icon, ind) => (
        <IconHolder key={ind}>
          <Icon
            icon={icon}
            variant="h2"
            color="primary"
          />
          <br/>
          <span> { icon } </span>
        </IconHolder>
        ))
      }
    </PaddedContainer>
  )).add('appearance - secondary', () => (
    <PaddedContainer>
      {ICONS.map( (icon, ind) => (
        <IconHolder key={ind}>
          <Icon
            icon={icon}
            variant="h2"
            color="secondary"
          />
          <br/>
          <span> { icon } </span>
        </IconHolder>
        ))
      }
    </PaddedContainer>
  )).add('appearance - inverted', () => (
    <PaddedContainer $backgroundColor="black">
      {ICONS.map( (icon, ind) => (
        <IconHolder key={ind}>
          <Icon
            icon={icon}
          />
          <br/>
          <span> { icon } </span>
        </IconHolder>
        ))
      }
    </PaddedContainer>
  ));