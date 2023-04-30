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

app.get('/api/messages', async (req, res) => {
    const email = req.query.email;

    const resp = await fetch(`https://api.internal.temp-mail.io/api/v3/email/${email}/messages`);
    res.send(await resp.json());

    // [{"id": xxxx, "from": xxxx, "to": xxx, "subject": xxxx, "body_text": xxxx, "body_html", "created_at": xxxx}]
})

app.get('/api/message', async (req, res) => {
    const id = req.query.id;

    const resp = await fetch(`https://api.internal.temp-mail.io/api/v3/message/${id}`);
    const out = await resp.json();
    res.send(out.body_html || out.body_text);
})
