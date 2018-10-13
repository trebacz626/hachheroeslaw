/*
 * GET home page.
 */
import express = require('express');
const router = express.Router();

//here will be api endpoints list
router.get('/api', (req: express.Request, res: express.Response) => {
    res.render('index', { title: 'Express' });
});

export default router;