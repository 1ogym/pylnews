/* --------------------------------------------------
    CONFIG & DATA
-------------------------------------------------- */

const pages = {
    home: "pages/home.html",
    announcements: "pages/announcements.html",
    canteen: "pages/canteen.html",
    news: "pages/news.html"
};

const products = {
    koulouri: { name: "Κουλούρι", price: 0.60, quantity: 0 },
    kaserokoulouro: { name: "Κασεροκούλουρο", price: 1.20, quantity: 0 },
    tyropita: { name: "Τυρόπιτα", price: 1.00, quantity: 0 },
    patatopita: { name: "Πατάτοπίτα", price: 1.00, quantity: 0 },
    kotopita: { name: "Κοτόπιτα", price: 1.50, quantity: 0 },
    pitsa:{ name: "Πίτσα", price: 1.40, quantity: 0 },
    pitsadipli: { name: "Πίτσα Διπλή", price: 2.00, quantity: 0 },
    mesogeiako: { name: "Μεσογειακό", price: 1.80, quantity: 0 },
    strifto: { name: "Στριφτό", price: 1.20, quantity: 0 },
    rizogofreta: { name: "Ριζόγκοφρετες", price: 1.00, quantity: 0 },
    katisokolata: { name: "Σάντουιτς Γλυκό", price: 1.50, quantity: 0 },
    mpara: { name: "Μπάρα", price: 1.00, quantity: 0 },
    pasteli: { name: "Παστέλι", price: 0.60, quantity: 0 },
    mirada: { name: "Μιράντα", price: 0.60, quantity: 0 },
    biskota: { name: "Μπισκότα (Μικρά)", price: 0.10, quantity: 0 },
    water: { name: "Νερό Μικρό", price: 0.40, quantity: 0 },
    water2: { name: "Νερό Μεγάλο", price: 0.60, quantity: 0 },
    juice: { name: "Χυμός", price: 1.00, quantity: 0 },
    chocolatedrink: { name: "Ζεστή/Κρύα Σοκολάτα", price: 1.20, quantity: 0 }
};


/* --------------------------------------------------
    DOM REFERENCES
-------------------------------------------------- */

const pageContent = document.getElementById("pageContent");
const mainNav = document.getElementById("mainNav");
const menuToggle = document.getElementById("menuToggle");
const themeToggle = document.getElementById("themeToggle");

const mobileCartBar = document.getElementById("mobileCartBar");
const mobileCartOpen = document.getElementById("mobileCartOpen");
const mobileCartClose = document.getElementById("mobileCartClose");
const mobileCartOverlay = document.getElementById("mobileCartOverlay");
const mobileCartSheet = document.getElementById("mobileCartSheet");


/* --------------------------------------------------
    SCHOOL HOLIDAY COUNTDOWN
-------------------------------------------------- */

