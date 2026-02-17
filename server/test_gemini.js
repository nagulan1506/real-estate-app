import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5001/api';

async function testLocalityInsights() {
    console.log('Testing Locality Insights...');
    try {
        const response = await fetch(`${BASE_URL}/locality-insights`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location: 'Anna Nagar, Chennai' })
        });
        const data = await response.json();
        console.log('Insights Response:', data);
    } catch (error) {
        console.error('Insights Error:', error);
    }
}

async function testChat() {
    console.log('\nTesting Chat...');
    try {
        const response = await fetch(`${BASE_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Do you have any villas in Anna Nagar?' })
        });
        const data = await response.json();
        console.log('Chat Response:', data);
    } catch (error) {
        console.error('Chat Error:', error);
    }
}

async function runTests() {
    await testLocalityInsights();
    await testChat();
}

runTests();
