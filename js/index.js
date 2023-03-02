// document.addEventListener("DOMContentLoaded", function() {});

// const ul = document.getElementById('list');
// const showPanel = document.getElementById('show-panel');

// fetch('http://localhost:3000/books')
//     .then(response => response.json())
//     .then(books => {
//         const img = document.createElement('img');
//         showPanel.append(img);
//         const p = document.createElement('p');
//         showPanel.append(p);
//         const users = document.createElement('ul');
//         showPanel.append(users);
        
//         books.forEach(book => {
//         // list of book titles
//         const li = document.createElement('li');
//         li.innerText = book.title;
//         ul.append(li);
//         // showpanel div content
//         li.addEventListener('click', () => {
//             img.src = book['img_url'];
//             p.innerText = book.description;
//             book.users.forEach(obj => {
//                 let count = book.users.length
//                 // loop through using the length
//                 const userLi = document.createElement('li');
//                 users.append(userLi);
//                 userLi.textContent =  obj.username;
//             })
//         })
//     })
// })

// call fetch on the books API
fetch('http://localhost:3000/books')
// then pass that response through .json
    .then(resp => resp.json())
// then loop through the array of books using a forEach, call on renderBookTitles passing in a book object
    .then(booksArray => booksArray.forEach(bookObject => renderBookTitle(bookObject)));



// declare a function renderBookTitles that takes in a book object 
const renderBookTitle = book => {
// grab the ul with the id list
    const ul = document.getElementById('list');
// create an li element 
    const li = document.createElement('li');
// append the li element to the ul with the id list
    ul.append(li);
// add content to the li, the content should be the title of the book
    li.innerText = book.title;
// add and event listener to the li
// it should be a click event   
// the cb function should call renderBookDetails passing in a book object
    li.addEventListener('click', () => renderBookDetails(book));
}

// create a function renderBookDetails that takes in a book object
const renderBookDetails = book => {
// grab the div with the id show-panel
    const showPanel = document.getElementById('show-panel');
// create an img tag for the thumbnail
    const img = document.createElement('img');
// create an h3 tag for the title
    const h3Title = document.createElement('h3');
// create an h3 tag for the subtitle
    const h3Author = document.createElement('h3');
// create an h3 tag for the author
    const h3Sub = document.createElement('h3');
// create a p tag for the description
    const p = document.createElement('p');

// create a ul for the users
    const userUl = document.createElement('ul');

// create a button tag for the like button
    const button = document.createElement('button');

// append all elements to the show-panel div
    // showPanel.append(img, h3Title, h3Sub, h3Author, p, userUl)
// add the corresponding content to each tag
    img.src = book.img_url;
    h3Title.innerText = book.title;
    h3Sub.innerText = book.subtitle;
    h3Author.innerText = book.author;
    p.innerText = book.description;
    button.innerText = 'Like';

// grab the users array and loop through with a forEach
    book.users.forEach(user => {
// for each user, create an li tag
        const userLi = document.createElement('li');
// append the li tag to the ul
        userUl.append(userLi);
// add the content of the username to the li
        userLi.innerText = user.username;
    })

// loop throgh the showPanel div using a while loop
// while the showPanel div has a first child
    while(showPanel.firstChild) {
// remove the last child
        showPanel.removeChild(showPanel.lastChild);
    } 

// add an event listener to the button so when it is clicked we invoke a function clickLike passing in our book object
    button.addEventListener('click', () => clickLike(book));

// append all elements to the show-panel div
    showPanel.append(img, h3Title, h3Sub, h3Author, p, userUl, button);
};

// declare the function clickLike and pass in the book object
const clickLike = book => {
// fetch the url WITH the specific id using interpolation
// create the configuration object for the PATCH request
    fetch(`http://localhost:3000/books/${book.id}`, {
// in the body of the PATCH request pass in the current array of the users of the book and add an object containing the id and the username
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Application': 'application/json'
        },
        body: JSON.stringify({
            users: [...book.users, {
                id: 1,
                username: 'pouros'
            }]
        })
    })
// then pass in the response object as the argument to turn it into a js object using json()
    .then(resp => resp.json())
// then the returned object should be passed in as an argument to renderBookDetails
    .then(obj => renderBookDetails(obj));
}