function updateCountdown() {
    const holidays = [
        {
            start: "2026-10-28",
            end: "2026-10-28",
            name: "28η Οκτωβρίου"
        },
        {
            start: "2026-11-17",
            end: "2026-11-17",
            name: "Επέτειος Πολυτεχνείου"
        },
        {
            start: "2026-12-23",
            end: "2027-01-07",
            name: "Διακοπές Χριστουγέννων"
        },
        {
            start: "2027-03-15",
            end: "2027-03-15",
            name: "Καθαρά Δευτέρα"
        },
        {
            start: "2027-03-25",
            end: "2027-03-25",
            name: "25η Μαρτίου"
        },
        {
            start: "2027-04-23",
            end: "2027-05-09",
            name: "Διακοπές Πάσχα"
        }
    ];

    const labelElement =
        document.getElementById("schoolCountdownLabel");

    const daysElement =
        document.getElementById("schoolCountdownDays");

    const daysTextElement =
        document.getElementById("schoolCountdownDaysText");

    const dateElement =
        document.getElementById("schoolCountdownDate");

    if (
        !labelElement ||
        !daysElement ||
        !daysTextElement ||
        !dateElement
    ) {
        return;
    }

    function createDate(dateString) {
        const [year, month, day] =
            dateString.split("-").map(Number);

        return new Date(
            year,
            month - 1,
            day
        );
    }

    function formatGreekDate(date) {
        return new Intl.DateTimeFormat("el-GR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(date);
    }

    const now = new Date();

    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    /*
        First check whether we are currently
        inside a holiday period.
    */

    const currentHoliday = holidays.find(holiday => {
        const start = createDate(holiday.start);
        const end = createDate(holiday.end);

        return today >= start && today <= end;
    });

    if (currentHoliday) {
        labelElement.textContent = "ΣΧΟΛΙΚΕΣ ΔΙΑΚΟΠΕΣ";

        daysElement.textContent = "🎉";

        daysTextElement.textContent =
            "ΕΙΣΑΙ ΣΕ ΔΙΑΚΟΠΕΣ";

        dateElement.textContent =
            `${currentHoliday.name} · Έως ${formatGreekDate(
                createDate(currentHoliday.end)
            )}`;

        return;
    }

    /*
        Find the next holiday.
    */

    const nextHoliday = holidays.find(holiday => {
        return createDate(holiday.start) > today;
    });

    if (!nextHoliday) {
        labelElement.textContent =
            "ΣΧΟΛΙΚΕΣ ΔΙΑΚΟΠΕΣ";

        daysElement.textContent = "—";

        daysTextElement.textContent = "";

        dateElement.textContent =
            "Δεν υπάρχουν άλλες σχολικές αργίες.";

        return;
    }

    const holidayDate =
        createDate(nextHoliday.start);

    /*
        Use the actual current time so the countdown
        includes hours and minutes.
    */

    const targetDate = new Date(
        holidayDate.getFullYear(),
        holidayDate.getMonth(),
        holidayDate.getDate(),
        0,
        0,
        0
    );

    const difference =
        targetDate.getTime() - now.getTime();

    if (difference <= 0) {
        updateCountdown();
        return;
    }

    const totalMinutes =
        Math.floor(
            difference / (1000 * 60)
        );

    const days =
        Math.floor(
            totalMinutes / (60 * 24)
        );

    const hours =
        Math.floor(
            (totalMinutes % (60 * 24)) / 60
        );

    const minutes =
        totalMinutes % 60;

    labelElement.textContent =
        "ΕΠΟΜΕΝΗ ΣΧΟΛΙΚΗ ΑΡΓΙΑ";

    daysElement.textContent =
        days;

    daysTextElement.textContent =
        days === 1 ? "ΗΜΕΡΑ" : "ΗΜΕΡΕΣ";

    dateElement.innerHTML = `
        ${hours} ${hours === 1 ? "ΩΡΑ" : "ΩΡΕΣ"}
        ·
        ${minutes} ${minutes === 1 ? "ΛΕΠΤΟ" : "ΛΕΠΤΑ"}
        <br>
        <strong>${nextHoliday.name}</strong>
        · ${formatGreekDate(holidayDate)}
    `;
}


/* --------------------------------------------------
    PAGE LOADING
-------------------------------------------------- */

async function loadPage(pageName) {
    if (!pages[pageName]) {
        pageName = "home";
    }

    try {
        const response = await fetch(pages[pageName]);

        if (!response.ok) {
            throw new Error(`Could not load ${pages[pageName]}`);
        }

        const html = await response.text();

        if (pageContent) {
            pageContent.innerHTML = html;
        }

        /*
            home.html is inserted above.
            The countdown elements now exist,
            so initialize the countdown here.
        */
        updateCountdown();

        updateActiveNavigation(pageName);
        updateCart();
        updateQuantityDisplays();
        setupQuantityButtons();
        setupProductScrollers();
        updateMobileCartVisibility();
        closeMobileMenu();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {
        console.error(error);

        if (pageContent) {
            pageContent.innerHTML = `
                <section class="page-section">
                    <div class="error-card">
                        <div class="small-label">ΣΦΑΛΜΑ</div>
                        <h1>Η σελίδα δεν φορτώθηκε.</h1>
                        <p>Ελέγξτε ότι το site λειτουργεί μέσα από έναν τοπικό server.</p>
                    </div>
                </section>
            `;
        }
    }
}

function updateActiveNavigation(pageName) {
    if (!mainNav) return;

    const links = mainNav.querySelectorAll("a");

    links.forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.page === pageName
        );
    });
}


