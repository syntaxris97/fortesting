document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let formData = new FormData(form);
        let actionUrl = form.getAttribute('action');

        fetch(actionUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => response.blob())
        .then(blob => {
            let downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'processed_image.png';
            downloadLink.click();
        })
        .catch(error => alert('Error: ' + error));
    });
});
