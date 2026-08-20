// ======================================
// Global Recognition - Final Version
// script.js (Part 1)
// ======================================

// ----------------------------
// Global Variables
// ----------------------------

let countries = [];
let selectedCountry = null;

// ----------------------------
// Load Countries JSON
// ----------------------------

async function loadCountries() {

    try {

        const response = await fetch("data/countries.json");

        countries = await response.json();

        displayCountries(countries);

    } catch (error) {

        console.error("Error Loading Countries:", error);

    }

}

// ----------------------------
// Display Countries
// ----------------------------

function displayCountries(countryList) {

    const container = document.getElementById("countryContainer");

    if (!container) return;

    container.innerHTML = "";

    countryList.forEach(country => {

        container.innerHTML += `

        <div class="country-card">

            <h2>${country.name}</h2>

            <p><strong>Capital:</strong> ${country.capital}</p>

            <p><strong>Currency:</strong> ${country.currency}</p>

            <p><strong>Language:</strong> ${country.language}</p>

            <button onclick="showCountry('${country.name}')">

                Explore

            </button>

        </div>

        `;

    });

}

// ----------------------------
// Show Country Details
// ----------------------------

function showCountry(name){

    selectedCountry = countries.find(c => c.name === name);

    if(!selectedCountry) return;

    document.getElementById("countryName").textContent = selectedCountry.name;

    document.getElementById("capital").textContent =
    selectedCountry.capital;

    document.getElementById("currency").textContent =
    selectedCountry.currency;

    document.getElementById("language").textContent =
    selectedCountry.language;

    document.getElementById("population").textContent =
    selectedCountry.population;

    document.getElementById("history").textContent =
    selectedCountry.history;

    document.getElementById("tourist").textContent =
    selectedCountry.tourist;

    document.getElementById("anthem").textContent =
    selectedCountry.anthem;

}

// ----------------------------
// Start App
// ----------------------------

window.onload = () => {

    loadCountries();

};
// ======================================
// Global Recognition - Final Version
// script.js - Part 2A
// Search + Country Selection + Media
// ======================================


// --------------------------------------
// 1. COUNTRY SEARCH
// --------------------------------------

const searchInput =
    document.getElementById("searchInput") ||
    document.getElementById("search");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText = this.value
            .trim()
            .toLowerCase();

        if (!searchText) {
            displayCountries(countries);
            return;
        }

        const results = countries.filter(country => {

            const name =
                String(country.name || "").toLowerCase();

            const capital =
                String(country.capital || "").toLowerCase();

            return (
                name.includes(searchText) ||
                capital.includes(searchText)
            );

        });

        displayCountries(results);

    });

}


// --------------------------------------
// 2. COUNTRY CARD CLICK
// --------------------------------------

