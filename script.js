/* =========================================================
NOVA CAFÉ
JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");
const navButton = document.querySelector(".nav-button");

if (navbar && navLinks) {

    const menuButton = document.createElement("button");

    menuButton.className = "mobile-menu-button";
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.innerHTML = "☰";

    navbar.insertBefore(menuButton, navLinks);

    menuButton.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-active");
    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("mobile-active");
        });

    });

}


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const header = document.querySelector(".header");

        const headerHeight = header
            ? header.offsetHeight
            : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

const header = document.querySelector(".header");

function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =====================================================
   REVEAL ELEMENTS ON SCROLL
===================================================== */

const revealElements = document.querySelectorAll(
    ".activity-card, .corner-card, .event-card, .shop-card, .menu-items article"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =====================================================
   CAFE CATEGORY
===================================================== */

const categoryButtons =
    document.querySelectorAll(".menu-categories button");

const menuItems =
    document.querySelectorAll(".menu-items article");


const menuData = {

    coffee: [
        {
            title: "Signature Coffee",
            description: "Rich and smooth house blend."
        },
        {
            title: "Cold Brew",
            description: "Slow brewed and refreshing."
        },
        {
            title: "Espresso",
            description: "Bold and perfectly balanced."
        }
    ],

    drinks: [
        {
            title: "Iced Latte",
            description: "Smooth espresso with chilled milk."
        },
        {
            title: "Fresh Lemonade",
            description: "Fresh, bright and refreshing."
        },
        {
            title: "Matcha",
            description: "Creamy ceremonial matcha."
        }
    ],

    pastries: [
        {
            title: "Fresh Croissant",
            description: "Buttery and baked fresh every morning."
        },
        {
            title: "Chocolate Cake",
            description: "Rich chocolate with a soft center."
        },
        {
            title: "Cinnamon Roll",
            description: "Warm, sweet and freshly baked."
        }
    ]

};


function updateMenu(category) {

    const items = menuData[category];

    if (!items) {
        return;
    }

    menuItems.forEach((item, index) => {

        if (!items[index]) {
            return;
        }

        const title = item.querySelector("h3");
        const description = item.querySelector("p");

        if (title) {
            title.textContent = items[index].title;
        }

        if (description) {
            description.textContent = items[index].description;
        }

    });

}


categoryButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        const categories = [
            "coffee",
            "drinks",
            "pastries"
        ];

        updateMenu(categories[index]);

    });

});


/* =====================================================
   BOOKING FORM
===================================================== */

const bookingForm =
    document.querySelector(".booking-form");


if (bookingForm) {

    bookingForm.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            document.querySelector("#name").value.trim();

        const email =
            document.querySelector("#email").value.trim();

        const activity =
            document.querySelector("#activity").value;


        if (!name || !email || !activity) {

            showMessage(
                "Please fill in all the required fields.",
                "error"
            );

            return;
        }


        const selectedActivity =
            document.querySelector(
                "#activity option:checked"
            ).textContent;


        showMessage(
            `Thank you, ${name}! Your spot for ${selectedActivity} has been reserved.`,
            "success"
        );


        bookingForm.reset();

    });

}


/* =====================================================
   MESSAGE SYSTEM
===================================================== */

function showMessage(message, type) {

    const oldMessage =
        document.querySelector(".form-message");

    if (oldMessage) {
        oldMessage.remove();
    }


    const messageElement =
        document.createElement("div");

    messageElement.className =
        `form-message ${type}`;

    messageElement.textContent = message;


    if (bookingForm) {

        bookingForm.appendChild(messageElement);

    }


    setTimeout(() => {

        messageElement.classList.add("hide");

        setTimeout(() => {

            messageElement.remove();

        }, 400);

    }, 4000);

}


/* =====================================================
   CURRENT YEAR
===================================================== */

const footerYear =
    document.querySelector(".footer p:last-child");

if (footerYear) {

    footerYear.textContent =
        `© ${new Date().getFullYear()} NOVA Café. All rights reserved.`;

}


/* =====================================================
   BUTTON HOVER EFFECT
===================================================== */

const buttons =
    document.querySelectorAll(".btn, .nav-button");

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {
        button.style.transition = "0.3s ease";
    });

});


});