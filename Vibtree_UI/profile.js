
document.addEventListener('DOMContentLoaded', () => {
    const profileContainer = document.getElementById('profile-container');
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (userDetails) {
        userDetails.forEach(user => {
            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = 'profile_img.png'; 
            img.alt = 'Profile Picture';

            const info = document.createElement('div');
            info.className = 'info';

            const name = document.createElement('h2');
            name.textContent = user.name;

            const email = document.createElement('p');
            email.textContent = `Email: ${user.eMail}`;

            const phone = document.createElement('p');
            phone.textContent = `Phone: ${user.phone}`;

            const dob = document.createElement('p');
            dob.textContent = `Date of Birth: ${user.dateOfBirth}`;

            info.appendChild(name);
            info.appendChild(email);
            info.appendChild(phone);
            info.appendChild(dob);
            card.appendChild(img);
            card.appendChild(info);
            profileContainer.appendChild(card);
        });
    } else {
        profileContainer.textContent = 'No user data available.';
    }

    // Logout functionality
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('userDetails');
        window.location.href = 'index.html';
    });
});
