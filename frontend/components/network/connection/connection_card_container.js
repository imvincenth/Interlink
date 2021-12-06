import React from 'react';
import { connect } from 'react-redux';
import Connection from './connection_card';

const mSTP = state => ({
  currentUser: state.entities.users[state.session.id],
});

const mDTP = dispatch => ({

});

export default connect(mSTP, mDTP)(Connection);