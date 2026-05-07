const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const header = document.querySelector(".header");
const yearElement = document.querySelector("#year");
const parallaxItems = document.querySelectorAll("[data-parallax]");

if (menuIcon && navbar) {
    menuIcon.addEventListener("click", () => {
        menuIcon.classList.toggle("bx-x");
        navbar.classList.toggle("active");
    });
}

document.querySelectorAll(".navbar a").forEach((link) => {
    link.addEventListener("click", () => {
        menuIcon?.classList.remove("bx-x");
        navbar?.classList.remove("active");
    });
});

window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 24);

    parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.parallax || 0);
        const offset = window.scrollY * speed;
        item.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
});

const explorerBlocks = document.querySelectorAll(".explorer");

explorerBlocks.forEach((block) => {
    const cards = block.querySelectorAll("[data-panel-target]");
    const panels = block.querySelectorAll(".detail-panel");

    const openPanel = (panelId) => {
        const target = block.querySelector(`#${panelId}`);
        if (!target) {
            return;
        }

        cards.forEach((card) => {
            card.classList.toggle("is-selected", card.dataset.panelTarget === panelId);
        });

        panels.forEach((panel) => {
            panel.classList.toggle("is-open", panel.id === panelId);
        });

        target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            openPanel(card.dataset.panelTarget);
        });
    });

    block.querySelectorAll("[data-back-to]").forEach((button) => {
        button.addEventListener("click", () => {
            panels.forEach((panel) => panel.classList.remove("is-open"));
            cards.forEach((card) => card.classList.remove("is-selected"));

            const backTarget = document.getElementById(button.dataset.backTo);
            backTarget?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    if (window.location.hash) {
        const panelFromHash = window.location.hash.replace("#", "");
        if (block.querySelector(`#${panelFromHash}`)) {
            openPanel(panelFromHash);
        }
    }
});

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
