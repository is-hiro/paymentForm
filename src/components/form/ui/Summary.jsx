import {Row, Col} from 'antd'
import {useSelector} from 'react-redux'

export const Summary = () => {
  const {totalAmount, totalCount} = useSelector((state) => state.products)

  return (
      <Row gutter={16} style={{marginBottom: 16}}>
        <Col span={12}>
          <strong>Итого товаров:</strong> {totalCount}
        </Col>
        <Col span={12} style={{textAlign: 'right'}}>
          <strong>Сумма:</strong> {totalAmount} ₽
        </Col>
      </Row>
  )
}
