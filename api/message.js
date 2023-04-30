import express from 'express';
const app = express();

app.get('/api/message', async (req, res) => {
    const id = req.query.id;

    const resp = await fetch(`https://api.internal.temp-mail.io/api/v3/message/${id}`);
    const out = await resp.json();
    res.send(out.body_html || out.body_text);
})
