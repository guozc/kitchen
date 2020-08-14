import {
    getDishesApi,
    getUserApi,
    getOrderByInviteApi,
    saveBillApi,
    getBillsByOpenidApi
} from './helpers'

const getDishes = getDishesApi()
const getUser = getUserApi()
const getOrderByInvite = getOrderByInviteApi()
const saveBill = saveBillApi()
const getBills = getBillsByOpenidApi()

export {
    getDishes,
    getUser,
    getOrderByInvite,
    saveBill,
    getBills
}
