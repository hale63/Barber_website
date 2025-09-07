'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}


window.addEventListener("scroll",function(){
  var header = document.querySelector("[data-header]");
  header.classList.toggle("active" ,window.scrollY > 0 );
});

const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      console.log(entry.target)
      entry.target.classList.add("show")
    }
    else{
      entry.target.classList.remove("show");
    }
  })
},{});
const todoElements =document.querySelectorAll(".container");
todoElements.forEach(el => observer.observe(el));
/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = () => navbar.classList.toggle("active");

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = () => navbar.classList.remove("active");

addEventOnElem(navLinks, "click", closeNavbar);

const languageMenu = document.querySelector('.language-menu');
const navbarList = document.querySelector('.navbar-list');

function handleResize() {
  if (window.innerWidth <= 992) { // mobile screens
    languageMenu.addEventListener('mouseenter', expandNav);
    languageMenu.addEventListener('mouseleave', collapseNav);
  } else {
    languageMenu.removeEventListener('mouseenter', expandNav);
    languageMenu.removeEventListener('mouseleave', collapseNav);
    navbarList.style.height = ''; // reset
  }
}

function expandNav() {
  navbarList.style.height = '440px';
}

function collapseNav() {
  navbarList.style.height = '340px';
}

window.addEventListener('resize', handleResize);
handleResize(); // initial check

/****
 * language selector
 */
 // Sayfa adına göre seçili dili göster

function setLang(lang) {
    localStorage.setItem("lang", lang);
    
    if (lang === "du") window.location.href = "index-du.html";
    else if (lang === "tr") window.location.href = "index-tr.html";
    else if (lang === "ar") window.location.href = "index-ar.html";
    else window.location.href = "index.html"; // default English
  }

  // Sayfa yüklendiğinde selector'u güncelle
  window.addEventListener("DOMContentLoaded", () => {
    let currentLang = localStorage.getItem("lang") || "en";

    const langData = {
      en: { text: "English", flag: "https://flagicons.lipis.dev/flags/4x3/gb.svg" },
      du: { text: "Dutch", flag: "https://flagicons.lipis.dev/flags/4x3/nl.svg" },
      tr: { text: "Türkçe", flag: "https://flagicons.lipis.dev/flags/4x3/tr.svg" },
      ar: { text: "العربية", flag: "https://flagicons.lipis.dev/flags/4x3/sa.svg" }
    };

    const lang = langData[currentLang];
    document.getElementById("current-flag").src = lang.flag;
    document.getElementById("current-text").innerText = lang.text;
  });
/**
 * header & back top btn active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);



/**
 * filter function
 */

const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter]");

let lastClickedFilterBtn = filterBtns[0];

const filter = function () {
  lastClickedFilterBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedFilterBtn = this;

  for (let i = 0; i < filterItems.length; i++) {
    if (this.dataset.filterBtn === filterItems[i].dataset.filter ||
      this.dataset.filterBtn === "all") {

      filterItems[i].style.display = "block";
      filterItems[i].classList.add("active");

    } else {

      filterItems[i].style.display = "none";
      filterItems[i].classList.remove("active");

    }
  }
}

addEventOnElem(filterBtns, "click", filter);