'use strict'

function onInit() {
    renderBooks()
}


function renderBooks() {
    var books = getBooks()
    var strHtmls = books.map(function (book) {
        return `
   <tr><td> ${book.id} </td><td class="bookName">${book.bookName}</td><td class="price">${book.price}</td>
   <td><button onclick="onReadBook('${book.id}')">Read</button></td> 
   <td><button onclick="openUpdateMsg('${book.id}')">Update</button></td> 
   <td><button onclick="onRemoveBook('${book.id}')">Delete</button></td> 
   </tr>`
    })
    document.querySelector('tbody').innerHTML = strHtmls.join('')
    var elBoard = document.querySelector('table')
    console.log(elBoard)

}

function renderRateBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h4 span').innerText = book.rate
}

function onRemoveBook(bookId) {
    const book = getBookById(bookId)
    removeBook(bookId)
    flashMsg(`The book "${book.bookName}" has been deleted`)
    renderBooks()
}


function onAddBook() {
    const elName = document.querySelector('input[name=bookName]')
    const name = elName.value.charAt(0).toUpperCase() + elName.value.substring(1)
    const elPrice = document.querySelector('input[name=price]')
    const price = elPrice.value

    if (!name || !name.length || !price || price < 0) {
        flashMsg('Please add valid book title and price!')
        return
    }

    addBook(name, price)

    elName.value = ''
    elPrice.value = ''
    renderBooks()
    flashMsg(`The book "${name}" has been added.`)
}


function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.bookName
    elModal.querySelector('h4 span').innerText = book.rate
    var elBtn = elModal.querySelector('.btn')
    var strHTML = `<button title="change rate" onclick="onChangeRate('${bookId}')">Update</button>`
    elBtn.innerHTML = strHTML
    elModal.querySelector('p').innerText = book.desc
    elModal.querySelector('img').src = book.imgUrl
    elModal.classList.add('open')
    console.log(elModal)


}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

function onChangeRate(bookId) {
    const book = getBookById(bookId)
    const elChangeRate = document.querySelector('input[name=rate]')
    const newRate = elChangeRate.value
    if (!newRate || newRate < 0 || newRate > 10) {
        flashMsg('Please enter a valid rate!')
        return
    }
    changeRate(bookId, newRate)
    console.log(newRate)
    renderRateBook(bookId, newRate)
    elChangeRate.value = ''
    flashMsg(`The rating of "${book.bookName}" has been updated.`)
}


function onSetSortBy(elcell) {
    var sortBy = elcell.innerHTML
    setSortBy(sortBy)
    setBookSort()
    renderBooks()
}


function openUpdateMsg(bookId) {
    var elMsg = document.querySelector('.update')
    console.log(elMsg)
    var elBtn = elMsg.querySelector('.update-btn')
    console.log(elBtn)
    var strHTML = `<button title="update price" onclick="onUpdateBook('${bookId}')">Update</button>`
    elBtn.innerHTML = strHTML
    elMsg.classList.add('openmsg')

}

function onUpdateBook(bookId) {
    const elUpdate = document.querySelector('input[name=update]')
    const newPrice = elUpdate.value
    if ( !newPrice || newPrice < 0) {
        flashMsg('Please enter a valid price!')
        return
    }
    updateBook(bookId, newPrice)
    var book = getBookById(bookId)
    elUpdate.value = ''
    renderBooks()
    document.querySelector('.update').classList.remove('openmsg')
    console.log(gBooks)
    flashMsg(`The price of "${book.bookName}" has been updated.`)

}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 3000)
}

function onNextPage() {
    setNextPage()
    renderBooks()
}