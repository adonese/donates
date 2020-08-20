import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 50,
  },
});

export default function Success() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
      <Container maxWidth="md">
    <TableContainer component={Paper}>
    <h3>Successful Response</h3>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Message</TableCell>
            <TableCell>Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key="key">
              <TableCell >{this.props.location.state.message}</TableCell>
              <TableCell >2</TableCell>
            </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
      </Container>
    
  );
}