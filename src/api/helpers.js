import axios from 'axios'

const RES_OK = 0
const imagePrefix = '//h5.whalesgeek.net/dishes/'

const fakerUser = [
    {
        openid: 'oVpHFuJyOmQB3OHKZmOk99m5RPtY',
        name: 'JUU1JTk1JUE2JUU1JTk1JUE2JUU1JTk1JUE2JUU1JTk1JUE2JUU1JTk1JUE2JUU1JTk1JUE2',
        avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJQkicrx1UgMzsFGncHIhEFAm5Hubdy0romY4gyMxibTicufyfjjXW5YJ5ha88AW6ibEjK1QRksRdCjrg/132'
    },
    {
        openid: 'oVpHFuMyArc7YJO1Hgq-PjgJYBEM',
        name: 'JUU0JUI4JUFCJUU0JUI4JUFC',
        avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIBnVSbcokEOwX7jo1wCcGlAw6281iaQHvm3BPxgQbu5Izmr8fPviadUIZm9HGRadFI0J8XfkBiaIZEQ/132'
    },
    {
        openid: 'oVpHFuF0lL4oaAvTugOspvJWdNS0',
        name: 'JUU1JThEJUI3JUU2JUFGJTlCJUU4JTgyJTg5JUU2JTlEJUJF',
        avatar: 'http://h5.whalesgeek.net/wechat_image/mmopen/vi_32/Q0j4TwGTfTI5snx6fqLSTLTBLAwt8o46hswOuv7HxLicOkxLdg64lqXM01OdX6oafjE0GmrcHfTSNRhdBpekSKA/132'
    },
    {
        openid: 'oVpHFuK8bJpVvaI8WuniciZNC_vQ',
        name: 'JUU4JUEzJTk0JUU4JUEzJTk0JUU4JUEzJTk0eXQgICAlRjAlOUYlOEUlODg',
        avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epKQRu38KaYHyZz1ubWvllIzxuFHnuI5ORRKspxH6J4ic55EPUZWiaV4cz9BS9lEYWAYOtaqMEQ9zaw/132'
    },
    {
        openid: 'oVpHFuPj4mB-YCgHDjSwelGu2scg',
        name: 'JUU1JUI5JUI0JUU1JUI5JUI0JUU2JTlDJTg5JUU0JUJEJTk5',
        avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/pIvEJIUsvHJDbUdYiatiaWTN65mJV1BaPQFrA9aBJoUeNJgajeLhUScM5qbIxrEbvtOeQiaGTD0ia0TwyZibyVfaKuQ/132'
    },
    {
        openid: 'oVpHFuK2da1774KL0lNICNfMq7LM',
        name: 'JUU0JUJEJTkxJUU4JUE3JTgxJUU3JUFDJTkxJUU5JUEyJTlD',
        avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLViaLrcRrW4LhFfVIt6UxUe4NCASkIUWDAaw7VSGcvP53phoFQ7e0posbT11NzFO9U5IcnfleYibZg/132'
    }
]

const getCookie = (cName) => {
    if (document.cookie.length > 0) {
      let cStart = document.cookie.indexOf(cName + '=')
      if (cStart !== -1) {
        cStart = cStart + cName.length + 1
        let cEnd = document.cookie.indexOf(';', cStart)
        if (cEnd === -1) cEnd = document.cookie.length
        return unescape(document.cookie.substring(cStart, cEnd))
        }
      }
    return ''
}

const isDebug = false
export function getUserApi() {
    return function() {
        if (isDebug) {
            return fakerUser[2]
        } else {
            const openid = getCookie('whale_openid_new')
            const cookieData = {}
            if (!openid) {
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5bda125790f46602&redirect_uri=https://api.whalesgeek.net/get_wx_user_info_new&response_type=code&scope=snsapi_userinfo&state=' + window.location.href + '#wechat_redirect'
            } else {
                cookieData.country = getCookie('whale_country_new')
                cookieData.headimgurl = getCookie('whale_headimgurl_new')
                cookieData.language = getCookie('whale_language_new')
                cookieData.name = getCookie('whale_nickname_new')
                cookieData.openid = getCookie('whale_openid_new')
                cookieData.province = getCookie('whale_province_new')
                cookieData.sex = getCookie('whale_sex_new')
                cookieData.avatar = window.location.href.split('/').slice(0, 3).join('/') + '/' + 'wechat_image' + '/' + getCookie('whale_headimgurl_new').split('/').slice(3).join('/')
                return cookieData
            }
        }
    }
}

