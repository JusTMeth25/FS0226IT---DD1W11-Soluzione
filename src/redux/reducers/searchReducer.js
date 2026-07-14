import { GET_JOBS_LOADING, GET_JOBS_SUCCESS, GET_JOBS_ERROR } from "../actions";

const initialState = {
  results: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JOBS_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };

    case GET_JOBS_SUCCESS:
      return {
        ...state,
        results: action.payload,
        isLoading: false,
        isError: false,
        errorMessage: "",
      };

    case GET_JOBS_ERROR:
      return {
        ...state,
        results: [],
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default searchReducer;
