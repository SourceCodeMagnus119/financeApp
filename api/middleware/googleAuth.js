const { GoogleAuth } = require("google-auth-library");

/**
 * @param Choose the right authentication client based on the environment.
 */
const handler = async() => {
    try {
        const auth = new GoogleAuth({
            scopes: 'https://www.googleapis.com/auth/cloud-platform'
        });
        const client = await auth.getClient();
        const projectId = await auth.getProjectId();
        const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
        const res = await client.request({ url });
        res.send(res.data);
    } catch(err) {
        console.error(err);
    }
}

module.exports = handler;