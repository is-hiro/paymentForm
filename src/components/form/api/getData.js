import axios from 'axios'
const sendRequest = axios.create({
  baseURL: 'https://app.tablecrm.com/api/v1/',
})

export const getData = async () => {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      const [payboxes, organizations, warehouses, price_types, contragents] = await Promise.all([
        sendRequest.get('/payboxes/', {params: {token}}),
        sendRequest.get('/organizations/', {params: {token}}),
        sendRequest.get('/warehouses/', {params: {token}}),
        sendRequest.get('/price_types/', {params: {token}}),
        sendRequest.get('/contragents/', {params: {token}})
      ])

      return {
        payboxes: payboxes.data.result,
        organizations: organizations.data.result,
        warehouses: warehouses.data.result,
        price_types: price_types.data.result,
        contragents: contragents.data.result
      }
    }

  } catch (err) {
    console.error(err)
  }
}
export const getProducts = async (params) => {
  try {
    console.log(params)
    const {warehouse, organization, priceType, name} = params
    const token = localStorage.getItem('token')
    if (token) {
      const res = await sendRequest.get('/webapp/', {
        params: {
          token,
          warehouse_id: warehouse,
          organization_id: organization,
          name,
          price_type_id: priceType
        }
      })
      return res.data.result
    }

  } catch (err) {
    console.error(err)
  }
}
