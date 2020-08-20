import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Clear from '@material-ui/icons/Clear';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';

class Fail extends React.Component {
  
  render() {
    return (
      <Container maxWidth="sm">
        <Box my={40}>

          < div >

            <p>{this.props.location.state.message}
            </p>
            <TableContainer component={Paper}>
    <h3>Successful Response</h3>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Message</TableCell>
            <TableCell>Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key="key">
              <TableCell >{this.props.location.state.message}</TableCell>
              <TableCell >{this.props.location.state.code}</TableCell>
            </TableRow>

        </TableBody>
      </Table>
    </TableContainer>

          </div>


        </Box>
      </Container>
    );
  }
}

export default Fail
