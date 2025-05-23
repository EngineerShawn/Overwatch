
// /api/interactions.js
export default async function handler(req, res) {
  const crypto = await import('node:crypto');

  const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;
  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  const rawBody = await getRawBody(req);

  const isVerified = verifyDiscordRequest(rawBody, signature, timestamp, DISCORD_PUBLIC_KEY);

  if (!isVerified) {
    return res.status(401).send('Bad request signature');
  }

  const body = JSON.parse(rawBody.toString('utf8'));

  if (body.type === 1) {
    // PING from Discord
    return res.status(200).json({ type: 1 });
  }

  // You can handle commands here later
  return res.status(200).json({ type: 4, data: { content: "Command received!" } });
}

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', () => resolve(Buffer.from(data)));
    req.on('error', reject);
  });
}

function verifyDiscordRequest(rawBody, signature, timestamp, publicKey) {
  const isValid = crypto.verify(
    null,
    Buffer.from(timestamp + rawBody),
    {
      key: Buffer.from(publicKey, 'hex'),
      format: 'der',
      type: 'spki',
    },
    Buffer.from(signature, 'hex')
  );

  return isValid;
}
