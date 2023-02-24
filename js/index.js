// document.addEventListener("DOMContentLoaded", function() {});

const ul = document.getElementById('list');
const showPanel = document.getElementById('show-panel');

fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(books => {
        const img = document.createElement('img');
        showPanel.append(img);
        const p = document.createElement('p');
        showPanel.append(p);
        const users = document.createElement('ul');
        showPanel.append(users);
        
        books.forEach(book => {
        // list of book titles
        const li = document.createElement('li');
        li.innerText = book.title;
        ul.append(li);
        // showpanel div content
        li.addEventListener('click', () => {
            img.src = book['img_url'];
            p.innerText = book.description;
            book.users.forEach(obj => {
                let count = book.users.length
                // loop through using the length
                const userLi = document.createElement('li');
                users.append(userLi);
                userLi.textContent =  obj.username;
            })
        })
    })
})