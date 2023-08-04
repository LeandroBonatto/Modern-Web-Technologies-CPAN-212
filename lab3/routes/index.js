var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

router.get('/generate-image', function(req, res){
    res.render('generate-image');
});

router.post('/generate-image', function(req, res){
    const { height, width, blur, grayscale} = req.body;
    const imageUrl = `https://picsum.photos/${height}/${width}?${grayscale ? 'grayscale&' : ''}${blur ? `blur=${blur}` : ''}`;
  res.render('generate-image', {imageUrl: imageUrl});
});

router.get('/generate-qr-code', function(req, res) {
  res.render('generate-qr-code');
});

router.post('/generate-qr-code', function(req, res) {
    const { height, width, value } = req.body;
    const imgURL = `https://image-charts.com/chart?chs=${height}x${width}&cht=qr&chl=${encodeURIComponent(value)}`;
  res.render('generate-qr-code', {qrCodeUrl: qrCodeUrl}); 
});


module.exports = router;