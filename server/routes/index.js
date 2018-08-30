const apiRoutes = require('./apiRoutes');
const router = require('express').Router();
const path = require('path');
router.use('/api', apiRoutes);
// If no API routes are hit, send the React app
router.use((req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});
module.exports = router;

