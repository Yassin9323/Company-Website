// be sure to open it with live server
// be sure to open it with live server
// be sure to open it with live server

"use strict"
var typed = new Typed('.typing', {
    strings: ["Innovators in Technology", "Tech Enthusiasts"],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true
})

const navTogglerBtn = document.querySelector(".nav-toggler");
navTogglerBtn.addEventListener("click", () =>
{
    document.querySelector(".aside").classList.toggle("show")
    document.querySelector(".aside .nav-toggler").classList.toggle("nav-toggler-animate")
})

const navLinks = document.querySelectorAll(".nav-link")



const home = document.querySelector(".home")
const about = document.querySelector(".about")
const service = document.querySelector(".service")
const portfolio = document.querySelector(".portfolio")
const contact = document.querySelector(".contact")

let currentSectionName = 'home'
function displaySection(sectionName)
{
    navLinks.forEach((nav) =>
    {
        nav.classList.remove("active")
    })
    document.querySelector(`.nav-${sectionName}`).classList.add("active")
    if (document.querySelector(".aside").classList.contains("show")) {
        document.querySelector(".aside").classList.remove("show");
        document.querySelector(".aside .nav-toggler").classList.toggle("nav-toggler-animate");
    }
    if (currentSectionName != sectionName) {
        let screenWidth = window.innerWidth;
        document.querySelector(`.section.${currentSectionName}`).style.zIndex = "0"
        document.querySelector(`.section.${sectionName}`).style.zIndex = "1"
        document.querySelector(`.section.${sectionName}`).style.left = (screenWidth > 1199) ? "270px" : "0";
        // let screenWidth = window.innerWidth;

        // Increment the screen width by one
        // console.log(window.innerWidth);
        // window.innerWidth = screenWidth + 1;
        // console.log(window.innerWidth);
        // window.innerWidth = screenWidth - 1;
        // console.log(window.innerWidth);

        // var resizeEvent = new Event('resize');
        // // Fire the resize event on the window object
        // window.dispatchEvent(resizeEvent);
        // window.dispatchEvent(resizeEvent);
        
        setTimeout(() =>
        {
            document.querySelector(`.section.${currentSectionName}`).style.left = "100%"
            currentSectionName = sectionName
        }, 300)

    }
}

window.addEventListener('load', () =>
{
    let cards = document.querySelectorAll(".portfolio-item");
    for (const card of cards) {
        let imgHe1 = card.querySelector(".portfolio-item-content").offsetHeight;
        let imgHe2 = card.querySelector(".portfolio-item-inner").offsetHeight;
        let beforeHeight = `${imgHe1 - imgHe2 - 2}px`;
        card.style.setProperty('--before-height', beforeHeight)
    }
});
window.addEventListener('resize', () =>
{
    let screenWidth = window.innerWidth;
    document.querySelector(`.section.${currentSectionName}`).style.left = (screenWidth > 1199) ? "270px" : "0";

    let cards = document.querySelectorAll(".portfolio-item");
    for (const card of cards) {
        let imgHe1 = card.querySelector(".portfolio-item-content").offsetHeight;
        let imgHe2 = card.querySelector(".portfolio-item-inner").offsetHeight;
        let beforeHeight = `${imgHe1 - imgHe2 - 2}px`;
        card.style.setProperty('--before-height', beforeHeight)
    }
});

function displayCopiedMessage(messageContainer)
{
    document.querySelector(`.${messageContainer} .message-tip`).style.display = "flex"
    setTimeout(() =>
    {
        document.querySelector(`.${messageContainer} .message-tip`).style.display = "none"
    }, 1500)
}

function copyToClipboard(text, messageContainer)
{
    // create a temporary textarea element to hold the text
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);

    // select the text and copy it to the clipboard
    textarea.select();
    document.execCommand('copy');

    // remove the temporary element from the document
    document.body.removeChild(textarea);

    displayCopiedMessage(messageContainer)
}




// Glow effent
const handleMouseOver = e =>
{
    const { currentTarget: target } = e;
    target.querySelector(".portfolio-filter").style.opacity = 1
}
const handleMouseOut = e =>
{
    const { currentTarget: target } = e;
    target.querySelector(".portfolio-filter").style.opacity = 0
}

// *********************
const cards = document.getElementsByClassName("portfolio-item-content")
document.getElementById("cards").onmousemove = e =>
{
    let cX = e.clientX, cY = e.clientY;
    let heighImg = document.querySelector(".portfolio-item-inner").offsetHeight;
    for (const card of cards) {
        const rect = card.getBoundingClientRect(),
            x = cX - rect.left,
            y = cY - rect.top,
            z = cY - rect.top - heighImg;
        card.style.setProperty("--mouse-x", `${x}px`)
        card.style.setProperty("--mouse-y", `${y}px`)
        card.style.setProperty("--mouse-yy", `${z}px`)
    }
}


// scorllreveal
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    // delay: 400
});

sr.reveal(".home-info", { origin: 'top', interval: 100 })
sr.reveal(".home-img", { origin: 'bottom' })
// sr.reveal(".section-title, .about-text", { origin: 'top' })
// sr.reveal(".personal-info", { origin: 'left' })
// sr.reveal(".skills", { origin: 'right' })

// Initialize EmailJS
console.log('Initializing EmailJS...');
emailjs.init("ez1tFzOtOjE9QtJDV");
console.log('EmailJS initialized');

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.error('Contact form not found!');
        return;
    }
    
    console.log('Contact form found, adding event listener');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Disable the submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';
        
        // Get current time
        const now = new Date();
        const time = now.toLocaleString();
        
        // Get form data
        const formData = {
            name: this.querySelector('[name="name"]').value,
            email: this.querySelector('[name="email"]').value,
            subject: this.querySelector('[name="subject"]').value,
            message: this.querySelector('[name="message"]').value
        };
        
        console.log('Sending email with data:', formData);
        
        // Verify service ID exists
        if (!emailjs.send) {
            console.error('EmailJS service not properly initialized');
            submitButton.innerHTML = 'Service Error!';
            submitButton.style.backgroundColor = '#f44336';
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 3000);
            return;
        }
        
        // Send the email using EmailJS
        emailjs.send("service_1s7w76y", "template_694zn08", formData)
            .then(function(response) {
                console.log('Email sent successfully:', response);
                // Show success message
                submitButton.innerHTML = 'Message Sent!';
                submitButton.style.backgroundColor = '#4CAF50';
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.style.backgroundColor = '';
                    submitButton.disabled = false;
                }, 3000);
            })
            .catch(function(error) {
                console.error('Email sending failed:', error);
                let errorMessage = 'Error! Try Again';
                
                // Provide more specific error messages
                if (error.text && error.text.includes('service ID not found')) {
                    errorMessage = 'Service Error - Please contact support';
                } else if (error.text && error.text.includes('template ID not found')) {
                    errorMessage = 'Template Error - Please contact support';
                } else if (error.text && error.text.includes('variables')) {
                    errorMessage = 'Template Variables Error - Please contact support';
                }
                
                // Show error message
                submitButton.innerHTML = errorMessage;
                submitButton.style.backgroundColor = '#f44336';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.style.backgroundColor = '';
                    submitButton.disabled = false;
                }, 3000);
            });
    });
});
