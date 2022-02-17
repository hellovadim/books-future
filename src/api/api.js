const _apiBase = "https://www.googleapis.com/books/v1/volumes";
const _max = "30";
const _start = "0";
const API_KEY = "AIzaSyBnAcqT4B3VQfYvkgp14RBDsXxTncn__go";
export const noImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEW7u7vz8/O4uLjb29vk5OTs7Ozh4eHZ2dny8vLu7u7q6ur29va9vb22trbn5+fGxsbQ0NDJycnU1NSwsLCMcr6HAAAESklEQVR4nO2bgXKiMBCGSTSaJQkIff93vf2X1lqF3tydTlfv/6YdFZTJ191sFopdRwghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYSQvyM+jp9WW6jz7lHM9aflDCnhURT5aTklzo8TVMX55xM1HmCYH2CHY5aDA8OdDWfY35vBjrvzYjg+oI6Ofgxz2cf7F70a9yU7MQzh8BDDg5sYwvDPPxdrrfG7v8yTG8ap11op83dv8W34m6xd1hgs6dtvdG7Yaf5tDw6CeVnztrsW54bxWOTUtoY3fvZBZdPBuSEcSj+uj09DeG6CSt48smvDOLw3XXVthFEuerMybh3Zs2Gc3tOwhHnlJC9edp9l2jqya0P5zEKZ2s1nLhv1p4yhlplLhUGn45dFwcZ+DuLmkR0b1usTod3VdHz2WvqxnF+EMZ/W35Gx5Nf1BsGx4bhy1l/S5coRzz1Nql3r0KCuHNmtYexvBfPHyrEEq6IvDaWgL22jnlxO8TaMbg3jaePCTQnHi0ZOo2bnFnqKoY5v403B9WvYbV+zuZ6O6tjFsY2tra0YHg0xnd6v22w5putgwTDW40rv49FQMy7W31xcvGnk6tjqUNL1guLSENOq7c9N9We25i89TJltOmqCWumJ43gIfQphvlg0KvLXnaFVfKwU+YvWWS/rM3tR8mT/k6it4iHWJPiz5DSd/1OBR2+GKI0txr5IQkCk71NS14yXomJiW2wfUnVEFW3VrtUcRFRP9+YDAttZaLHdlaEOuKnhSdVS35ckKQ1QhJSIxkg3ABEoZpFZ/RroTrJPQcxe0rE2ZK9ur82ZIcYVuz7LIBozjFYHHSyCiKa+EmzRF5qQsE5z94Z+LeY0SIA7yP3JlsrRnWF909xqOx3jgBxNJgpTPdlVLY2l/sJQfyyHs55z6EdinItGO/S9FLXX55KmN9RkZ1naVYuHpIyUUyd90NwMOuCsrxDQfnkUMxx6i+RBUzUFMxxgl4ruCXK0mmq9qxtDJGlrey0WGCImYxo0EwNmIYrNF0PdMCQtPth3PEp4jyG89bkail3EijvNXi//e0Klad2kQ7NhauuSMANNBnmbUEk/DBf0U2kJ7rVhQSYPunLMwz77Mexa7VDvMeFQLNMiYxVEpxbmYD5XGxW0RdKe5tDDUn+1KKklNuiOozvD2k4i5ras8CiMSEX1yrbeYeIJ1sWCRF2aAJuU2Few3x7xXltNYrfTxdOR4XLp4va8Il9v/Wzhcrht8M693S66qzQ3ly7+CTMMrgzXLl28lGHc0ZCGNKQhDWlIQxrS8CkM73mPaXZoeCr35eTNsHbT8Z5Mru5NxP2leHbPo+LX0/2lr36PMErfK9/n/fr36r/89y1e/zsz/8P3nl7/u2uEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCyBPyC1stQARopdgqAAAAAElFTkSuQmCC";

export const errorMsg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7tXrGlHXTOohTFIStW0SbGZ_FINaWFC6vOQ&usqp=CAU";
export const getResource = async (url) => {
  let res = await fetch(url);
  if (!res.ok) {
    throw new Error(` Could not fetch ${url} , status ${res.status}`);
  }
  return await res.json();
};

export const getSearchBooks = async (
  search,
  start = _start,
  filter = "all",
  sort = "relevance"
) => {
  if (filter === "all") {
    const result = await getResource(
      `${_apiBase}?q=${search}&key=${API_KEY}&startIndex=${start}&maxResults=${_max}`
    );
    return await result;
  } else {
    const result = await getResource(
      `${_apiBase}?q=${search}+subject:${filter}&orderBy=${sort}&key=${API_KEY}&startIndex=${start}&maxResults=${_max}`
    );
    return await result;
  }
};
export const getBookById = async (id) => {
  const result = await getResource(`${_apiBase}/${id}?key=${API_KEY}`);
  return await result.volumeInfo;
};
