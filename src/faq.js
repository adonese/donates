import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

class FAQ extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            {"How this thing works"}
          </Typography>
          <Typography>
            Click here if you want to know more about it.
          </Typography>
        </Box>
      </Container>
    );
  }
}

export default FAQ
