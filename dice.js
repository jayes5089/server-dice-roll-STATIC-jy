window.onload = function() {
    rollDice();
    pingServer();
    testCorsFailure();

    document.getElementById('rollButton').addEventListener('click', rollDice);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('rollButton').click();
        }
    });
};

async function rollDice() {
    const die1Element = document.getElementById('die1');
    const die2Element = document.getElementById('die2');

    try {
        const response = await fetch ('https://server-dice-roll-nodejs-jy-fygkgyckdtaxhuf6.centralus-01.azurewebsites.net/roll-dice');
        const data = await response.json();

        setDiceFace(die1Element, data.face1);
        setDiceFace(die2Element, data.face2);

        document.getElementById('result1').value = data.die1;
        document.getElementById('result2').value = data.die2;
    }
    catch (error) {
        console.error('Failure to roll the dice', error);
    }
}

function setDiceFace(dieElement, faceRotation) {
    dieElement.style.transform = `rotateX(${faceRotation.x}deg) rotateY(${faceRotation.y}deg)`;
}

async function testCorsFailure() {
    try {
        const response = await fetch('https://server-dice-roll-nodejs-jy-fygkgyckdtaxhuf6.centralus-01.azurewebsites.net/roll-dice-fail');
        const data = await response.json();
        console.log('CORS Failure Test Response:', data);
    }
    catch (error) {
        console.error('CORS Failure as expected', error);
    }
}

async function pingServer() {
    try {
        const response = await fetch('https://server-dice-roll-nodejs-jy-fygkgyckdtaxhuf6.centralus-01.azurewebsites.net/api/ping');
        const data = await response.text();
        console.log('Ping Response:', data);
    }
    catch (error) {
        console.error('Failed to ping the server:', error);
    }
    
}