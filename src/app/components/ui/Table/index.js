import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: '120vw',
  },
  tableWrapper: {
    maxHeight: `50vh`,
    overflow: 'auto',
  }
});

const Table = ({ title, size="medium", headers, noScrolling=false, children }) => {
  const classes = useStyles();
  return(
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <TableUI className={!noScrolling ? classes.table:""} size={size}>
          <TableHead>
            <TableRow>
              <TableCell >
                {title}
              </TableCell>
              { headers.map( (header, ind) => (
                <TableCell key={ind} align="right">{header}</TableCell>  
              ) )}
            </TableRow>
          </TableHead>
          <TableBody>
            {children}
          </TableBody>
        </TableUI>
      </div>
    </Paper>
  );
}
export default Table;