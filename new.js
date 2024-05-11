const urlParams = new URLSearchParams(window.location.search);
        const imageURL = urlParams.get('imageURL');
        const title = urlParams.get('title');
        const description = urlParams.get('description');

        document.getElementById('new_image').src = imageURL;
        document.getElementById('new_title').textContent = title;
        document.getElementById('new_description').textContent = description;