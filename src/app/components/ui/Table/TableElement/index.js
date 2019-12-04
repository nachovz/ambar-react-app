import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRowUI from '@material-ui/core/TableRow';
import Icon from 'app/components/ui/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from 'app/components/ui/Typography';

const TableElement = ({ title, subtitle, cells, actionIcon, action }) =>(
  <TableRowUI key={title}>
    <TableCell component="th" scope="row">
      <Typography>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {subtitle}
      </Typography>
    </TableCell>
    {cells && cells.length > 0 && cells.map( (value, ind) => (
      <TableCell key={ind} align="right">{value}</TableCell>
    ))}
    {!!actionIcon && 
      <TableCell align="right">
        <IconButton
          edge="end"
          aria-label={actionIcon}
          onClick={action}
        >
          <Icon
            icon={actionIcon}
            color="primary"
            fontSize="small"
          />
        </IconButton>
      </TableCell>
    }
  </TableRowUI>
)

export default TableElement;