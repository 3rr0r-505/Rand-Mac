document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const resultDiv = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');

    generateButton.addEventListener('click', function() {
        const macPrefix = document.getElementById('macPrefix').value;
        const macFormat = document.getElementById('macFormat').value;
        const macCase = document.getElementById('macCase').value;

        const generatedMacAddress = generateRandomMacAddress(macPrefix, macFormat, macCase);
        resultDiv.innerText = generatedMacAddress;

        // Enable the "Copy" button after generating the MAC address
        copyButton.disabled = false;
    });

    function generateRandomMacAddress(prefix, format, casing) {
        let macAddress = prefix; // Use the user-provided prefix as the starting point
        const characters = '0123456789ABCDEF';

        while (macAddress.length < 12) {
            // Generate the rest of the MAC address after the prefix
            macAddress += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        macAddress = macAddress.toUpperCase(); // Ensure the MAC address is in uppercase

        // Add separators based on the selected format
        if (format === 'dot') {
            macAddress = macAddress.match(/.{1,2}/g).join('.');
        } else if (format === 'hyphen') {
            macAddress = macAddress.match(/.{1,2}/g).join('-');
        } else {
            macAddress = macAddress.match(/.{1,2}/g).join(':');
        }

        return casing === 'uppercase' ? macAddress : macAddress.toLowerCase();
    }

    function copyToClipboard() {
        const generatedMacAddress = resultDiv.innerText;
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = generatedMacAddress;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);

        // Change the "Copy" button text temporarily to indicate success
        copyButton.innerText = 'Copied!';
        setTimeout(function() {
            copyButton.innerText = 'Copy';
        }, 2000);
    }

    copyButton.addEventListener('click', copyToClipboard);
});
