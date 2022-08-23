import { Reducer, useReducer } from 'react';
import Search, { Photo } from '../Search';
import Choice from '../Choice';
import PhotoCard from '../PhotoCard';

import './app.scss';

type STAGE = 'search' | 'choice' | 'show';

interface State {
  name: string;
  surname: string;
  selection?: Photo;
  stage: STAGE;
}

type Action =
  | { type: 'search' }
  | { type: 'choice'; name: string; surname: string; selection: Photo }
  | { type: 'selection'; hasAccepted: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'search':
      return { ...state, stage: 'search' };

    case 'choice':
      return {
        ...state,
        stage: 'choice',
        name: action.name,
        surname: action.surname,
        selection: action.selection,
      };
    case 'selection':
      return {
        ...state,
        stage: action.hasAccepted ? 'show' : 'search',
        selection: !action.hasAccepted ? undefined : state.selection,
      };

    default:
      return state;
  }
}

function App() {
  const [{ stage, name, surname, selection }, dispatch] = useReducer<
    Reducer<State, Action>
  >(reducer, {
    stage: 'search',
    name: '',
    surname: '',
    selection: undefined,
  });

  return (
    <div className="app">
      <header>Shawbrook coding test</header>
      {stage === 'search' ? (
        <Search
          onSearch={(name, surname, photo) => {
            dispatch({
              type: 'choice',
              name,
              surname,
              selection: photo,
            });
          }}
        />
      ) : null}
      {stage === 'choice' && selection ? (
        <Choice
          photo={selection}
          onChoice={(hasAccepted) => {
            dispatch({
              type: 'selection',
              hasAccepted,
            });
          }}
        />
      ) : null}
      {stage === 'show' && selection ? (
        <PhotoCard name={name} surname={surname} photo={selection} />
      ) : null}
    </div>
  );
}

export default App;
