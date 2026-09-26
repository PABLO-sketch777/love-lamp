const scene =
    document.getElementById("scene");

const pullSwitch =
    document.getElementById("pullSwitch");

const hint =
    document.getElementById("hint");

const particles =
    document.getElementById("particles");

const loveText =
    document.getElementById("loveText");

let isOn = false;

let animating = false;

function toggleLamp() {

    if (animating) {
        return;
    }

    animating = true;


    // Animate the cord
    pullSwitch.classList.add("pulling");


    // Reverse the lamp state
    isOn = !isOn;


    // Turn the lamp/background on or off
    scene.classList.toggle(
        "light-on",
        isOn
    );


    // Control the message
    if (isOn) {

        // BULB ON
        // Show I ❤️ U

        loveText.classList.remove(
            "heart-only"
        );

        hint.textContent =
            "Pull again to switch off";


        // Particle effect
        createParticles();

    } else {

        // BULB OFF
        // Show ONLY ❤️

        loveText.classList.add(
            "heart-only"
        );

        hint.textContent =
            "Pull the cord to switch on";
    }


    // Accessibility
    pullSwitch.setAttribute(
        "aria-pressed",
        String(isOn)
    );


    // Finish cord animation
    setTimeout(() => {

        pullSwitch.classList.remove(
            "pulling"
        );

        animating = false;

    }, 600);
}

pullSwitch.addEventListener('click', toggleLamp);

pullSwitch.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleLamp();
    }
});

function createParticles() {
    const rect = pullSwitch.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + 330;

    for (let i = 0; i < 30; i++) {

        const particle = document.createElement('span');
        particle.className = 'particle';

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 150;

        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;

        particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
        particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

        particles.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}