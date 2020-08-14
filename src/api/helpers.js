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
        openid: 'oVpHFuDbjuRO5S-eELZQ8WAiIlho',
        name: 'JUU1JThEJUI3JUU2JUFGJTlCJUU4JTgyJTg5JUU2JTlEJUJF',
        avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/P3ZXIDAiboXCtuicupO41yJs3zBib8cqAUjrNB2Fea0CGTKYbbDqzCCPUjQ8ChFBZMO6aocey8FRkCgqg6Pab6a0Q/132'
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

export function getUserApi() {
    return function() {
        return fakerUser[2]
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
