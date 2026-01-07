// Typing effect
const words = ['a Programmer', 'a Student', 'a Developer', 'a Human'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeEffect() {
    const currentWord = words[wordIndex];
    const typingElement = document.getElementById('typingText');

    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 100;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        // Pause at end of word
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1500);
});

// Toggle section dropdown
function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);
    const header = content.previousElementSibling;
    
    content.classList.toggle('active');
    header.classList.toggle('active');
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const form = document.getElementById('contactForm');
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    formMessage.style.display = 'none';
    
    // Get form data
    const templateParams = {
        from_name: document.getElementById('from_name').value,
        from_email: document.getElementById('from_email').value,
        message: document.getElementById('message').value
    };
    
    // Send email using EmailJS
    emailjs.send('service_lwnm2q3', 'template_6vfy43i', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            formMessage.className = 'form-message success';
            formMessage.textContent = '✓ Message sent successfully! I will get back to you soon.';
            formMessage.style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send <i class="fas fa-paper-plane"></i>';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, function(error) {
            console.log('FAILED...', error);
            
            // Show error message
            formMessage.className = 'form-message error';
            formMessage.textContent = '✗ Failed to send message. Please try again or contact me directly at ravinissa@gmail.com';
            formMessage.style.display = 'block';
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send <i class="fas fa-paper-plane"></i>';
        });
    
    return false;
}

function showAbout() {
    document.getElementById('hero').classList.add('hidden');
    document.getElementById('about').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function showHero() {
    document.getElementById('about').classList.add('hidden');
    document.getElementById('hero').classList.remove('hidden');
    window.scrollTo(0, 0);
}