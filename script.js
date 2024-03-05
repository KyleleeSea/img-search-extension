async function fetchData() {
    const url = 'https://scrapemax1.p.rapidapi.com/scrape?target_url=https%3A%2F%2Flens.google.com%2Fsearch%3Fp%3DAbrfA8pmBoJbb5LuWvU7kaRg-odxCFbcUAzSXz5cBfa5oK9gcyxhBKremeAfutNvavs0zlDIjpudgfHoWd5xQ-hyDRIHtpQNRq6bHXNxNOT-0lNPSYwZ3NWjKeYMCDqiWR3Mb2aGAnsyN0Bgfq9Q-JbEhC29LuKoX9A1QjLm7vADHuWXDUl8nqKHB7IPCEch2NudQDJx0T_yMJAPr3-NiVDh%23lns%3DW251bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsIkVrY0tKRGc1Tldaak9EZzFMV1kxWXpJdE5HTmhNeTFpTURsa0xUQmpNamsxT0RNd1pUZ3lPUklmWTE5dGIyazJPVFJuWkUxWVNVVXhUR3gwZUVKVlRHOVpUVGhJVGpSQ1p3PT0iXQ%3D%3D';
    
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a2bb78465msh45f0def267e515cp125150jsn661ebb179b64',
            'X-RapidAPI-Host': 'scrapemax1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);

    } catch (error) {
        console.error(error);
    }
}


fetchData();