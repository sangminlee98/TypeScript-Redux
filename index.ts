import { createStore } from 'redux';

const divToggle = document.querySelector('.toggle')! as HTMLDivElement;
const counter = document.querySelector('h1')! as HTMLHeadingElement;
const btnIncrease = document.querySelector('#increase')! as HTMLButtonElement;
const btnDecrease = document.querySelector('#decrease')! as HTMLButtonElement;

type State = {
  toggle: boolean,
  counter: number
}
type Type = 'TOGGLE_SWITCH' | 'INCREASE' | 'DECREASE';
type Action = {type: Type, deference?: number};

// actions
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const toggleSwitch = () => ({type: TOGGLE_SWITCH as Type});
const increase = (deference: number) => ({type: INCREASE as Type, deference});
const decrease = () => ({type: DECREASE as Type});

const initialState: State = {
  toggle: false,
  counter: 0
};

function reducer (state = initialState, action: Action) {
  switch(action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        toggle: !state.toggle
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter+ action.deference!
      }
    case DECREASE:
      return {
        ...state,
        counter: state.counter-1
      }
    default:
      return state;
  }
}

const store = createStore(reducer);

const render = () => {
  const state = store.getState();
  if(state.toggle) {
    divToggle.classList.add('active');
  } else {
    divToggle.classList.remove('active');
  }
  counter.innerText = state.counter.toString();
};

render();
store.subscribe(render);

divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
  store.dispatch(increase(1));
}
btnDecrease.onclick = () => {
  store.dispatch(decrease())
}