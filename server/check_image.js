import fetch from "node-fetch";

const url = "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=1200&auto=format&fit=crop";

async function check() {
    try {
        const res = await fetch(url);
        console.log(`Status: ${res.status}`);
    } catch (e) {
        console.error(e);
    }
}

check();
