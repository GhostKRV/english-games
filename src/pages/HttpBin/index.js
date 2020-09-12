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

import exampleJson from '../../data/httpbin_example.json';

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

const HttpBin = () => {
  const classes = useStyles();
  const [methodType, setCurrency] = useState('GET');
  const [queryParameters, setQueryParameters] = useState(
    JSON.stringify(exampleJson.requestConfig),
  );
  const [bodyParameters, setBodyParameters] = useState(
    JSON.stringify(exampleJson.data),
  );
  const [response, setResponse] = useState({});
  const [responseIsLoad, setResponseIsLoad] = useState(true);

  const createRequest = (queryParameters = {}) => {
    return new Promise((resolve, reject) => {
      if (queryParameters.length === 0) {
        queryParameters = `{}`;
      }
      try {
        const queryObject = JSON.parse(queryParameters);

        const axiosConfig = {
          method: methodType,
          baseURL: `https://httpbin.org/`,
          data: bodyParameters,
          url: methodType.toLowerCase(),
          ...queryObject,
        };

        setTimeout(() => {
          axios(axiosConfig)
            .then(({ data }) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        }, 1000);
      } catch (error) {
        reject(error);
      }
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
            }}
            helperText="Please select request method"
          />
        </Grid>
        <Grid item xs={8}>
          <FormInput
            label="Query parameters "
            helperText="Query parameters. Use JSON format to set query paremeters."
            multiline={false}
            value={queryParameters}
            rowsMax={1}
            onChange={(event) => {
              setQueryParameters(event.target.value);
            }}
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
                if (responseIsLoad) {
                  setResponseIsLoad(false);
                  createRequest(queryParameters).then(
                    (data) => {
                      setResponseIsLoad(true);
                      setResponse(data);
                    },
                    (error) => {
                      setResponseIsLoad(true);
                      setResponse(error.message);
                      console.log(error);
                    },
                  );
                }
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
