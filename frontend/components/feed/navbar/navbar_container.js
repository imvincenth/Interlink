import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../../actions/user_actions';
import { openModal } from '../../../actions/modal_actions';
import Navbar from './navbar';

const mSTP = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id]
});

const mDTP = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  openSearchModal: (input) => dispatch(openModal("suggestions", input)),
  logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(Navbar);