export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modal, params) => {
  return {
    type: OPEN_MODAL,
    modal,
    params
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};
