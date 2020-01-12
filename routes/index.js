var express = require('express');
var router = express.Router();
var multer = require('multer');
var moment = require('moment');
var pro_Model = require("../model/products.js");
var user_Model = require("../model/users.js");
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/upload')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
})
var upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Trang chủ' });
});
/* GET admin page. */
router.get('/admin', function(req, res, next) {
    pro_Model.find({}, function(err, dulieu) {
        res.render('admin', { title: 'Admin', data: dulieu, moment: moment });
    })
});
/* GET product page. */
router.get('/product', function(req, res, next) {
    res.render('product', { title: 'Product' });
});
/* GET productDetail page. */
router.get('/productDetail', function(req, res, next) {
    res.render('productDetail', { title: 'Product' });
});
/* GET Add_products page. */
router.get('/admin/addProduct', function(req, res, next) {
    res.render('admin/addProduct', { title: 'Admin' });
});
router.post('/admin/addProduct', upload.single('image'), function(req, res, next) {
    var product = {
        "name": req.body.name,
        "thuonghieu": req.body.thuonghieu,
        "xuatxu": req.body.xuatxu,
        "loai": req.body.loai,
        "may": req.body.may,
        "kinh": req.body.kinh,
        "day": req.body.day,
        "soluong": req.body.soluong,
        "dongia": req.body.dongia,
        "image": req.file.filename,
        "decribe": req.body.decribe
    }
    var dulieu = new pro_Model(product);

    dulieu.save();
    res.redirect('/admin/addProduct');
});

//Xóa sản phẩm
router.get('/xoa/:idcanxoa', function(req, res, next) {
    var id = req.params.idcanxoa;
    pro_Model.findByIdAndRemove(id).exec();
    res.redirect('/admin');

});

//Sửa sản phẩm
router.get('/admin/updateProduct/:idcansua', function(req, res, next) {
    var id = req.params.idcansua;
    pro_Model.find({ _id: id }, function(err, dulieu) {
        res.render('admin/updateProduct', { title: 'Admin', data: dulieu });
    });
});
router.post('/admin/updateProduct/:idcansua', upload.single('image'), function(req, res, next) {
    var id = req.params.idcansua;
    pro_Model.findById(id, function(err, dulieu) {
        if (err) return handleError(err);
        dulieu.name = req.body.name,
            dulieu.thuonghieu = req.body.thuonghieu,
            dulieu.xuatxu = req.body.xuatxu,
            dulieu.loai = req.body.loai,
            dulieu.may = req.body.may,
            dulieu.kinh = req.body.kinh,
            dulieu.day = req.body.day,
            dulieu.soluong = req.body.soluong,
            dulieu.dongia = req.body.dongia,
            dulieu.image = req.file.filename,
            dulieu.decribe = req.body.decribe
        dulieu.save();
        res.redirect('/admin');
    });
});
//get danh sách user
router.get('/admin/showUser', function(req, res, next) {
    user_Model.find({}, function(err, dulieu) {
        res.render('admin/showUser', { title: 'Admin', data: dulieu, moment: moment });
    })
});

//get them user
router.get('/admin/addUser', function(req, res, next) {
    res.render('admin/addUser', { title: 'Admin' });
});
module.exports = router;