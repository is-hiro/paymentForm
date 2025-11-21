import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalCount: 0,
  totalAmount: 0,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload

      const existing = state.items.find(item => item.id === product.id)

      if (existing) {
        existing.quantity += product.quantity || 1
      } else {
        state.items.push({
          ...product,
          quantity: product.quantity || 1,
        })
      }
      state.totalCount = state.items.reduce((sum, p) => sum + p.quantity, 0)
      state.totalAmount = state.items.reduce((sum, p) => sum + p.quantity * p.price, 0)
    },

    removeProduct: (state, action) => {
      const id = action.payload
      state.items = state.items.filter(p => p.id !== id)

      state.totalCount = state.items.reduce((sum, p) => sum + p.quantity, 0)
      state.totalAmount = state.items.reduce((sum, p) => sum + p.quantity * p.price, 0)
    },

    updateQuantity: (state, action) => {
      const {id, quantity} = action.payload
      const product = state.items.find(p => p.id === id)
      if (product) product.quantity = quantity

      state.totalCount = state.items.reduce((sum, p) => sum + p.quantity, 0)
      state.totalAmount = state.items.reduce((sum, p) => sum + p.quantity * p.price, 0)
    },

    updatePrice: (state, action) => {
      const {id, price} = action.payload
      const product = state.items.find(p => p.id === id)
      if (product) product.price = price

      state.totalAmount = state.items.reduce((sum, p) => sum + p.quantity * p.price, 0)
    },

    clearProducts: (state) => {
      state.items = []
      state.totalCount = 0
      state.totalAmount = 0
    },
  },
})

export const {
  addProduct,
  removeProduct,
  updateQuantity,
  updatePrice,
  clearProducts
} = productsSlice.actions

export default productsSlice.reducer
