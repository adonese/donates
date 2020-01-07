import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from "@material-ui/core/Link"
import Box from '@material-ui/core/Box';

class Details extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            {"Donation Platform"}
          </Typography>
          <Typography>
            Donates Platform is a free platform where you can easily transfer fund to your favorite charities and NGOs.
            <ul>
              <li>If you want to place a funding campaign, please email us at: <Link href="mailto:info@soluspay.net">info@soluspay.net</Link></li>
              <li>We do some basic screening for funding campaigns, but we ask you to only donate to your trusted ones. We only check for the credibility of the campaign provider, and not what they are funding for!</li>
              <li>You will be given a unique key, you can use it to track your funding! (Not all of our clients support this feature)</li>
            </ul>
          </Typography>
          <Typography>
            Click <Link href="/faq">here if you want to know more about it.</Link>
          </Typography>
        </Box>
      </Container>
    );
  }
}

export default Details
