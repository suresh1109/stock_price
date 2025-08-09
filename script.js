// Replace with your Alpha Vantage API key
const apiKey = "DC50O4E0Y3LL5XMH"; 

async function getStockPrice() {
    const symbol = document.getElementById("stockSymbol").value.trim().toUpperCase();
    const resultDiv = document.getElementById("result");

    if (!symbol) {
        resultDiv.innerHTML = "<p style='color:red;'>Please enter a stock symbol.</p>";
        return;
    }

    try {
        resultDiv.innerHTML = "<p>Loading...</p>";

        // API request
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();

        if (!data["Global Quote"] || !data["Global Quote"]["05. price"]) {
            resultDiv.innerHTML = `<p style='color:red;'>Stock symbol not found. Try again.</p>`;
            return;
        }

        const price = parseFloat(data["Global Quote"]["05. price"]).toFixed(2);
        const change = data["Global Quote"]["09. change"];
        const changePercent = data["Global Quote"]["10. change percent"];

        resultDiv.innerHTML = `
            <h3>${symbol}</h3>
            <p><strong>Price:</strong> $${price}</p>
            <p><strong>Change:</strong> ${change} (${changePercent})</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = "<p style='color:red;'>Error fetching data. Please try again later.</p>";
        console.error(error);
    }
}
