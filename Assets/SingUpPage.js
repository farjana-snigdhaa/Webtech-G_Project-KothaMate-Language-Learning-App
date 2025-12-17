document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('.signup-form');
    // ageInput already defined here: const ageInput = document.getElementById('age');
    const ageInput = document.getElementById('age');
    const ageDisplay = document.querySelector('.age-display');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const termsCheckbox = document.getElementById('terms');

    const requiredFields = [
        document.getElementById('first-name'),
        document.getElementById('last-name'),
        document.getElementById('user-name'),
        document.getElementById('email'),
        document.getElementById('password'),
        document.getElementById('confirm-password'),
        document.getElementById('contact-number')
    ];

    // -------------------------
    // AGE SLIDER UPDATE
    // -------------------------
    function updateAgeSlider() {
        // This function is for the RANGE input type, which is likely not visible if you
        // are using the AGE BUTTON SELECTION. You might want to remove this if you only
        // use the buttons, but I'll keep it for completeness and if 'age' is a range type.
        const min = parseInt(ageInput.min);
        const max = parseInt(ageInput.max);
        const value = parseInt(ageInput.value);

        const percentage = ((value - min) / (max - min)) * 100;

        ageInput.style.setProperty('--range-progress', `${percentage}%`);
        ageDisplay.textContent = value;
    }

    updateAgeSlider();
    ageInput.addEventListener('input', updateAgeSlider);


    // -------------------------
    // AGE BUTTON SELECTION (NEW CODE)
    // -------------------------
    const ageSteps = document.querySelectorAll(".age-step");

    ageSteps.forEach(step => {
        step.addEventListener("click", function () {

            // remove selected from all
            ageSteps.forEach(s => s.classList.remove("selected"));

            // add selected to clicked one
            this.classList.add("selected");

            // take numeric age range (first number from span)
            // It uses the text content of the first <span> child of the clicked button
            const ageValue = parseInt(this.querySelector("span").textContent);

            // update real age input value (This is the same ageInput variable)
            ageInput.value = ageValue;

            // update your displayed age
            ageDisplay.textContent = ageValue;
            
            // Note: If you use the age buttons, you may also want to call 
            // updateAgeSlider() here if you want the range slider's visual progress 
            // to update based on the button selection.
            updateAgeSlider(); 
        });
    });


    // -------------------------
    // SHOW ERROR MESSAGE
    // -------------------------
    function showError(field, message) {
        let error = field.parentElement.querySelector('.error-message');

        if (!error) {
            error = document.createElement('div');
            error.classList.add('error-message');
            error.style.color = 'red';
            error.style.fontSize = '12px';
            field.parentElement.appendChild(error);
        }

        error.textContent = message;
    }

    function clearError(field) {
        let error = field.parentElement.querySelector('.error-message');
        if (error) error.remove();
    }

    // -------------------------
    // VALIDATE REQUIRED FIELDS
    // -------------------------
    function validateRequiredFields() {
        let valid = true;

        requiredFields.forEach(field => {
            clearError(field);

            if (field.value.trim() === '') {
                showError(field, `${field.id.replace(/-/g, ' ')} is required.`);
                valid = false;
            }
        });

        return valid;
    }

    // -------------------------
    // VALIDATE TERMS CHECKBOX
    // -------------------------
    function validateTerms() {
        const container = termsCheckbox.parentElement;
        let error = container.querySelector('.error-message');

        if (!termsCheckbox.checked) {
            if (!error) {
                error = document.createElement('div');
                error.classList.add('error-message');
                error.style.color = 'red';
                error.style.fontSize = '12px';
                container.appendChild(error);
            }
            error.textContent = "You must accept the terms.";
            return false;
        }

        if (error) error.remove();
        return true;
    }

    // -------------------------
    // VALIDATE PASSWORD MATCH
    // -------------------------
    function validatePasswords() {
        clearError(confirmPasswordInput);

        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, "Passwords do not match.");
            return false;
        }
        return true;
    }

    // -------------------------
    // VALIDATE AGE RANGE
    // -------------------------
    function validateAgeRange() {
        // Ensure the current value is used, whether from slider or button click
        const age = parseInt(ageInput.value); 
        const minAge = 10;  // <-- UPDATED MINIMUM AGE

        const container = ageInput.parentElement;
        let error = container.querySelector('.error-message');

        if (age < minAge) {
            if (!error) {
                error = document.createElement('div');
                error.classList.add('error-message');
                error.style.color = 'red';
                error.style.fontSize = '12px';
                container.appendChild(error);
            }
            error.textContent = `You must be at least ${minAge} years old.`;
            return false;
        }

        if (error) error.remove();
        return true;
    }

    // -------------------------
    // FORM SUBMISSION
    // -------------------------
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const validFields = validateRequiredFields();
        const validTerms = validateTerms();
        const validPasswords = validatePasswords();
        const validAge = validateAgeRange();

        // Perform all checks before deciding if submission is valid
        if (!validFields || !validTerms || !validPasswords || !validAge) {
            return; 
        }

        // SUCCESS
        alert("All validation passed! Sign-up successful.");
        form.reset();
        updateAgeSlider(); // Reset the slider's visual state as well
    });

});