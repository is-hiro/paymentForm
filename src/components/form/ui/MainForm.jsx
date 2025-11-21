import {Form, Select, Divider, Button, Spin, Row, Col} from 'antd'
import {Summary} from './Summary.jsx'
import {CartItems} from './CartItems.jsx'
import {ProductSearch} from './ProductSearch.jsx'
export const MainForm = ({
                           form,
                           data,
                           products,
                           isLoading,
                           onSearch,
                           onSubmit
                         }) => (
    <Form form={form} layout="vertical" onFinish={onSubmit}>

      <Form.Item
          label="Контрагент (поиск по телефону)"
          name="counterpartyPhone"
      >
        <Select
            showSearch
            allowClear
            placeholder="Введите номер телефона"
            optionFilterProp="label"
            options={data?.contragents?.map((c) => ({
              value: c.id,
              label: `${c.name}`,
              phone: c.phone,
              name: c.name
            }))}
            optionRender={(option) => (
                <div style={{display: 'flex', flexDirection: 'column', padding: '4px 0'}}>
                  <span style={{fontWeight: 600}}>{option.data.phone}</span>
                  <span style={{opacity: 0.7}}>{option.data.name}</span>
                </div>
            )}
        />
      </Form.Item>

      <Form.Item
          label="Счёт поступления"
          name="incomeAccount"
      >
        <Select
            placeholder="Выберите..."
            options={data?.payboxes?.map((c) => ({
              value: c.id,
              label: `${c.name}`
            }))}
        />
      </Form.Item>

      <Form.Item
          label="Склад отгрузки"
          name="warehouse"
      >
        <Select
            placeholder="Выберите..."
            options={data?.warehouses?.map((c) => ({
              value: c.id,
              label: `${c.name}`
            }))}
        />
      </Form.Item>

      <Form.Item
          label="Организация"
          name="organization"
      >
        <Select
            placeholder="Выберите..."
            options={data?.organizations?.map((c) => ({
              value: c.id,
              label: `${c.short_name}`
            }))}
        />
      </Form.Item>

      <Form.Item
          label="Тип цены"
          name="priceType"
      >
        <Select
            placeholder="Выберите..."
            options={data?.price_types?.map((c) => ({
              value: c.id,
              label: `${c.name}`
            }))}
        />
      </Form.Item>

      <Form.Item label={'Поиск товара'}>
        <ProductSearch
            products={products}
            isLoading={isLoading}
            onSearch={onSearch}
            selectedPriceType={form.getFieldValue('priceType')}
        />
      </Form.Item>

      <Divider/>
      <CartItems/>
      <Summary/>
      <Row gutter={12}>
        <Col span={12}>
          <Button type="primary" block htmlType="submit">
            Создать продажу
          </Button>
        </Col>
        <Col span={12}>
          <Button type="primary" block htmlType="submit">
            Создать и провести
          </Button>
        </Col>
      </Row>
    </Form>
)
