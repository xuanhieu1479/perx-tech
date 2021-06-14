import { GET_REPOSITORIES, GET_ORGANIZATIONS } from './type';

const initState = {
  repo: [],
  org: [],
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_REPOSITORIES:
      return {...state, repo: action.payload};
    case GET_ORGANIZATIONS:
      return {...state, org: action.payload};
    default:
      return state;
  }
}

export default userReducer;