import "./BookPage.scss";
import { Loader } from "../../components/Loader/Loader";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { bookLoad } from "../../redux/actions/actions";
import { noImage } from "../../api/api";
import { Error } from "../../components/Error/Error";

export const BookPage = () => {
  const { id } = useParams();
  let history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bookLoad(id));
    //eslint-disable-next-line
  }, []);

  const { loading, book, error } = useSelector((state) => state.book);
  if (error) {
    return <Error />;
  }
  return (
    <div className="book">
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <button
            className="btn btn-info book__btn"
            onClick={() => history("/")}
          >
            Go back
          </button>
          <div className="book__inner">
            <div className="book__img">
              <img
                src={!book.imageLinks ? noImage : book.imageLinks.thumbnail}
                className="card-img-top"
                alt={book.title}
              />
            </div>
            <div className="book__descr">
              <ul>
                {!book.categories ? (
                  <li>No categories</li>
                ) : (
                  book.categories.map((item, i) => {
                    return <li key={i + item}>{item}</li>;
                  })
                )}
              </ul>
              <ul>
                {!book.authors ? (
                  <li>Not data</li>
                ) : (
                  book.authors.map((author, i) => {
                    return <li key={i + author}>{author}</li>;
                  })
                )}
              </ul>
              <h2>{book.title}</h2>
              <p>{book.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
