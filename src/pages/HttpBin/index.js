import React, { useState, useEffect } from 'react';

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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchHttpBinData } from '../../actions/httpbin';

const mapStateToProps = (props) => ({
  httpbin: props.httpbin.httpbin,
  common: props.common,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchHttpBinData: fetchHttpBinData,
    },
    dispatch,
  );

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

const HttpBin = (props) => {
  const classes = useStyles();
  const {
    httpbin = {},
    common: { init = false, error = null },
  } = props;

  const [methodType, setCurrency] = useState('GET');
  const [queryParameters, setQueryParameters] = useState('');
  const [bodyParameters, setBodyParameters] = useState('');
  const [response, setResponse] = useState({});
  const [responseIsLoad, setResponseIsLoad] = useState(true);

  if (init) {
    props.fetchHttpBinData();
  }

  useEffect(() => {
    setQueryParameters(JSON.stringify(httpbin.queryParameters));
    setBodyParameters(JSON.stringify(httpbin.data));
  }, [httpbin]);

  const createRequest = () => {
    const baseURL = 'https://httpbin.org/';
    setResponseIsLoad(false);
    try {
      axios({
        method: methodType,
        baseURL: baseURL,
        url: methodType.toLowerCase(),
        data: bodyParameters.length === 0 ? {} : JSON.parse(bodyParameters),
        params: queryParameters.length === 0 ? {} : JSON.parse(queryParameters),
      })
        .then((response) => {
          setResponseIsLoad(true);
          setResponse(response);
        })
        .catch((error) => {
          setResponseIsLoad(true);
          if (error.response) {
            setResponse(error.response.data);
          } else if (error.request) {
            setResponse(error.request);
          } else {
            setResponse(error.message);
          }
        });
    } catch (error) {
      setResponseIsLoad(true);
      setResponse(error.message);
    }
  };

  if (Object.keys(httpbin).length === 0 && error === null) {
    return (
      <div align="center">
        <CircularProgress color="inherit" size={20} />
      </div>
    );
  } else if (error) {
    return (
      <div align="center">
        <p>{error}</p>
      </div>
    );
  }
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
        <Grid item xs={8}></Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              className={classes.sendButton}
              onClick={() => {
                if (responseIsLoad) {
                  createRequest();
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
            label="Query parameters"
            helperText="Query parameters"
            rows={6}
            rowsMax={15}
            value={queryParameters}
            onChange={(event) => {
              setQueryParameters(event.target.value);
            }}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(HttpBin);
