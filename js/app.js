const loadBookData = () => {
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    document.getElementById('search-button').innerText = `Loading...`;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data));
}

const displayBooks = data => {
    const bookInfoArea = document.getElementById('display-bookinfo');

    const foundData = document.getElementById('found-showing');
    foundData.innerHTML = `<b>Total found:</b> ${data?.num_found}<br>
    <b>Total showing:</b> ${data?.docs.length}`;


    //book name, author if found, first published if found, how much found, how much showing

    data.docs.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('book-card');
        div.innerHTML = `
            <p><strong>Book Name:</strong> ${book?.title}${book?.subtitle ? ' - ' + book.subtitle : ''}</p>
            <p><strong>Author Name:</strong> <i>${book?.author_name ? book.author_name.join(',  ') : "Not found!"}</i></p>
            <p><strong>First published:</strong> ${book?.first_publish_year ? book.first_publish_year : "Not found!"}</p>
        `;
        bookInfoArea.appendChild(div);
    });

    document.getElementById('search-button').innerText = `Search`;

}