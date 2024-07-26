
const form = document.getElementById('form');
const username = document.getElementById('username');
const number = document.getElementById('number');
const date = document.getElementById('date');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', async e => {
    e.preventDefault();
    if (validateInputs()) {
        const userData = {
            userID: 2,
            name: username.value.trim(),
            phone: number.value.trim(),
            dateOfBirth: date.value.trim(),
            eMail: email.value.trim(),
            password: password.value.trim(),
            isActive: true
        };

        try {
            await addUser(userData);
            const userDetails = await getUserDetails();
            localStorage.setItem('userDetails', JSON.stringify(userDetails.data));
            window.location.href = 'profile.html';
        } catch (error) {
            console.error('Error:', error);
        }
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const numberValue = number.value.trim();
    const emailValue = email.value.trim();
    const dateValue = date.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    let isValid = true;

    if (usernameValue === '') {
        setError(username, 'Name is required');
        isValid = false;
    } else {
        setSuccess(username);
    }

    if (numberValue === '') {
        setError(number, 'Phone Number is required');
        isValid = false;
    } else if (numberValue.length !== 10) {
        setError(number, 'Invalid Number');
        isValid = false;
    } else {
        setSuccess(number);
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        isValid = false;
    } else {
        setSuccess(email);
    }

    if (dateValue === '') {
        setError(date, 'This field should be filled');
        isValid = false;
    } else {
        setSuccess(date);
    }

    if (passwordValue === '') {
        setError(password, 'Password is required');
        isValid = false;
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters.');
        isValid = false;
    } else {
        setSuccess(password);
    }

    if (password2Value === '') {
        setError(password2, 'Please confirm your password');
        isValid = false;
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords don't match");
        isValid = false;
    } else {
        setSuccess(password2);
    }

    return isValid;
};

const addUser = async userData => {
    const response = await fetch('https://localhost:7271/api/Users/AddUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error('Failed to add user');
    }

    return response.json();
};

const getUserDetails = async () => {
    const response = await fetch('https://localhost:7271/api/Users/GetUserDetail', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user details');
    }

    return response.json();
};
