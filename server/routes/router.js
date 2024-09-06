const {Router} = require('express')
const  productController  = require('../controllers/products.controller')
const pagesController = require('../controllers/pages.controller')
const pendingController = require('../controllers/pending.controller')
const optionsController = require('../controllers/options.controller')
const copertoController = require('../controllers/coperto.controller')
const userController = require('../controllers/users.controller')
const suspendController = require('../controllers/suspend.controller')
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/authMiddleware')
const haedersController = require('../controllers/headers.controller')
const switchController = require('../controllers/menuSwitch.controller')
const router = Router()


router.get('/isOn', switchController.isOn )
router.post('/switch', authMiddleware.requireSuperAuth, switchController.switch)

router.get('/headers', haedersController.getHeaders)
router.post('/headers/:id', authMiddleware.requireAuth, haedersController.postHeader)


router.post('/login', authController.login)
router.post('/register', authController.register)

router.post('/suspend', authMiddleware.requireSuperAuth, suspendController.suspend )
router.post('/riabilita',authMiddleware.requireSuperAuth, suspendController.riabilita)

router.get('/users' ,authMiddleware.requireSuperAuth, userController.getUsers)
router.delete('/users',authMiddleware.requireSuperAuth, userController.deleteUser)

router.get('/coperto', copertoController.getCoperto)
router.post('/coperto', authMiddleware.requireAuth, copertoController.postCoperto)

router.get('/options', optionsController.getOptions)
router.post('/options',authMiddleware.requireAuth, optionsController.postOptions)

router.delete('/pending',authMiddleware.requireSuperAuth, pendingController.reject)
router.post('/pending',authMiddleware.requireSuperAuth, pendingController.accept)
router.get('/pending',authMiddleware.requireSuperAuth, pendingController.getPendings)

router.post('/pages',authMiddleware.requireAuth, pagesController.postPage)
router.delete('/pages',authMiddleware.requireAuth, pagesController.deletePage)
router.get('/pages', pagesController.getPages)

router.get('/portate', productController.getPortate)
router.get("/:id", productController.getProducts);
router.post('/:id',authMiddleware.requireAuth, productController.postProducts)
router.delete('/:id',authMiddleware.requireAuth, productController.deleteProducts)
router.put('/:id',authMiddleware.requireAuth, productController.editProducts)







module.exports = router