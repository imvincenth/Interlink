// import * as ConnectionAPIUtil from '../util/connection_api_util';

// export const RECEIVE_CONNECTIONS = 'RECEIVE_CONNECTIONS';
// export const RECEIVE_CONNECTION = 'RECEIVE_CONNECTION';
// export const REMOVE_CONNECTION = 'REMOVE_CONNECTION';
// export const RECEIVE_CONNECTION_ERRORS = 'RECEIVE_CONNECTION_ERRORS';
// export const REMOVE_ERRORS = 'REMOVE_ERRORS';

// const receiveConnections = connections => ({
//   type: RECEIVE_CONNECTIONS,
//   connections
// });

// const receiveConnection = connection => ({
//   type: RECEIVE_CONNECTION,
//   connection
// });

// const removeConnection = connectionId => ({
//   type: REMOVE_CONNECTION,
//   connectionId
// });

// export const receiveErrors = errors => ({
//   type: RECEIVE_CONNECTION_ERRORS,
//   errors
// });

// export const removeErrors = () => ({
//   type: REMOVE_ERRORS
// });

// export const fetchConnections = () => dispatch => (
//   ConnectionAPIUtil.fetchConnections()
//     .then(connections => (dispatch(receiveConnections(connections))), 
//     err => (dispatch(receiveErrors(err.responseJSON))))
// );

// export const createConnection = connection => dispatch => (
//   ConnectionAPIUtil.createConnection(connection)
//     .then(connection => (dispatch(receiveConnection(connection))), 
//     err => (dispatch(receiveErrors(err.responseJSON))))
// );

// export const updateConnection = connection => dispatch => (
//   ConnectionAPIUtil.updateConnection(connection)
//     .then(connection => (dispatch(receiveConnection(connection))),
//     err => (dispatch(receiveErrors(err.responseJSON))))
// );

// export const deleteConnection = connectionId => dispatch => (
//   ConnectionAPIUtil.deleteConnection(connectionId)
//     .then(() => (dispatch(removeConnection(connectionId))),
//     err => (dispatch(receiveErrors(err.responseJSON))))
// );