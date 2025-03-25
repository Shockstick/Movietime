
// Dit wordt gebruikt om het burger menu te sluiten voor mobiel gebruikers.//  

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

// Dit is de code van het pop-up menu, in het Films pagina.// 

const filmData = {
    "film1": { "poster": "../img/Films/Oppenheimer.jpg" , "desc": "Wetenschapper J. Robert Oppenheimer leidt tijdens de Tweede Wereldoorlog het zeer geheime Manhattanproject, waarvoor hij met een groep wetenschappers de atoombom ontwikkelt." },
    "film2": { "poster": "../img/Films/Barbie.jpg", "desc": "In Barbie Land, een kleurrijke en ogenschijnlijk perfecte wereld, geniet Barbie volop van het leven. Wanneer ze naar de echte wereld vertrekt, ontdekt ze al snel zowel de geneugten als de uitdagingen van het leven onder de mensen." },
    "film3": { "poster": "../img/Films/Avatar_The_way_of_water.jpg", "desc": "Jake Sully en Ney'tiri hebben een gezin gevormd en doen er alles aan om bij elkaar te blijven. Ze verkennen de mysteries van Pandora nadat ze hun huis moeten verlaten." },
    "film4": { "poster": "../img/Films/John_Wick_4.jpg", "desc": "Terwijl de prijs op zijn hoofd stijgt, vecht de legendarische huurmoordenaar John Wick tegen de High Table. Hij zoekt de machtigste figuren in de onderwereld, van New York tot Parijs en van Japan tot Berlijn." },
    "film5": { "poster": "../img/Films/Dune_Part_2.jpg", "desc": "Paul Atreides sluit een onverwacht verbond met Chani en de Fremen. Hij wil wraak nemen op de samenzweerders die zijn familie hebben vernietigd." },
    "film6": { "poster": "../img/Films/Super_Mario_Bros_film.webp", "desc": "Loodgieters en broers Mario en Luigi komen via een mysterieuze buis in een magische nieuwe wereld terecht, waar ze van elkaar gescheiden worden." },
    "film7": { "poster": "../img/Films/Fast_X.webp", "desc": "Het lukt Dom Toretto en z'n familie maar niet om met pensioen te gaan. Ze moeten de confrontatie aangaan met een vijand die opduikt uit de schaduwen van het verleden, uit op wraak." },
    "film8": { "poster": "../img/Films/Spider-man_Across_The_Spider-verse.jpg", "desc": "Miles Morales bundelt zijn krachten met Gwen Stacy in een epische reis door het multiversum. Samen met een team van Spider-People moeten ze alle universums verdedigen tegen een nieuwe vijand." },
    "film9": { "poster": "../img/Films/Elemental.jpg", "desc": "In een stad waar vuur, water, aarde en lucht samenleven, maar niet met elkaar mogen mengen, ontdekken vuurelement Ember en waterelement Wade hoeveel ze eigenlijk met elkaar gemeen hebben." },
    "film10": { "poster": "../img/Films/Indiana_Jones_and_the_Dial_of_Destiny_theatrical_poster.jpg", "desc": "In een race tegen de klok moet Indiana Jones een legendarische wijzerplaat vinden die de loop van de geschiedenis kan veranderen." }
};


if (bar) {
    bar.addEventListener('click', () =>  {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

function openLightbox(film) {
    document.getElementById("lightbox-img").src = filmData[film].poster;
    document.getElementById("lightbox-text").innerText = filmData[film].desc;
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function zoekFilm() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let films = document.querySelectorAll(".film");
    films.forEach(film => {
        film.style.display = film.innerText.toLowerCase().includes(input) ? "block" : "none";
    });
}

let recensies = [];

// Hiermee kun je zetten hoeveel recensies iemand mag maken.//
function voegRecensieToe(film) {
    if (recensies.length >= 3) {
        alert("Er kunnen alleen maar maximaal 3 recensies getoond worden.");
        return;
    }

    let textarea = document.querySelector(`textarea[data-film="${film}"]`);
    let text = textarea.value.trim();
    if (text === "") {
        alert("Voer hier je recensie in!");
        return;
    }

    //Dit wordt gebruikt om de code te krijgen voor de personen die 3 recensies hebben gemaakt.//

    recensies.unshift({ film, text }); 
    if (recensies.length > 3) recensies.pop(); 

    
    updateRecensies();
    textarea.value = ""; 

    if (recensies.length === 3) {
        let code = "MT" + Math.floor(1000 + Math.random() * 9000);
        document.getElementById("code").textContent = code;
        document.getElementById("melding").classList.remove("hidden");
    }
}

function updateRecensies() {
    let lijst = document.getElementById("recensie-lijst");
    lijst.innerHTML = ""; 

    recensies.forEach(recensie => {
        let div = document.createElement("div");
        div.classList.add("recensie-item");
        div.innerHTML = `<strong>${recensie.film}:</strong> ${recensie.text}`;
        lijst.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const sterrenContainers = document.querySelectorAll(".sterren");

    sterrenContainers.forEach(container => {
        const film = container.getAttribute("data-film");

        container.innerHTML = ""; // De sterren zijn nu leeg, om ervoor te zorgen dat ze de keuze te geven hoeveel sterren een film waard is.//
        for (let i = 1; i <= 5; i++) {
            let ster = document.createElement("span");
            ster.textContent = "★";
            ster.dataset.rating = i;
            ster.style.cursor = "pointer";
            ster.style.fontSize = "24px";
            ster.style.color = "gray";

            ster.addEventListener("mouseover", function () {
                highlightStars(container, i);
            });

            ster.addEventListener("mouseout", function () {
                resetStars(container);
            });

            ster.addEventListener("click", function () {
                selectStars(container, i);
            });

            container.appendChild(ster);
        }
    });
});

// De sterren krijgen een hover effect wanneer de muis overheen gaat.//
function highlightStars(container, rating) {
    const sterren = container.querySelectorAll("span");
    sterren.forEach((ster, index) => {
        ster.style.color = index < rating ? "gold" : "gray";
    });
}

// Het Herstart de sterren naar het geselecteerde aantal.//
function resetStars(container) {
    const geselecteerdeRating = container.getAttribute("data-selected") || 0;
    highlightStars(container, geselecteerdeRating);
}

// De gekozen sterren worden geselecteerd.//
function selectStars(container, rating) {
    container.setAttribute("data-selected", rating);
    highlightStars(container, rating);
}