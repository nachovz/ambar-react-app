import React from 'react';
import Typography from 'app/components/ui/Typography';
import Icon from 'app/components/ui/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Row from 'app/components/ui/Row';
import Box from '@material-ui/core/Box';
import { DarkContainer } from './elements';
import Spacer from 'app/components/ui/Spacer';

const TopBar = ({
  title,
  rightText,
  actionIcon,
  action,
  secondaryActionIcon,
  secondaryAction,
  extraActionIcon,
  extraAction,
	children,
  ...props
}) => (
    <DarkContainer>
      <ListItem {...props} >
        <ListItemText
          disableTypography
          primary={
            <Row spaceBetween>
              <Box fontWeight={500}>
                {title}
              </Box>
							{children ? <></> :
								<Typography noWrap variant="caption" display="block">
									{rightText}
								</Typography>
							}
            </Row>
          }
        />
					{children} 
					<ListItemSecondaryAction>
						<Row>
							{!!actionIcon &&
								<IconButton edge="end" aria-label={actionIcon} onClick={action}>
									<Icon icon={actionIcon} />
								</IconButton>
							}
							{!!extraActionIcon &&
								<React.Fragment>
									<Spacer direction="horizontal"/>
									<IconButton
										edge="end"
										aria-label={extraActionIcon}
										onClick={extraAction}>
										<Icon icon={extraActionIcon} />
									</IconButton>
								</React.Fragment>
							}
							{!!secondaryActionIcon &&
								<React.Fragment>
									<Spacer direction="horizontal"/>
									<IconButton
										edge="end"
										aria-label={secondaryActionIcon}
										onClick={secondaryAction}>
										<Icon icon={secondaryActionIcon} />
									</IconButton>
								</React.Fragment>
							}
						</Row>
					</ListItemSecondaryAction>
      </ListItem>
    </DarkContainer>
  );

export default TopBar;