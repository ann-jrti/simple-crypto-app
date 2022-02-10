
function startApp() {
    getPrices().then(data => {
        printCoinRows(data)
        colorPriceChange();
        enableSearchBar();
    })
}

startApp();