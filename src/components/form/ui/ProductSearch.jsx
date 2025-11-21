import {useDispatch} from 'react-redux'
import {Button, Select, Spin} from 'antd'
import {addProduct} from '../../../redux/productSlice.js'
import {PlusOutlined} from '@ant-design/icons'

export const ProductSearch = ({products, isLoading, onSearch, selectedPriceType}) => {
  const dispatch = useDispatch()

  return (
      <Select
          showSearch
          allowClear
          placeholder="Введите название товара"
          optionFilterProp="label"
          onSearch={onSearch}
          style={{display: 'block'}}
          options={products?.map((p) => ({
            ...p,
            value: p.id,
            label: p.name,
          }))}
          optionRender={(option) => {
            const prices = option.data.prices || []

            const matchedPrice =
                prices.find((pr) => pr.id === selectedPriceType)?.price ??
                prices[0]?.price ??
                0

            return (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span style={{opacity: 0.7}}>{option.label}</span>

                  <Button
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()

                        dispatch(
                            addProduct({
                              id: option.data.id,
                              name: option.data.name,
                              price: matchedPrice,
                            })
                        )
                      }}
                      icon={<PlusOutlined/>}
                  />
                </div>
            )
          }}
          notFoundContent={
              isLoading && <Spin style={{marginLeft: '50%'}} size="small"/>
          }
      />
  )
}
