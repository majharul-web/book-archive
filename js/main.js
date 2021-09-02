// load data here
const loadData = async () => {
  // get input text
  const searchInput = document.getElementById('search');
  const searchText = searchInput.value;

  // error handling
  if (searchText === '') {
    document.getElementById('error-div').innerHTML = `
    <h2 class="text-center bg-warning text-danger p-3 rounded-3">Search field cannot be empty.</h2>
    `;
    return;
  }

  //spinner on
  spinner.classList.remove('d-none');

  // clear
  searchInput.value = '';
  document.getElementById('error-div').textContent = '';
  document.getElementById('total-result').textContent = '';
  document.getElementById('book-container').textContent = '';

  // fetch data
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();

  // error handling
  if (data.numFound === 0) {
    document.getElementById('error-div').innerHTML = `
    <h2 class="text-center bg-warning text-danger p-3 rounded-3">No result found!</h2>
    `;
  } else {
    document.getElementById('error-div').innerHTML = '';
  }

  showData(data.docs);
};

const showData = (bookList) => {
  // spinner of
  spinner.classList.add('d-none');

  // total result show
  document.getElementById('total-result').innerText = `${bookList.length} book found`;

  const bookContainer = document.getElementById('book-container');

  bookList.forEach((book) => {
    const div = document.createElement('div');
    div.classList.add('col');

    div.innerHTML = `
    <div class="card">
        <img class="img-thumbnail" src="https://covers.openlibrary.org/b/id/${
          book.cover_i
        }-M.jpg" alt="..." />
        <div class="card-body">
            <h5 class="card-title">Book Name:${book.title}</h5>
            <p class="card-text">Writer: 
            <span class="fw-bold">${book.author_name[0] ? book.author_name[0] : 'not available'}</span>
            </p>
            <p class="card-text">First-Published: 
            <span class="fw-bold">${book.first_publish_year}</span>
            </p>
            <p class="card-text">Publisher: 
            <span class="fw-bold">${book.publisher[0] ? book.publisher[0] : 'not available'}</span>
            </p>  
        </div>
    </div>
    `;
    bookContainer.appendChild(div);
  });
};
