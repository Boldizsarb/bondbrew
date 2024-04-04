// post refresh upon following or unfollowing a user
// Action Types
const INCREMENT_REFRESH_TRIGGER = 'INCREMENT_REFRESH_TRIGGER';

// Action Creators
export const incrementRefreshTrigger = () => ({
  type: INCREMENT_REFRESH_TRIGGER,
});

// Reducer
const initialState = 0;

const refreshReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_REFRESH_TRIGGER:
      return state + 1;
    default:
      return state;
  }
};

export default refreshReducer;
