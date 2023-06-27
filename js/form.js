const form = document.querySelector('#form');
const launchBtn = document.querySelector('#launch-btn');
const goToFormButton = document.querySelector('#go-to-form-btn');
const userEmailField = document.querySelector('#user-email');
const animationTime = 4000;
const gooseAminationPath = './img/gus-anim.gif';
const gooseAnimationClass = 'gus-anim';


// Smoothly scroll to the form
goToFormButton.addEventListener('click', function (e) {
    e.preventDefault();
    form.scrollIntoView({behavior: "smooth"});
});

function clearFormFields() {
    const fieldName = form.querySelector('input[type="text"]');
    const fieldEmail = form.querySelector('input[type="email"]');

    fieldName.value = '';
    fieldEmail.value = '';
}

// Create a new tag for animation
function addGooseElement() {
    const gooseEl = document.createElement('img');
    gooseEl.classList.add(gooseAnimationClass);

    form.appendChild(gooseEl);
}

function showGooseAnim() {
    const gooseEl = document.querySelector('.' + gooseAnimationClass);

    gooseEl.setAttribute('src', gooseAminationPath);
    
    // Set animation time
    setTimeout(() => {
        gooseEl.removeAttribute('src');
    }, animationTime)
}

addGooseElement();

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);

    // Disable button (prevent double clicking)
    launchBtn.setAttribute('disabled', true);
    launchBtn.style.opacity = '0.7';

    // Send API request to `netlify`
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      // After request has been sent
      .then(() => {
        showGooseAnim();

        // Wait time for the animation to get complete
        setTimeout(() => {
            // Enable button again for the next form submition
            launchBtn.removeAttribute('disabled')
            clearFormFields();
            launchBtn.style.opacity = '1';
        }, animationTime)
      })
      .catch((error) => console.log('Sending form failed'));
})

