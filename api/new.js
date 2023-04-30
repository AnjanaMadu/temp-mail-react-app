import express from 'express';
const app = express();

app.get('/api/new', async (req, res) => {
    const resp = await fetch('https://api.internal.temp-mail.io/api/v3/email/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ min_name_length: 10, max_name_length: 10 })
    });

    res.send(await resp.json());

    // {"email": xxxx, "token": xxxx}
})
