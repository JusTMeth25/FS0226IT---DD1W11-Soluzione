export const ADD_TO_FAVOURITES = "ADD_TO_FAVOURITES";
export const REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES";

export const GET_JOBS_LOADING = "GET_JOBS_LOADING";
export const GET_JOBS_SUCCESS = "GET_JOBS_SUCCESS";
export const GET_JOBS_ERROR = "GET_JOBS_ERROR";

export const addToFavouritesAction = (companyName) => ({
  type: ADD_TO_FAVOURITES,
  payload: companyName,
});

export const removeFromFavouritesAction = (companyName) => ({
  type: REMOVE_FROM_FAVOURITES,
  payload: companyName,
});

export const getJobsAction = (query) => {
  return async (dispatch) => {
    dispatch({ type: GET_JOBS_LOADING });

    try {
      const response = await fetch(
        `https://strive-benchmark.herokuapp.com/api/jobs?search=${query}&limit=20`,
      );

      if (response.ok) {
        const { data } = await response.json();

        dispatch({
          type: GET_JOBS_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: GET_JOBS_ERROR,
          payload: "Errore nel recupero dei risultati",
        });
      }
    } catch (error) {
      dispatch({
        type: GET_JOBS_ERROR,
        payload: error.message,
      });
    }
  };
};
