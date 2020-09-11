import React, { useState } from 'react';

import {
  Container,
  Grid,
  Paper,
  Button,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

import FormInput from '../../components/FormInput';
import SelectFormInput from '../../components/SelectFormInput';

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: '1360px',
    padding: '10px',
    margin: '0 auto',
    boxShadow: 'none',
  },
  sendButton: {
    width: '100%',
    marginTop: '14px',
    height: '42px',
  },
}));

// ----------------------- EXAMPLES
const exampleJson = `{"name":"Molecule Man","age":29,"secretIdentity":"Dan Jukes","powers":["Radiation resistance","Turning tiny","Radiation blast"]}`;
// --------------------------END EXAMPLES

const HttpBin = () => {
  const classes = useStyles();
  const [methodType, setCurrency] = useState('GET');
  const [queryParameters, setQueryParameters] = useState('get');
  const [bodyParameters, setBodyParameters] = useState(exampleJson);
  const [response, setResponse] = useState({});
  const [responseIsLoad, setResponseIsLoad] = useState(true);

  const createRequest = () => {
    const axiosConfig = {
      method: methodType,
      baseURL: `https://httpbin.org/`,
      data: JSON.parse(bodyParameters),
      url: queryParameters,
    };

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios(axiosConfig)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            resolve(error);
          });
      }, 3000);
    });
  };

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5">HTTP BIN</Typography>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <SelectFormInput
            value={methodType}
            label="Method"
            onChange={(event) => {
              setCurrency(event.target.value);
              setQueryParameters(event.target.value.toLowerCase());
            }}
            helperText="Please select request method"
          />
        </Grid>
        <Grid item xs={8}>
          <FormInput
            label="URL query parameters "
            helperText="Query parameters. For example: /get, /post, /path, /delete More details on https://httpbin.org/"
            value={queryParameters}
            onChange={(event) => {
              setQueryParameters(event.target.value);
            }}
            error={queryParameters.length === 0}
          />
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              className={classes.sendButton}
              onClick={() => {
                setResponseIsLoad(false);
                if (queryParameters.length !== 0)
                  createRequest().then((data) => {
                    setResponseIsLoad(true);
                    setResponse(data);
                  });
              }}
            >
              {responseIsLoad ? (
                <Typography>SEND</Typography>
              ) : (
                <CircularProgress color="inherit" size={20} />
              )}
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <FormInput
            label="Query body parameters"
            helperText="Body parameters"
            rows={6}
            rowsMax={15}
            value={bodyParameters}
            onChange={(event) => {
              setBodyParameters(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            label="Server Response "
            rows={6}
            rowsMax={250}
            value={JSON.stringify(response, undefined, 2)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HttpBin;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     '& > * + *': {
//       marginLeft: theme.spacing(2),
//     },
//   },
// }));
