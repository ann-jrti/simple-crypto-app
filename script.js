const priceDataApi = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`
const coinTable = document.querySelector('.coin__table');
const searchInput = document.querySelector('.search');

async function getPrices() {
    const result = await fetch(priceDataApi)
    const data = await result.json()
    return data;
}

function generateCoinRow(id, logoSrc, name, symbol, price, priceChange) {
    const tableRow = document.createElement('tr');
    tableRow.classList.add(`${id}`, 'coin');

    const coinLogo = document.createElement('td');

    const imgLogo = document.createElement('img')
    imgLogo.classList.add('coin-logo');
    imgLogo.src = logoSrc

    const coinName = document.createElement('td');
    coinName.classList.add('coin-name');
    coinName.textContent = `${name} ${symbol}`

    const coinPrice = document.createElement('td');
    coinPrice.classList.add('coin-price');
    coinPrice.textContent = `$${price}`;

    const coinPriceChange = document.createElement('td');
    coinPriceChange.textContent = priceChange;
    coinPriceChange.classList.add('coin-price-change');

    tableRow.appendChild(coinLogo)
    coinLogo.appendChild(imgLogo)
    tableRow.appendChild(coinName)
    tableRow.appendChild(coinPrice)
    tableRow.appendChild(coinPriceChange)

    return tableRow;
}

function printCoinRows(data) {
    data.forEach(coin => {
        const coinData = generateCoinRow(coin.id, coin.image, coin.name, coin.symbol, coin.current_price, coin.price_change_24h);
        coinTable.appendChild(coinData);
    })
}

function colorPriceChange() {
    const pricesChange = document.querySelectorAll('.coin-price-change');
    pricesChange.forEach(price => {
        price.textContent < 0 ? price.style = `color: red` : price.style = `color: green`;
    })
}

function filterMatchedSearchedCoins(input) {
    const coinsHTML = document.querySelectorAll('.coin')
    Array.from(coinsHTML).forEach(c => {
        if (c.children[1].textContent.toLowerCase().startsWith(input.value)) {
            c.style.display = null;
        } else {
            c.style = `display: none`;
        }
    })
}

function enableSearchBar() {
    searchInput.addEventListener('keyup', () => {
        filterMatchedSearchedCoins(searchInput);
    })
}