// load data here
const loadData = async () => {
  // get input text
  const searchInput = document.getElementById('search');
  const searchText = searchInput.value;
  console.log(searchText);

  //api fetch
  // const url = `http://openlibrary.org/search.json?q=javascript`;

  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  showData(data.docs);
};

const showData = (bookList) => {
  // console.log(bookList[0]);
  const bookContainer = document.getElementById('book-container');

  bookList.forEach((book) => {
    // console.log(book.title, book.first_publish_year, book.publisher[0]);
    // const { title, first_publish_year, publisher } = book;
    const div = document.createElement('div');
    div.classList.add('col');

    div.innerHTML = `
    <div class="card">
        <img class="img-thumbnail" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="..." />
        <div class="card-body">
            <h5 class="card-title">Book Name:${book.title}</h5>
            <p class="card-text">First-Published: 
            <span class="fw-bold">${book.first_publish_year}</span>
            </p>
            <p class="card-text">Publisher: 
            <span class="fw-bold">${book.publisher[0]}</span>
            </p>
            <p class="card-text">Writer: 
            <span class="fw-bold">${book.author_name[0]}</span>
            </p>
            
        </div>
    </div>
    `;
    bookContainer.appendChild(div);
  });
};
