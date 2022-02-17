import {
  ON_BOOKS_LOADING,
  ON_BOOKS_SEARCH_LOADED,
  ADD_BOOKS,
  FETCHING_BOOK,
  FETCH_BOOK_SUCCSES,
  LOAD_BTN,
  ERROR__TRUE,
} from "../constant/constant";
import { getSearchBooks, getBookById } from "../../api/api";

export function fetchSearchBook(str, index, filter, sort) {
  if (str.trim() === "") {
    return;
  }

  return async (dispatch) => {
    dispatch(onBooksLoading());
    try {
      await getSearchBooks(str, index, filter, sort).then((res) =>
        dispatch(onBooksLoaded(res.items, res.totalItems, str))
      );
    } catch (e) {
      dispatch(onError());
      console.log(e);
    }
  };
}

export function onBooksLoading() {
  return {
    type: ON_BOOKS_LOADING,
  };
}
export function onError() {
  return {
    type: ERROR__TRUE,
  };
}

export function onBooksLoaded(books, totalItems, str) {
  return {
    type: ON_BOOKS_SEARCH_LOADED,
    books,
    totalItems,
    searchString: str,
  };
}
export function onLoadBtn() {
  return {
    type: LOAD_BTN,
  };
}
export function fetchNewBooks(str, index) {
  return async (dispatch) => {
    dispatch(onLoadBtn());
    try {
      await getSearchBooks(str, index).then((res) =>
        dispatch(addBooks(res.items))
      );
    } catch (e) {
      dispatch(onError());
      console.log(e);
    }
  };
}
export function addBooks(newItems) {
  return {
    type: ADD_BOOKS,
    newItems,
  };
}

export function bookPageLoading() {
  return {
    type: FETCHING_BOOK,
  };
}
export function bookLoaded(book) {
  return {
    type: FETCH_BOOK_SUCCSES,
    payload: book,
  };
}
export function bookLoad(id) {
  return async (dispatch) => {
    dispatch(bookPageLoading());
    try {
      await getBookById(id).then((res) => dispatch(bookLoaded(res)));
    } catch (e) {
      dispatch(onError());
      console.log(e);
    }
  };
}
