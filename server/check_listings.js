import fetch from "node-fetch";

async function check() {
    try {
        const res = await fetch("http://localhost:5001/api/properties");
        const data = await res.json();
        console.log("Property Titles:");
        data.forEach(p => console.log(`- ${p.title} (${p.id})`));
    } catch (e) {
        console.error(e);
    }
}

check();