function openCountry(name) {

    const country = countries.find(
        c => c.name.toLowerCase() === name.toLowerCase()
    );

    if (!country) return;

    selectedCountry = country;

    showCountry(country.name);

    const details =
        document.getElementById("countryDetails");

    if (details) {

        details.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// --------------------------------------
// 3. FLAG IMAGE
// --------------------------------------

function loadCountryFlag(country) {

    const flag =
        document.getElementById("countryFlag");

    if (!flag) return;

    if (country.flag) {

        flag.src = country.flag;

    } else {

        const safeName = country.name
            .toLowerCase()
            .replace(/\s+/g, "-");

        flag.src =
            `images/${safeName}-flag.png`;

    }

    flag.alt =
        `${country.name} flag`;

    flag.onerror = function () {

        this.style.display = "none";

    };

    flag.onload = function () {

        this.style.display = "block";

    };

}


// --------------------------------------
// 4. TOURIST PLACE IMAGE
// --------------------------------------

function loadTouristImage(country) {

    const image =
        document.getElementById("touristImage");

    if (!image) return;

    if (country.image) {

        image.src = country.image;

    } else {

        const safeName = country.name
            .toLowerCase()
            .replace(/\s+/g, "-");

        image.src =
            `images/${safeName}-tourist.jpg`;

    }

    image.alt =
        `${country.name} tourist place`;

}


// --------------------------------------
// 5. NATIONAL ANTHEM AUDIO
// --------------------------------------

function loadAnthem(country) {

    const audio =
        document.getElementById("anthemAudio");

    if (!audio) return;

    const safeName = country.name
        .toLowerCase()
        .replace(/\s+/g, "-");

    const audioFile =
        country.audio ||
        `audio/${safeName}.mp3`;

    audio.src = audioFile;

    audio.load();

}


// --------------------------------------
// 6. ENHANCE COUNTRY DETAILS
// --------------------------------------

const originalShowCountry = showCountry;

showCountry = function (name) {

    originalShowCountry(name);

    const country = countries.find(
        c => c.name === name
    );

    if (!country) return;

    selectedCountry = country;

    loadCountryFlag(country);

    loadTouristImage(country);

    loadAnthem(country);

};


// --------------------------------------
// 7. CLEAR SEARCH BUTTON
// --------------------------------------

const clearSearch =
    document.getElementById("clearSearch");

if (clearSearch) {

    clearSearch.addEventListener("click", function () {

        if (searchInput) {
            searchInput.value = "";
        }

        displayCountries(countries);

    });

}


// --------------------------------------
// 8. ESC KEY
// --------------------------------------

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        if (searchInput) {

            searchInput.value = "";

            displayCountries(countries);

        }

    }

});


// --------------------------------------
// 9. COUNTRY COUNT
// --------------------------------------

function updateCountryCounter(list) {

    const counter =
        document.getElementById("countryCount");

    if (!counter) return;

    counter.textContent =
        `${list.length} Countries`;

}


// --------------------------------------
// 10. KEEP COUNTER UPDATED
// --------------------------------------

const recognitionDisplayCountries =
    displayCountries;

displayCountries = function (list) {

    recognitionDisplayCountries(list);

    updateCountryCounter(list);

};


// --------------------------------------
// 11. EXPLORE BUTTON
// --------------------------------------

const exploreButton =
    document.getElementById("exploreBtn");

if (exploreButton) {

    exploreButton.addEventListener("click", function () {

        const section =
            document.getElementById("countries") ||
            document.getElementById("countryContainer");

        if (section) {

            section.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


// --------------------------------------
// 12. BACK TO TOP
// --------------------------------------

const backTop =
    document.getElementById("backToTop");

if (backTop) {

    backTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// --------------------------------------
// 13. MEDIA ERROR HANDLING
// --------------------------------------

document.addEventListener(
    "error",
    function (event) {

        const element = event.target;

        if (
            element.tagName === "IMG" ||
            element.tagName === "AUDIO"
        ) {

            console.warn(
                "Media file not found:",
                element.src
            );

        }

    },
    true
);


// --------------------------------------
// PART 2A COMPLETE
// --------------------------------------

console.log(
    "Global Recognition: Part 2A loaded."
);
loadCountries();
// ----------------------------
// 3D EARTH GLOBE
// ----------------------------

const globeContainer = document.getElementById("globeContainer");

if (globeContainer && typeof THREE !== "undefined") {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        globeContainer.clientWidth / 450,
        0.1,
        1000
    );

    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setSize(
        globeContainer.clientWidth,
        450
    );

    globeContainer.innerHTML = "";
    globeContainer.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 64, 64);

    const textureLoader = new THREE.TextureLoader();

const earthTexture = textureLoader.load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
);

const material = new THREE.MeshBasicMaterial({
    map: earthTexture
});

    const globe = new THREE.Mesh(
        geometry,
        material
    );

    scene.add(globe);

    function animate() {

        requestAnimationFrame(animate);

        globe.rotation.y += 0.002;

        renderer.render(scene, camera);
    }

    animate();

}
