import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchFirebaseData } from '../../actions/firebase';

import Loader from '../../components/Loader';
import LoadError from '../../components/LoadError';

const FirebaseWrapper = ({ fetchFirebaseData, isLoading, error, children }) => {
  useEffect(() => {
    fetchFirebaseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <LoadError error={error} />;
  }

  return children;
};

const mapStateToProps = (props) => ({
  isLoading: props.firebase.isLoading,
  error: props.firebase.error,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchFirebaseData: fetchFirebaseData,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(FirebaseWrapper);
