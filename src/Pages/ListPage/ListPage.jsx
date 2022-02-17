import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchBook, fetchNewBooks } from "../../redux/actions/actions";
import { Loader } from "../../components/Loader/Loader";
import "./ListPage.scss";
import { ListItem } from "../../components/ListItem/ListItem";
import { Error } from "../../components/Error/Error";

export const ListPage = () => {
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState();
  const [sort, setSort] = useState();

  const filtres = [
    "all",
    "art",
    "biography",
    "computers",
    "history",
    "medical",
    "poetry",
  ];
  const sorts = ["relevance", "newest"];

  const dispatch = useDispatch();
  const {
    loading,
    books,
    totalItems,
    startIndex,
    ended,
    searchString,
    loadBtn,
    error,
  } = useSelector((state) => state.list);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      dispatch(fetchSearchBook(search));
    }
  };
  const handleSearch = (e) => {
    setSearch(e);
  };
  const handleFilterSort = (filter, sort) => {
    if (!books || !searchString) {
      return;
    } else {
      setFilter(filter);
      setSort(sort);
      dispatch(fetchSearchBook(searchString, startIndex, filter, sort));
    }
  };
  if (error) {
    return <Error />;
  }

  const renderBookList = (arr) => {
    if (loading) {
      return <Loader />;
    }
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Books not found</h5>;
    }

    return arr.map((book, i) => (
      <ListItem key={book.id + i} id={book.id} {...book.volumeInfo} />
    ));
  };

  return (
    <div className="list">
      <div className="container">
        <div className="list__search">
          <input
            type="text"
            className="form-control list__search-input"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => handleKey(e)}
          />
          <button
            onClick={() => dispatch(fetchSearchBook(search))}
            className="btn btn-primary"
          >
            Search
          </button>
        </div>
        <div className="list__select">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => handleFilterSort(e.target.value, sort)}
          >
            {filtres.map((filterItem, i) => (
              <option key={i + filterItem} value={filterItem}>
                {filterItem}
              </option>
            ))}
          </select>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => handleFilterSort(filter, e.target.value)}
          >
            {sorts.map((sortItem, i) => (
              <option key={i + sortItem} value={sortItem}>
                {sortItem}
              </option>
            ))}
          </select>
        </div>
        <div className="list__main">
          {!books ? (
            <h2 className="list__title">
              {loading ? <Loader /> : "Let search books!!!"}
            </h2>
          ) : (
            <>
              {books.length === 0 ? null : (
                <h2 className="list__title">Total found: {totalItems}</h2>
              )}
              <div className="list__main-inner">{renderBookList(books)}</div>
              {books.length === totalItems || ended ? null : (
                <button
                  onClick={() =>
                    dispatch(fetchNewBooks(searchString, startIndex))
                  }
                  className={loadBtn || loading ? "none" : "btn btn-success"}
                  disabled={loadBtn ? true : false}
                >
                  {loadBtn ? <Loader /> : "Load more"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
