import {useDispatch, useSelector} from 'react-redux'
import {InputNumber, Button, List} from 'antd'
import {removeProduct, updateQuantity} from '../../../redux/productSlice.js'
import {DeleteOutlined} from '@ant-design/icons'

export const CartItems = () => {
  const data = useSelector((state) => state.products || [])
  const dispatch = useDispatch()

  if (data.items.length === 0) {
    return null
  }

  return (
      <List
          dataSource={data.items}
          renderItem={(item) => (
              <List.Item
                  actions={[
                    <InputNumber
                        min={1}
                        value={item.quantity}
                        onChange={(qty) =>
                            dispatch(updateQuantity({id: item.id, quantity: qty}))
                        }
                    />,
                    <Button danger onClick={() => dispatch(removeProduct(item.id))}>
                      <DeleteOutlined/>
                    </Button>,
                  ]}
              >
                <List.Item.Meta
                    title={item.name}
                    description={`Цена: ${item.price} ₽`}
                />
              </List.Item>
          )}
      />
  )
}
