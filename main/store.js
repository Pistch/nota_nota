const {
  configureStore,
  createAction,
  createReducer,
} = require('@reduxjs/toolkit');
const {ipcMain} = require('electron');

const {readStore, writeStore} = require('./store-persister');

const INITIAL_STATE = {
  items: readStore(),
  focusedItem: null,
};
const actions = {
  items: {
    create: createAction('CREATE_ITEM'),
    delete: createAction('DELETE_ITEM'),
    focus: createAction('FOCUS_ITEM'),
  },
};
const rootReducer = createReducer(INITIAL_STATE, {
  [actions.items.create.type]: (state, action) => ({
    ...state,
    items: [...state.items, action.payload],
  }),
  [actions.items.delete.type]: (state, action) => {
    const newState = {
      ...state,
      items: state.items.filter((item) => item !== action.payload),
    };

    if (action.payload === state.focusedItem) {
      newState.focusedItem = null;
    }

    return newState;
  },
  [actions.items.focus.type]: (state, action) => ({
    ...state,
    focusedItem: action.payload,
  }),
});

function get(obj, pathString, defaultValue) {
  const path = pathString.split('.');
  let currentObj = obj;

  while (path.length) {
    const pathItem = path.shift();

    if (Object.prototype.hasOwnProperty.call(currentObj, pathItem)) {
      currentObj = currentObj[pathItem];
    } else {
      return defaultValue;
    }
  }

  return currentObj;
}

function initStore(params) {
  const store = configureStore(params);

  ipcMain.on('redux-action', (_, {type, payload}) => {
    store.dispatch(get(actions, type, () => { })(payload));
  });

  store.subscribe(() => console.log(store.getState()));
  store.subscribe(() => {
    writeStore(store.getState().items);
  });

  return store;
}

module.exports = () => ({
  store: initStore({
    reducer: rootReducer,
  }),
  actions,
});
