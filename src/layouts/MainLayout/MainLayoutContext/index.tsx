import { createContext, Dispatch, useReducer } from 'react';

import { IUserDetail } from 'interfaces/user.interface';

// Type / Interface
type TInitialState = { me: IUserDetail | undefined };
type TAction<T> = { type: string; payload?: T };

// Acton type
const UPDATE_USER_ME = 'UPDATE_USER_ME';

// Initial State
const initialState: TInitialState = {
  me: undefined,
};

// Reducer
function reducer(state: TInitialState, action: TAction<IUserDetail>) {
  switch (action.type) {
    case UPDATE_USER_ME: {
      return { ...state, me: action.payload };
    }
    default: {
      return state;
    }
  }
}

// Declare Context
const MainLayoutContext = createContext<
  TInitialState & { updateUserMe: (user: IUserDetail) => void; dispatch: Dispatch<any> }
>({
  me: undefined,
  updateUserMe: () => null,
  dispatch: () => null,
});

// Declare Provider
function MainLayoutProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function updateUserMe(user: IUserDetail) {
    dispatch({ type: UPDATE_USER_ME, payload: user });
  }

  return (
    <MainLayoutContext.Provider value={{ ...state, updateUserMe, dispatch }}>
      {children}
    </MainLayoutContext.Provider>
  );
}

export { MainLayoutProvider, MainLayoutContext };
