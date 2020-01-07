let topTextInput, bottomTextInput, topTextSizeInput, bottomTextSizeInput, styleInput, imageInput, generateBtn, downloadBtn, canvas, ctx;

topTextInput = document.getElementById('top-text');
bottomTextInput = document.getElementById('bottom-text');
topTextSizeInput = document.getElementById('top-text-size-input');
bottomTextSizeInput = document.getElementById('bottom-text-size-input');
styleInput = document.getElementById("select-font").value;
imageInput = document.getElementById('image-input');
generateBtn = document.getElementById('generate-btn');
selectFont = document.getElementById('select-font');
downloadBtn = document.getElementById('download-btn')
canvas = document.getElementById('meme-canvas');

ctx = canvas.getContext('2d');

canvas.width = canvas.height = 0;

// Default text
topTextInput.value = "Top Text";
bottomTextInput.value = 'Bottom text';


function generateMeme (img, topText, bottomText, topTextSize, bottomTextSize) {
    let fontSize;

    // Size canvas to image
    canvas.width = img.width;
    canvas.height = img.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw main image
    ctx.drawImage(img, 0, 0);

    // Text style: white with black borders
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';

    //Change text color based on the color chosen
    ctx.fillStyle = document.getElementById("ColorPicker").value;

    // Top text font size and style
    fontSize = canvas.width * topTextSize;
    ctx.font = fontSize + 'px ' + styleInput;
    ctx.lineWidth = fontSize / 20;

    // Draw top text
    ctx.textBaseline = 'top';
    topText.split('\n').forEach(function (t, i) {
        ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width);
    });

    // Bottom text font size and style
    fontSize = canvas.width * bottomTextSize;
    ctx.font = fontSize + 'px ' + styleInput;
    ctx.lineWidth = fontSize / 20;

    // Draw bottom text
    ctx.textBaseline = 'bottom';
    bottomText.split('\n').reverse().forEach(function (t, i) { // .reverse() because it's drawing the bottom text from the bottom up
        ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
    });

    // Change font selection from dropdown list
    function changeFont(font) {
        styleInput = font.value;
    }

    // Dropdown font selector listener
    selectFont.addEventListener('change', function () {
        changeFont(this)
    });

    //Show download button
    document.getElementById("download-btn").style.display = 'block';

    function downloadMeme() {
        var src = canvas.toDataURL('png'); // creates image src
        var a  = document.createElement('a'); //create anchor tag
        a.href = src; //add src to anchor tage
        a.download = 'Amazing-Meme.png'; // name of downloaded file
    
        a.click() // activates link
    }

     // Download button click listener
     downloadBtn.addEventListener('click', function () {
        downloadMeme()
    });
}

// Generate button click listener
generateBtn.addEventListener('click', function () {

    // Read image as DataURL using the FileReader API and generates meme based on image
    let reader = new FileReader();
    reader.onload = function () {
        img = new Image;
        img.src = reader.result;
        generateMeme(img, topTextInput.value, bottomTextInput.value, topTextSizeInput.value, bottomTextSizeInput.value);
    };
    reader.readAsDataURL(imageInput.files[0]);
});






