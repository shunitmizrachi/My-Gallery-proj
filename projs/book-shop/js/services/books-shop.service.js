'use strict'
const STORAGE_KEY = 'bookDB'
const gBookNames = ['The Secret', 'The Da Vinci Code', 'Night Music', 'The Kite Runner',
    'A Thousand Splendid Suns', 'Me Before You', 'Bellagrand', 'Over My Dead Body', 'The Forgotten Village']
const gPrices = [19, 29, 39, 49, 59, 69, 79, 89, 99]
var gBooks
var gSortBy = 'Title'
var gPageIdx = 0
const PAGE_SIZE = 3

_createBooks()

console.log(gBooks);

function _createbook(bookName, price) {
    return {
        id: makeId(),
        bookName,
        price,
        imgUrl: `img/${Math.floor(Math.random() * 8)}.png`,
        rate: 0,
        desc: makeLorem()
        
    }
    
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []

        for (let i = 0; i < 9; i++) {
            var bookName = gBookNames[0]
            gBookNames.shift()
            var price = getRandomPrice()
            books.push(_createbook(bookName, price))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function getRandomPrice() {
    let price = gPrices[Math.floor(Math.random() * gPrices.length)]
    return price
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function setNextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
      gPageIdx = 0
    }
  }

function getBooks() {
    var books = gBooks.filter((book) => book)
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)
  return books
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex((book) => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
    console.log(gBooks)
}


function addBook(name, price) {
    const book = _createbook(name, price)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book
}

function updateBook(bookId, newPrice) {
    const book = gBooks.find((book) => book.id === bookId)
    book.price = newPrice
    _saveBooksToStorage()
    console.log(book)
    return book
}

function getBookById(bookId) {
    const book = gBooks.find((book) => bookId === book.id)
    return book
}

function setSortBy(sortBy) {
    gSortBy = sortBy

}


function setBookSort() {
    if (gSortBy === 'Price') {
        gBooks.sort((a,b) => a.price - b.price)
    }

    if (gSortBy === 'Title') {
        gBooks.sort(function (a, b) {
            return a.bookName.localeCompare(b.bookName);
          });
    }
    _saveBooksToStorage()

}

function changeRate(bookId, newRate) {
    const book = gBooks.find((book) => book.id === bookId)
    book.rate = newRate
    _saveBooksToStorage()
    console.log(book)
    return book
}

