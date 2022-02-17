import {
  ON_BOOKS_LOADING,
  ON_BOOKS_SEARCH_LOADED,
  ADD_BOOKS,
  LOAD_BTN,
  ERROR__TRUE,
} from "../constant/constant";

const initialState = {
  startIndex: 0,
  loading: false,
  books: null,
  totalItems: 0,
  error: false,
  ended: false,
  loadBtn: false,
  search: "",
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_BOOKS_LOADING:
      return {
        ...state,
        loading: true,
        startIndex: 0,
      };
    case ON_BOOKS_SEARCH_LOADED: {
      return {
        ...state,
        loading: false,
        books: action.books || [],
        totalItems: action.totalItems,
        startIndex: state.startIndex + 30,
        ended: false,
        searchString: action.searchString,
      };
    }
    case ADD_BOOKS:
      if (action.newItems.length < 30) {
        return {
          ...state,
          books: [...state.books, ...action.newItems],
          startIndex: state.startIndex + 30,
          loadBtn: false,
          ended: true,
        };
      } else {
        return {
          ...state,
          books: [...state.books, ...action.newItems],
          loadBtn: false,
          startIndex: state.startIndex + 30,
        };
      }
    case LOAD_BTN: {
      return {
        ...state,
        loadBtn: true,
      };
    }
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
export default listReducer;
