document.addEventListener('DOMContentLoaded', function () {
    fetch('data/nfl-data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('data-container');

        data.forEach(game => {
            const gameInfo = document.createElement('div');
            gameInfo.className = 'game-info';

            const teams = document.createElement('h2');
            teams.innerHTML = `<img src="${getTeamLogo(game.home_team)}" alt="${game.home_team}"> ${game.home_team} vs <img src="${getTeamLogo(game.away_team)}" alt="${game.away_team}"> ${game.away_team}`;
            gameInfo.appendChild(teams);

            const gameTime = new Date(game.commence_time).toLocaleString();
            const updateTime = new Date(game.bookmakers[0].last_update).toLocaleString();

            gameInfo.innerHTML += `Game Time: ${gameTime}<br>Last Updated: ${updateTime}<br>`;

            game.bookmakers.forEach(bookmaker => {
                bookmaker.markets.forEach(market => {
                    const marketInfo = document.createElement('div');
                    marketInfo.className = 'market-info';
                    marketInfo.innerHTML = `<strong>${market.key.toUpperCase()}</strong>: `;

                    market.outcomes.forEach(outcome => {
                        marketInfo.innerHTML += `${outcome.name}: ${outcome.price} ${outcome.point ? '(' + outcome.point + ')' : ''} `;
                    });

                    gameInfo.appendChild(marketInfo);
                });
            });

            container.appendChild(gameInfo);
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));
});


function getTeamLogo(team) {
    return `../logos/${team.toLowerCase().replace(/\s/g, '-')}.png`;
}

