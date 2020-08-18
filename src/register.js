import { createAPI } from 'cube-ui'
import Vue from 'vue'
import BillList from 'components/bill-list/bill-list'
import BillBarSticky from 'components/bill-bar-sticky/bill-bar-sticky'
import Dish from 'components/dish/dish'
import Order from 'components/order/order'
import AddOrder from 'components/add-order/add-order'
import AdminOrder from 'components/admin-order/admin-order'

createAPI(Vue, BillList)
createAPI(Vue, BillBarSticky)
createAPI(Vue, Dish)
createAPI(Vue, Order)
createAPI(Vue, AddOrder)
createAPI(Vue, AdminOrder)
