var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/generate-image', (req, res) => {
  res.render('generate-image');
});

router.post('/generate-image', (req, res) => {
  const { height, width, blur, grayscale} = req.body;
  const imgURL = `https://picsum.photos/${width}/${height}?${grayscale ? 'grayscale&' : ''}${blur ? `blur=${blur}` : ''}`;
  res.render('generate-image', {imgURL});
});

router.get('/generate-qr-code', (req,res) => {
  res.render('generate-qr-code');
});

router.post('/generate-qr-code', (req, res) => {
  const { height, width, value } = req.body;
  const imgURL = `https://image-charts.com/chart?chs=${width}x${height}&cht=qr&chl=${encodeURIComponent(value)}`;
  res.render('generate-qr-code', { imgURL });
});


module.exports = router;
