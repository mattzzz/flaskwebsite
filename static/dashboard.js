// Function to fetch BTC/USD data from CoinGecko
const fetchBTCData = async () => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1');
        const data = await response.json();
        return data.prices.map((price) => {
            return { t: new Date(price[0]), y: price[1] }; // Convert timestamp to Date object
        });
    } catch (error) {
        console.error('Error fetching BTC data:', error);
        return [];
    }
};

const transformData = (apiResponse) => {
    return apiResponse.map(dataPoint => {
        return {
            x: new Date(dataPoint.t), // Converting ISO string to Date object
            y: dataPoint.y
        };
    });
};

// Add an event listener to the logout button
document.getElementById('logoutButton').addEventListener('click', function() {
    // Perform a logout action (e.g., clear session data on the server)
    // Redirect to the login page
    fetch('/logout', {
        method: 'POST',
        credentials: 'same-origin', // Include cookies in the request
    })
    .then(response => {
        if (response.status === 200) {
            // Logout was successful, redirect to the login page
            window.location.href = '/';
        } else {
            // Handle any logout errors or display a message
            console.error('Logout failed:', response.statusText);
        }
    })
    .catch(error => {
        // Handle fetch error
        console.error('Fetch error:', error);
    });
});


// Function to render the chart
const renderChart = async () => {
    const btcData = transformData(await fetchBTCData());
    console.log(btcData);
    const ctx = document.getElementById('btcChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'BTC Price',
                data: btcData, // your data array
                borderColor: 'rgb(75, 192, 192)',
                fill: false // if you want the area under the line not filled
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    distribution: 'linear',
                    time: {
                        unit: 'hour',
                        displayFormats: {
                            hour: 'MMM D, hA'
                        }
                    }
                }
            }
        }
    });
};

renderChart();


