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

import { fetchFirebaseData } from '../../actions/firebase';

import FirebaseWrapper from '../../containers/FirebaseWrapper';

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
  const { httpbin = {} } = props;

  const [methodType, setCurrency] = useState('GET');
  const [queryParameters, setQueryParameters] = useState('');
  const [bodyParameters, setBodyParameters] = useState('');
  const [response, setResponse] = useState({});
  const [responseIsLoad, setResponseIsLoad] = useState(true);

  useEffect(() => {
    props.fetchFirebaseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <FirebaseWrapper>
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
    </FirebaseWrapper>
  );
};

const mapStateToProps = (props) => ({
  httpbin: props.httpbin.data,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchFirebaseData: fetchFirebaseData,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(HttpBin);
