import "./ListItem.scss";
import { Link } from "react-router-dom";
import { noImage } from "../../api/api";
export const ListItem = (props) => {
  const { title, imageLinks, authors, categories, id } = props;

  const renderTitle = (str) => {
    if (str.length > 30) {
      return <h5 className="card-title">{str.slice(0, 30)}...</h5>;
    } else {
      return <h5 className="card-title">{str}</h5>;
    }
  };

  return (
    <div className="card" style={{ width: "250px" }}>
      <img
        src={!imageLinks ? noImage : imageLinks.smallThumbnail}
        className="card-img-top"
        alt={title}
      />

      <div className="card-body">
        <ul>
          {!categories ? (
            <li>No categories</li>
          ) : (
            categories.map((item, i) => {
              return <li key={i + item}>{item}</li>;
            })
          )}
        </ul>
        {renderTitle(title)}
        <ul>
          {!authors ? (
            <li>Not data</li>
          ) : (
            authors.map((author, i) => {
              return <li key={i + author}>{author}</li>;
            })
          )}
        </ul>
        <Link to={`${id}`} className="btn btn-primary">
          Read more
        </Link>
      </div>
    </div>
  );
};
