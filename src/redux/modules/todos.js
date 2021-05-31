// 액션 타입 정의
export const ADD_TODO = "redux-start/todos/ADD_TODO";
export const COMPLETE_TODO = "redux-start/todos/COMPLETE_TODO";

// 액션 생성 함수
// {type: ADD_TODO, text: 'todo'}
export function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
  };
}

// {type: COMPLETE_TODO, index: 0}
export function completeTodo(index) {
  return {
    type: COMPLETE_TODO,
    index,
  };
}

// 초기값
const initState = [];

// Reducer
export default function reducer(prevState = initState, action) {
  if (action.type === ADD_TODO) {
    return [...prevState, { text: action.text, done: false }];
  }

  if (action.type === COMPLETE_TODO) {
    return prevState.map((todo, index) => {
      if (index === action.index) {
        return { ...todo, done: true };
      }
      return todo;
    });
  }

  return prevState;
}
