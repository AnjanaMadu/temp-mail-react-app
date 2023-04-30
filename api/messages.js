import express from 'express';
const app = express();

app.get('/api/messages', async (req, res) => {
    const email = req.query.email;

    const resp = await fetch(`https://api.internal.temp-mail.io/api/v3/email/${email}/messages`);
    res.send(await resp.json());

    // [{"id": xxxx, "from": xxxx, "to": xxx, "subject": xxxx, "body_text": xxxx, "body_html", "created_at": xxxx}]
})
