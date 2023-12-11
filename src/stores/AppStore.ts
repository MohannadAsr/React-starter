export class AppReducerState {
  mode: 'dark' | 'light' = 'dark';
}

export type AppReducerActions =
  | { type: 'SwitchMode'; payload: 'dark' | 'light' }
  | { type: 'Something'; payload: string } // Each Actions Type is here
  | { type: 'AnotherAction'; payload: number };

const SwitchMode = (_state: AppReducerState, payload: 'dark' | 'light') => {
  localStorage.setItem('site-mode', JSON.stringify(payload));
  if (payload === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
  return { mode: payload } as AppReducerState;
};

export const AppReducer = (
  state: AppReducerState,
  action: AppReducerActions
): AppReducerState => {
  switch (action.type) {
    case 'SwitchMode':
      return SwitchMode(state, action.payload);
    default:
      return state;
  }
};
