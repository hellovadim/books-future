import { Header } from "../Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ListPage } from "../../Pages/ListPage/ListPage";
import { BookPage } from "../../Pages/BookPage/BookPage";
import {Footer} from "../Footer/Footer"

function App() {
  return (
    <Router basename="/">
      <Header />
      <Routes>
        <Route path="/" exact element={<ListPage />} />
        <Route path="/:id" exact element={<BookPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
