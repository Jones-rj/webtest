
// Get the current date elements
const currentDateElements = document.querySelectorAll('#current-date');

// Get the current date
const currentDate = new Date();

// Format the current date
const formattedDate = currentDate.toLocaleDateString();

// Update the current date elements with the formatted date
currentDateElements.forEach((element) => {
  element.querySelector('#date').textContent = formattedDate;
});

//date script end--------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    // Daily Verse Logic (example)
    const verses = [
        "யாக்கோபின் தேவனைத் தன் துணையாகக் கொண்டிருந்து, தன் தேவனாகிய கர்த்தர்மேல் நம்பிக்கையை வைக்கிறவன் பாக்கியவான். அவர் வானத்தையும் பூமியையும் சமுத்திரத்தையும் அவைகளிலுள்ள யாவையும் உண்டாக்கினவர்; அவர் என்றென்றைக்கும் உண்மையைக் காக்கிறவர். - சங்கீதம் 146 : 5 - 6"
       // "Verse 3: A third example verse."
    ];
    const verseTextDiv = document.getElementById('verse-text');
    const copyButton = document.getElementById('copy-button');
    const shareButton = document.getElementById('share-button');

    function displayVerse() {
        const randomIndex = Math.floor(Math.random() * verses.length);
        verseTextDiv.textContent = verses[randomIndex];
    }

    displayVerse(); // Display a verse on page load

    copyButton.addEventListener('click', function() {
        navigator.clipboard.writeText(verseTextDiv.textContent)
            .then(() => alert('Verse copied to clipboard!'))
            .catch(err => console.error('Could not copy verse: ', err));
    });

        // Get the like button and counter elements
        const likeButton = document.getElementById('like-btn');
        const likeCounter = document.getElementById('like-counter');
        
        const API_URL = 'https://your-render-api-url.com';
        
        // Load current Amen count
        function loadAmenCount() {
            fetch(`${API_URL}/get-likes`)
                .then(response => response.json())
                .then(data => {
                    likeCounter.innerText = `${data.count} ஆமென்`;
                })
                .catch(error => console.error('Error:', error));
        }
        
        // Handle Amen button click
        likeButton.addEventListener('click', () => {
            fetch(`${API_URL}/like`, { method: 'POST' })
                .then(response => response.json())
                .then(() => loadAmenCount())
                .catch(error => console.error('Error:', error));
        });
        
        // Load on page start
        loadAmenCount();
        
   /* shareButton.addEventListener('click', function() {
        // Basic share functionality (more complex implementations may be needed)
        alert('மன்னிக்கவும்!.. வசனம் பகிர்வு செய்வது தற்போது உபயோகத்தில் இல்லை. Copy Verse என்பதை உபயோகிக்கவும்.');
    });*/
    

    //english verse
    // Daily Verse Logic (example)
    const verses1 = [
        "Blessed are those whose help is the God of Jacob, whose hope is in the LORD their God. He is the Maker of heaven and earth, the sea, and everything in them— he remains faithful forever. - Psalms 146 : 5 - 6",
        //"Verse 2: Another example verse.",
       // "Verse 3: A third example verse."
    ];
    const verseTextDiv1 = document.getElementById('verse-text-eng');
    const copyButton1 = document.getElementById('copy-button1');
    const shareButton1 = document.getElementById('share-button1');

    function displayVerse1() {
        const randomIndex = Math.floor(Math.random() * verses1.length);
        verseTextDiv1.textContent = verses1[randomIndex];
    }

    displayVerse1(); // Display a verse on page load

    copyButton1.addEventListener('click', function() {
        navigator.clipboard.writeText(verseTextDiv1.textContent)
            .then(() => alert('Verse copied to clipboard!'))
            .catch(err => console.error('Could not copy verse: ', err));
    });

    
    const likeButton = document.getElementById('like-btn1');
    const likeCounter = document.getElementById('like-counter1');
    
    const API_URL = 'https://your-render-api-url.com';
    
    // Load current Amen count
    function loadAmenCount() {
        fetch(`${API_URL}/get-likes`)
            .then(response => response.json())
            .then(data => {
                likeCounter.innerText = `${data.count} ஆமென்`;
            })
            .catch(error => console.error('Error:', error));
    }
    
    // Handle Amen button click
    likeButton.addEventListener('click', () => {
        fetch(`${API_URL}/like`, { method: 'POST' })
            .then(response => response.json())
            .then(() => loadAmenCount())
            .catch(error => console.error('Error:', error));
    });
    
    // Load on page start
    loadAmenCount();
    

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