export function getDishesApi () {
    return async function() {
        const res = await axios.post('//api.whalesgeek.net/kitchen/get_dishes')
        const { code, data } = res.data
        if (code === RES_OK) {
            const dishes = data
            dishes.forEach((dish) => {
                dish.imageUrl = imagePrefix + dish.pic
                dish.selected = false
            })
            const ret = []
            const dishLabels = ['凉菜', '热菜', '靓汤', '主食', '小吃']
            dishLabels.forEach((dishLabel, index) => {
                const dishT = {}
                dishT.name = dishLabel
                dishT.dtype = index + 1
                dishT.dishes = dishes.filter((dish) => {
                    return dish.dtype === dishT.dtype
                })
                ret.push(dishT)
            })
            return ret
        }
    }
}

export function getOrderByInviteApi() {
    return async function(param = {}) {
        const res = await axios.post('//api.whalesgeek.net/kitchen/get_order_by_invite', param)
        const { code, data, msg } = res.data
        if (code === RES_OK) {
            if (data.id) {
                return data
            } else {
                return msg
            }
        }
    }
}

export function saveBillApi() {
    return async function(param = {}) {
        const res = await axios.post('//api.whalesgeek.net/kitchen/save_bill', param)
        const { code, msg } = res.data
        if (code === RES_OK) {
            return msg
        }
    }
}

export function getBillsByOpenidApi() {
    return async function(param = {}) {
        const res = await axios.post('//api.whalesgeek.net/kitchen/get_bills_by_openid', param)
        const { code, data } = res.data
        if (code === RES_OK) {
            data.forEach((order) => {
                order.dishes.forEach((dish) => {
                    dish.imageUrl = imagePrefix + dish.pic
                })
                order.bills.forEach((bill) => {
                    bill.imageUrl = imagePrefix + bill.pic
                })
            })

            return data
        }
    }
}

export function getAllOrdersApi() {
    return async function(param = {}) {
        const res = await axios.post('//api.whalesgeek.net/kitchen/get_orders', param)
        const { code, data } = res.data
        if (code === RES_OK) {
            return data
        }
    }
}

export function changeOrderStatusApi() {
    return async function(param = {}) {
        const res = await axios.post('//api.whalesgeek.net/kitchen/change_order_status', param)
        const { code, data } = res.data
        if (code === RES_OK) {
            return data
        }
    }
}

export function addOrderApi() {
    return async function(param = {}) {
        const res = await axios.post('//api.whalesgeek.net/kitchen/add_order', param)
        const { code, data } = res.data
        if (code === RES_OK) {
            return data
        }
    }
}

export function confirmOrderApi() {
    return async function(param = {}) {
        const res = await axios.post('//api.whalesgeek.net/kitchen/confirm_order', param)
        const { code, data } = res.data
        if (code === RES_OK) {
            return data
        }
    }
}

export function getOrderByIdApi() {
    return async function(param = {}) {
        const res = await axios.post('//api.whalesgeek.net/kitchen/get_order_by_id', param)
        const { code, data } = res.data
        if (code === RES_OK) {
            if (data.dishes) {
                data.dishes.forEach((dish) => {
                    dish.imageUrl = imagePrefix + dish.pic
                })
            } else {
                data.dishes = []
            }
            data.bills.forEach((bill) => {
                bill.imageUrl = imagePrefix + bill.pic
            })
            return data
        }
    }
}

const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params,
        transformRequest: [function (data) {
        let ret = ''
        for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
        }],
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export function getWxConfigApi() {
    return async function(param = {}) {
        const res = await postRequest('//api.whalesgeek.net/get_wx_sign', {
            url: location.href.split('#')[0]
        })
        return res.data
    }
}
