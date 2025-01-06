/**
 * @param Session Management.
 */
const accessSession = async() => {
    try {
        if(req.session.views) {
            req.session.views++,
            res.setHeader('Content-type', 'text/html'),
            res.write('<p>views: ' + req.session.views + '</p>'),
            res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>'),
            res.end();
        } else {
            res.session.view = 1;
            res.end('Welcome to the session demo. refresh!');
        }
    } catch(err) {
        res
        .status(500)
        .json({ message: `Invalid Session Id`})
        console.error(err);
    }
};

module.exports = accessSession;