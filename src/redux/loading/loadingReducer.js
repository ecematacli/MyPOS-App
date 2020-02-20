export default (state = {}, action) => {
  const { type } = action;

  const parts = type.split('_');
  const status = parts[parts.length - 1];
  const actionName = parts.slice(0, -1).join('_');

  if (type.match(/(.*)_(REQUEST|SUCCESS|FAILURE)/)) {
    return {
      ...state,
      [actionName]: status === 'REQUEST'
    };
  }

  return state;
};

export const loadingSelector = (action, state) => state.loading[action];
