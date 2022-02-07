'use strict'

const gProjs = [
    {
        id: "touch-nums",
        name: "touch-nums",
        title: "Touch The Numbers",
        desc: "Touch The Numbers is a simple game for training your reflexes and peripheral vision.",
        url: "projs/touch-nums",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "ball-board",
        name: "ball-board",
        title: "Ball On Board",
        desc: "The aim of the game is to clear all the balls from the board.",
        url: "projs/touch-nums",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "mine-sweeper",
        name: "mine-sweeper",
        title: "Mine Sweeper",
        desc: "The objective of the game is to clear a rectangular board containing hidden mines without detonating any of them, with help from clues about the number of neighbouring mines in each field.",
        url: "projs/mine-sweeper",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "book-shop",
        name: "book-shop",
        title: "Book Shop",
        desc: "The store owner can manage his books efficiently.",
        url: "projs/book-shop",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    },
   
]

renderGrid()
function renderGrid() {
    var projs = gProjs
    var strHtmls = projs.map(function (proj) {

        return `<div class="col-md-4 col-sm-4 portfolio-item">
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
      <div class="portfolio-hover">
        <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x"></i>
        </div>
      </div>
      <img class="img-fluid" src="img/portfolio/${proj.id}.jpg" alt="">
    </a>
    <div class="portfolio-caption">
      <h4>${proj.title}</h4>
      <p class="text-muted">${proj.desc}</p>
    </div>`
    })

    $('.projs-container').html(strHtmls)
}