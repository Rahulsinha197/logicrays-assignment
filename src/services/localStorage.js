const key = "ddwelling";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const lcStateDef = {
  auth: "auth",
  user: "user",
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch {
    // ignore write errors
  }
};

export const get = ({ key }) => {
  const state = loadState();
  return state[key];
};

export const set = ({ key, value }) => {
  const state = loadState() || {};
  const updatedState = {
    ...state,
    [key]: value,
  };
  saveState(updatedState);
  return updatedState[key];
};

export const setAuth = ({ value }) => {
  return set({ key: lcStateDef.auth, value });
};
export const getAuth = () => {
  return get({ key: lcStateDef.auth });
};
export const setUser = ({ value }) => {
  return set({ key: lcStateDef.user, value });
};
export const getUser = () => {
  return get({ key: lcStateDef.user });
};

export const removeUserToken = () => {
  setAuth({ value: null });
  setUser({ value: null });
};