/* --------------------------------------------------
    HASH NAVIGATION
-------------------------------------------------- */

function getPageFromHash() {
    const hash = window.location.hash.replace("#", "");

    return pages[hash] ? hash : "home";
}

window.addEventListener("hashchange", () => {
    loadPage(getPageFromHash());
});


/* --------------------------------------------------
    MOBILE MENU
-------------------------------------------------- */

function openMobileMenu() {
    if (!mainNav || !menuToggle) return;

    mainNav.classList.add("open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.textContent = "Close";
}

function closeMobileMenu() {
    if (!mainNav || !menuToggle) return;

    mainNav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "Menu";
}

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        if (mainNav && mainNav.classList.contains("open")) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

if (mainNav) {
    mainNav.addEventListener("click", event => {
        const link = event.target.closest("a");

        if (link) {
            closeMobileMenu();
        }
    });
}


/* --------------------------------------------------
    THEME SWITCHER
-------------------------------------------------- */

function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark");

        if (themeToggle) {
            themeToggle.textContent = "Light";
        }
    } else {
        document.body.classList.remove("dark");

        if (themeToggle) {
            themeToggle.textContent = "Dark";
        }
    }
}

const savedTheme =
    localStorage.getItem("1oGymnPylNews-theme") || "light";

applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark =
            document.body.classList.contains("dark");

        const newTheme =
            isDark ? "light" : "dark";

        localStorage.setItem(
            "1oGymnPylNews-theme",
            newTheme
        );

        applyTheme(newTheme);
    });
}


/* --------------------------------------------------
    QUANTITY MANAGEMENT
-------------------------------------------------- */

function changeQuantity(productId, amount) {
    const product = products[productId];

    if (!product) {
        console.error("Unknown product:", productId);
        return;
    }

    product.quantity += amount;

    if (product.quantity < 0) {
        product.quantity = 0;
    }

    updateQuantityDisplays();
    updateCart();
}

function setupQuantityButtons() {
    const plusButtons =
        document.querySelectorAll(".quantity-plus");

    const minusButtons =
        document.querySelectorAll(".quantity-minus");

    plusButtons.forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            changeQuantity(
                button.dataset.product,
                1
            );
        });
    });

    minusButtons.forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            changeQuantity(
                button.dataset.product,
                -1
            );
        });
    });
}

function updateQuantityDisplays() {
    Object.keys(products).forEach(productId => {
        const element =
            document.getElementById(
                `quantity-${productId}`
            );

        if (element) {
            element.textContent =
                products[productId].quantity;
        }
    });
}


/* --------------------------------------------------
    CART
-------------------------------------------------- */

function getCartItems() {
    return Object.entries(products)
        .filter(([, product]) => product.quantity > 0);
}

function getCartCount() {
    return getCartItems()
        .reduce(
            (total, [, product]) =>
                total + product.quantity,
            0
        );
}

function getCartTotal() {
    return getCartItems()
        .reduce(
            (total, [, product]) =>
                total + product.price * product.quantity,
            0
        );
}

function formatPrice(price) {
    return `€${price.toFixed(2)}`;
}

