document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'https://webtest-abn1.onrender.com'; // Update with actual deployed URL

    // ✅ Update Current Date
    const currentDateElements = document.querySelectorAll('#current-date');
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    currentDateElements.forEach((element) => {
        element.querySelector('#date').textContent = formattedDate;
    });

    // ✅ Tamil and English Verses
    const tamilVerses = [
        "யாக்கோபின் தேவனைத் தன் துணையாகக் கொண்டிருந்து, தன் தேவனாகிய கர்த்தர்மேல் நம்பிக்கையை வைக்கிறவன் பாக்கியவான். - சங்கீதம் 146:5",
        "கர்த்தர் நமக்கு அருளின கருணை புதியதாய் இருக்கிறது. - புலம்பல் 3:23"
    ];

    const englishVerses = [
        "Blessed is he whose help is the God of Jacob, whose hope is in the Lord his God. - Psalm 146:5",
        "The steadfast love of the Lord never ceases; his mercies never come to an end. - Lamentations 3:23"
    ];

    function displayVerse(verseTextDiv, verses) {
        const randomIndex = Math.floor(Math.random() * verses.length);
        verseTextDiv.textContent = verses[randomIndex];
    }

    const tamilVerseDiv = document.getElementById('verse-text');
    const englishVerseDiv = document.getElementById('verse-text-eng');
    displayVerse(tamilVerseDiv, tamilVerses);
    displayVerse(englishVerseDiv, englishVerses);

    // ✅ Copy Button Functionality
  function loadAmenCount(buttonId, counterId, endpoint) {
        fetch(`${API_URL}/${endpoint}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById(counterId).innerText = `${data.count} ஆமென்`;
            })
            .catch(error => console.error('Error:', error));
    }

    function setupLikeButton(buttonId, counterId, endpoint) {
        document.getElementById(buttonId).addEventListener('click', () => {
            fetch(`${API_URL}/${endpoint}`, { method: 'POST' })
                .then(response => response.json())
                .then(() => loadAmenCount(buttonId, counterId, 'get-likes'))
                .catch(error => console.error('Error:', error));
        });
    }

    // ✅ Set up Tamil Amen Button
    loadAmenCount('like-btn', 'like-counter', 'get-likes');
    setupLikeButton('like-btn', 'like-counter', 'like');

    // ✅ Set up English Amen Button
    loadAmenCount('like-btn1', 'like-counter1', 'get-likes');
    setupLikeButton('like-btn1', 'like-counter1', 'like');

    // ✅ Copy Button Functionality
    function setupCopyButton(buttonId, verseDiv) {
        document.getElementById(buttonId).addEventListener('click', function() {
            navigator.clipboard.writeText(verseDiv.textContent)
                .then(() => alert('Verse copied to clipboard!'))
                .catch(err => console.error('Could not copy verse:', err));
        });
    }

    setupCopyButton('copy-button', document.getElementById('verse-text'));
    setupCopyButton('copy-button1', document.getElementById('verse-text-eng'));
});

  /*  shareButton1.addEventListener('click', function() {
        // Basic share functionality (more complex implementations may be needed)
        alert('Sorry! Now, Share functionality not fully implemented. You can manually copy and share the verse..');
    }); */
    //verse code end.....

    // Prayer Request Form Handling (example)
    const prayerForm = document.getElementById('prayer-form');
    prayerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const name = document.getElementById('name').value;
        const fatherName = document.getElementById('father-name').value;
        const mobile = document.getElementById('mobile').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const prayerRequest = document.getElementById('prayer-request').value;

        // Here, you would typically send this data to a server
        // For demonstration purposes, just log the data
        console.log({
            name,
            fatherName,
            mobile,
            email,
            address,
            prayerRequest
        });

        alert('Prayer request submitted! Dont Worry! '+ name+' God Always With You..& GOD BLESS YOU...');

        // Clear the form
        prayerForm.reset();
    });
});
