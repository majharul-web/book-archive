// ------------------------------load data function------------------------------
const loadData = async () => {
  // get input text
  const searchInput = document.getElementById('search');
  const searchText = searchInput.value;

  //empty input error handling -->
  if (searchText === '') {
    document.getElementById('error-div').innerHTML = `
    <h4 class="text-center bg-warning text-danger p-3 rounded-3">Search field cannot be empty.</h4>
    `;
    return;
  }

  //spinner on -->
  spinner.classList.remove('d-none');

  // clear content -->
  searchInput.value = '';
  document.getElementById('error-div').textContent = '';
  document.getElementById('total-result').textContent = '';
  document.getElementById('book-container').textContent = '';

  // fetch data from api -->
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();

  // error handling for un-valid user input -->
  if (data.numFound === 0) {
    document.getElementById('error-div').innerHTML = `
    <h4 class="text-center bg-warning text-danger p-3 rounded-3">No result found!</h4>
    `;
  } else {
    document.getElementById('error-div').innerHTML = '';
  }

  // call showData function -->
  showData(data);
};

// ---------------------show Data Function---------------------
const showData = (data) => {
  // spinner of  -->
  spinner.classList.add('d-none');

  // total search result show -->
  document.getElementById('total-result').innerText = `${data.numFound} books are available!`;

  // result show
  const bookContainer = document.getElementById('book-container');
  const bookList = data.docs;

  bookList.forEach((book) => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card">
    
        <img style="height: 300px;" class="img-thumbnail" src="https://covers.openlibrary.org/b/id/${
          book.cover_i
        }-M.jpg" alt="..." />

        <div class="card-body " >

            <h5 class="card-title ">Book Name:${book.title}</h5>

            <p class="card-text fw-bolder text-primary">Writer: 
            <span class="fw-bold text-dark">${book.author_name ? book.author_name[0] : ''}</span>
            </p>

            <p class="card-text fw-bolder text-primary">First-Published: 
            <span class="fw-bold text-dark">${book.first_publish_year ? book.first_publish_year : ''}</span>
            </p>

            <p class="card-text fw-bolder text-primary">Publisher: 
            <span class="fw-bold text-dark">${book.publisher ? book.publisher[0] : ''}</span>
            </p>  

        </div>

    </div>
    `;
    bookContainer.appendChild(div);
  });
};
