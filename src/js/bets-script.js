document.addEventListener('DOMContentLoaded', function () {
    fetch('data/weekly-bets.json')
    .then(response => response.json())
    .then(bets => {
        const betsContainer = document.querySelector('.bets-section'); // Select the bets section

        bets.forEach(bet => {
            const betInfo = document.createElement('div');
            betInfo.className = 'bet-info';

            const usernameElement = document.createElement('p');
            usernameElement.className = 'username';
            usernameElement.textContent = `Posted by: ${bet.username}`;

            const betTimestamp = new Date(bet.timestamp).toLocaleString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });

            const timestampElement = document.createElement('strong');
            timestampElement.textContent = `Timestamp: ${betTimestamp}`;
            const betContentElement = document.createElement('p');
            betContentElement.textContent = bet.notableBets;

            betInfo.appendChild(usernameElement);
            betInfo.appendChild(timestampElement);
            betInfo.appendChild(betContentElement);
            betsContainer.appendChild(betInfo);
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));
});