function createCartHTML(items) {
    if (items.length === 0) {
        return `
            <div class="empty-cart">
                Το καλάθι είναι άδειο.
            </div>
        `;
    }

    return items
        .map(([, product]) => {
            const itemTotal =
                product.price * product.quantity;

            return `
                <div class="cart-item">
                    <span class="cart-item-name">
                        ${product.name}
                    </span>

                    <div class="cart-item-right">
                        <span class="cart-item-quantity">
                            ×${product.quantity}
                        </span>

                        <span class="cart-item-price">
                            ${formatPrice(itemTotal)}
                        </span>
                    </div>
                </div>
            `;
        })
        .join("");
}

function updateCart() {
    const items = getCartItems();
    const count = getCartCount();
    const total = getCartTotal();

    const desktopItems =
        document.getElementById("desktopCartItems");

    const desktopCount =
        document.getElementById("desktopCartCount");

    const desktopTotal =
        document.getElementById("desktopCartTotal");

    if (desktopItems) {
        desktopItems.innerHTML =
            createCartHTML(items);
    }

    if (desktopCount) {
        desktopCount.textContent =
            `${count} ${
                count === 1
                    ? "προϊόν"
                    : "προϊόντα"
            }`;
    }

    if (desktopTotal) {
        desktopTotal.textContent =
            formatPrice(total);
    }

    const mobileItems =
        document.getElementById("mobileCartItems");

    const mobileCount =
        document.getElementById("mobileCartCount");

    const mobileTotal =
        document.getElementById("mobileCartTotal");

    const mobileSheetTotal =
        document.getElementById("mobileSheetTotal");

    if (mobileItems) {
        mobileItems.innerHTML =
            createCartHTML(items);
    }

    if (mobileCount) {
        mobileCount.textContent =
            `${count} ${
                count === 1
                    ? "προϊόν"
                    : "προϊόντα"
            }`;
    }

    if (mobileTotal) {
        mobileTotal.textContent =
            formatPrice(total);
    }

    if (mobileSheetTotal) {
        mobileSheetTotal.textContent =
            formatPrice(total);
    }
}


/* --------------------------------------------------
    CLEAR CART
-------------------------------------------------- */

function clearCart() {
    Object.values(products).forEach(product => {
        product.quantity = 0;
    });

    updateQuantityDisplays();
    updateCart();
}

document.addEventListener("click", event => {
    if (event.target.closest("#desktopClearCart")) {
        clearCart();
    }

    if (event.target.closest("#mobileClearCart")) {
        clearCart();
        closeMobileCart();
    }
});


/* --------------------------------------------------
    MOBILE CART SHEET
-------------------------------------------------- */

function openMobileCart() {
    if (mobileCartOverlay) {
        mobileCartOverlay.classList.add("open");
    }

    if (mobileCartSheet) {
        mobileCartSheet.classList.add("open");

        mobileCartSheet.setAttribute(
            "aria-hidden",
            "false"
        );
    }

    document.body.classList.add("cart-open");
}

function closeMobileCart() {
    if (mobileCartOverlay) {
        mobileCartOverlay.classList.remove("open");
    }

    if (mobileCartSheet) {
        mobileCartSheet.classList.remove("open");

        mobileCartSheet.setAttribute(
            "aria-hidden",
            "true"
        );
    }

    document.body.classList.remove("cart-open");
}

if (mobileCartOpen) {
    mobileCartOpen.addEventListener(
        "click",
        openMobileCart
    );
}

if (mobileCartClose) {
    mobileCartClose.addEventListener(
        "click",
        closeMobileCart
    );
}

if (mobileCartOverlay) {
    mobileCartOverlay.addEventListener(
        "click",
        closeMobileCart
    );
}

function updateMobileCartVisibility() {
    if (!mobileCartBar) return;

    const isCanteen =
        getPageFromHash() === "canteen";

    const isMobile =
        window.innerWidth <= 850;

    if (isCanteen && isMobile) {
        mobileCartBar.classList.add("visible");

        mobileCartBar.setAttribute(
            "aria-hidden",
            "false"
        );
    } else {
        mobileCartBar.classList.remove("visible");

        mobileCartBar.setAttribute(
            "aria-hidden",
            "true"
        );

        closeMobileCart();
    }
}

