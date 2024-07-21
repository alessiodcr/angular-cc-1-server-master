const {Router} = require('express')
const  productController  = require('../controllers/products.controller')
const pagesController = require('../controllers/pages.controller')
const pendingController = require('../controllers/pending.controller')
const optionsController = require('../controllers/options.controller')
const copertoController = require('../controllers/coperto.controller')
const userController = require('../controllers/users.controller')
const suspendController = require('../controllers/suspend.controller')
const authController = require('../controllers/auth.controller')
const router = Router()


router.post('/login', authController.login)
router.post('/register', authController.register)

router.post('/suspend', suspendController.suspend)
router.post('/riabilita', suspendController.riabilita)

router.get('/users', userController.getUsers)
router.delete('/users', userController.deleteUser)

router.get('/coperto', copertoController.getCoperto)

router.get('/options', optionsController.getOptions)
router.post('/options', optionsController.postOptions)

router.delete('/pending', pendingController.reject)
router.post('/pending', pendingController.accept)
router.get('/pending', pendingController.getPendings)

router.post('/pages', pagesController.postPage)
router.delete('/pages', pagesController.deletePage)
router.get('/pages', pagesController.getPages)

router.get("/:id", productController.getProducts);
router.post('/:id', productController.postProducts)
router.delete('/:id', productController.deleteProducts)
router.put('/:id', productController.editProducts)






module.exports = router