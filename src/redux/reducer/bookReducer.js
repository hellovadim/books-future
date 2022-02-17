import {
  FETCHING_BOOK,
  FETCH_BOOK_SUCCSES,
  ERROR__TRUE,
} from "../constant/constant";

const initialState = { loading: true, book: null, error: false };

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_BOOK:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BOOK_SUCCSES:
      return {
        ...state,
        loading: false,
        book: action.payload,
      };
    case ERROR__TRUE: {
      return {
        ...state,
        error: true,
      };
    }
    default: {
      return state;
    }
  }
};
export default bookReducer;
