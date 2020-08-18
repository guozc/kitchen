import {
    getDishesApi,
    getUserApi,
    getOrderByInviteApi,
    saveBillApi,
    getBillsByOpenidApi,
    getAllOrdersApi,
    changeOrderStatusApi,
    addOrderApi,
    getOrderByIdApi,
    confirmOrderApi,
    getWxConfigApi
} from './helpers'

const getDishes = getDishesApi()
const getUser = getUserApi()
const getOrderByInvite = getOrderByInviteApi()
const saveBill = saveBillApi()
const getBills = getBillsByOpenidApi()
const adminOpenid = 'oVpHFuF0lL4oaAvTugOspvJWdNS0'
const getAllOrders = getAllOrdersApi()
const changeOrderStatus = changeOrderStatusApi()
const addOrder = addOrderApi()
const getOrderById = getOrderByIdApi()
const confirmOrder = confirmOrderApi()
const getWxConfig = getWxConfigApi()

export {
    getDishes,
    getUser,
    getOrderByInvite,
    saveBill,
    getBills,
    adminOpenid,
    getAllOrders,
    changeOrderStatus,
    addOrder,
    getOrderById,
    confirmOrder,
    getWxConfig
}
