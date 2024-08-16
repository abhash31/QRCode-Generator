const qrCodeHolder = document.querySelector('#qr-code');
const userInput = document.querySelector('#user-input');
const qrForm = document.querySelector('#qr-form');

const pageTitle = document.querySelector('#page-title');
const pageFoot = document.querySelector('#page-foot');


let qrCode;

let input = "https://www.google.com";

function generateQRCode(uInput){
    return new QRCode(qrCodeHolder, {
        text: uInput,
        height: 200,
        width: 200,
        colorDark: "#000000",
		colorLight: "#ffffff",
		correctLevel: QRCode.CorrectLevel.H,
    });
}

if(window.innerWidth<768){
    userInput.addEventListener('focus',(e)=>{
        pageTitle.style.visibility = 'hidden'
        pageFoot.style.visibility = 'hidden';
    });
    userInput.addEventListener('blur',(e)=>{
        pageTitle.style.visibility = 'visible'
        pageFoot.style.visibility = 'visible';
    });
}

qrCode = generateQRCode(input)

qrForm.addEventListener('submit', function(e){
    e.preventDefault();
    // if(document.querySelector('a')) document.querySelector('a').remove();
    const input = userInput.value;
    if(qrCode == null) {
        qrCode = generateQRCode(input);
    }
    else qrCode.makeCode(input);
    saveBtnGenerator(qrCodeHolder.querySelector('canvas').toDataURL(), input);
});


function saveBtnGenerator(url, input){
    const btn = document.querySelector('.save-btn');
    btn.setAttribute('href', url);
    // btn.innerHTML = 'click me';
    btn.download = `${input}-qrcode.png`;
    btn.style.visibility = 'visible';
}