window.addEventListener(
    "resize",
    updateMobileCartVisibility
);


/* --------------------------------------------------
    PRODUCT SHELF DRAGGING
-------------------------------------------------- */

function setupProductScrollers() {
    const scrollers =
        document.querySelectorAll(
            ".product-scroller"
        );

    scrollers.forEach(scroller => {
        let isDragging = false;
        let startX = 0;
        let startScrollLeft = 0;

        scroller.addEventListener(
            "pointerdown",
            event => {
                if (
                    event.target.closest(
                        ".quantity-controls"
                    )
                ) {
                    return;
                }

                isDragging = true;
                startX = event.clientX;
                startScrollLeft =
                    scroller.scrollLeft;

                scroller.classList.add(
                    "dragging"
                );

                try {
                    scroller.setPointerCapture(
                        event.pointerId
                    );
                } catch (error) {
                    console.warn(
                        "Pointer capture unavailable."
                    );
                }
            }
        );

        scroller.addEventListener(
            "pointermove",
            event => {
                if (!isDragging) return;

                const distance =
                    event.clientX - startX;

                scroller.scrollLeft =
                    startScrollLeft - distance;
            }
        );

        function stopDragging() {
            isDragging = false;

            scroller.classList.remove(
                "dragging"
            );
        }

        scroller.addEventListener(
            "pointerup",
            stopDragging
        );

        scroller.addEventListener(
            "pointercancel",
            stopDragging
        );

        scroller.addEventListener(
            "pointerleave",
            () => {
                if (isDragging) {
                    stopDragging();
                }
            }
        );
    });
}


/* --------------------------------------------------
    INITIALIZATION
-------------------------------------------------- */

loadPage(getPageFromHash());

setInterval(updateCountdown, 60 * 1000);
setInterval(updateSaturdayCountdown, 1000);

window.addEventListener("load", () => {
    updateMobileCartVisibility();
});


/* --------------------------------------------------
    ANNOUNCEMENT BAR
-------------------------------------------------- */

function checkAnnouncement() {
    const bar =
        document.querySelector(
            ".announcement-bar"
        );

    if (!bar) return;

    const text =
        bar.querySelector("span");

    if (!text) return;

    if (text.scrollWidth > bar.clientWidth) {
        bar.classList.add("scrolling");
    } else {
        bar.classList.remove("scrolling");
    }
}

window.addEventListener(
    "load",
    checkAnnouncement
);

window.addEventListener(
    "resize",
    checkAnnouncement
);

/* --------------------------------------------------
    SATURDAY COUNTDOWN
-------------------------------------------------- */

function updateSaturdayCountdown() {
    const daysElement = document.getElementById("saturdayDays");
    const hoursElement = document.getElementById("saturdayHours");
    const minutesElement = document.getElementById("saturdayMinutes");
    const secondsElement = document.getElementById("saturdaySeconds");

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }

    const now = new Date();

    const nextSaturday = new Date(now);

    const daysUntilSaturday =
        (6 - now.getDay() + 7) % 7;

    nextSaturday.setDate(
        now.getDate() + daysUntilSaturday
    );

    nextSaturday.setHours(0, 0, 0, 0);

    // If it is already Saturday, count toward next Saturday.
    if (daysUntilSaturday === 0) {
        nextSaturday.setDate(
            nextSaturday.getDate() + 7
        );
    }

    const difference =
        nextSaturday.getTime() - now.getTime();

    const totalSeconds =
        Math.floor(difference / 1000);

    const days =
        Math.floor(totalSeconds / 86400);

    const hours =
        Math.floor((totalSeconds % 86400) / 3600);

    const minutes =
        Math.floor((totalSeconds % 3600) / 60);

    const seconds =
        totalSeconds % 60;

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
}