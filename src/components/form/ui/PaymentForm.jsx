import {Card, Divider, Button, Row, Col, Form} from 'antd'
import {useState, useEffect} from 'react'
import {useQuery} from '@tanstack/react-query'
import {TokenForm} from './TokenForm.jsx'
import {MainForm} from './MainForm.jsx'
import {getData, getProducts} from '../api/getData.js'
import {toast, Toaster} from 'react-hot-toast'
import {useSelector} from 'react-redux'

export const PaymentForm = () => {
  const [form] = Form.useForm()
  const [currentToken, setCurrentToken] = useState({
    value: localStorage.getItem('token') || '',
    localValue: localStorage.getItem('token') || '',
  })
  const {totalCount} = useSelector((state) => state.products)

  const [searchProductQuery, setSearchProductQuery] = useState('')

  const {data} = useQuery({
    queryFn: getData,
    queryKey: ['data'],
    enabled: !!currentToken.value,
  })

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () =>
        await getProducts({
          ...form.getFieldsValue(),
          name: searchProductQuery,
        }),
    queryKey: ['products', searchProductQuery],
    enabled: false,
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchProductQuery) refetch()
    }, 500)
    return () => clearTimeout(timeout)
  }, [searchProductQuery])

  const saveToken = () => {
    setCurrentToken((prev) => ({...prev, value: prev.localValue}))
    localStorage.setItem('token', currentToken.localValue)
  }

  const onSubmit = () => {
    if(totalCount > 0){
      toast.success('Продажа создана успешно')
    }else{
      toast.error('Добавьте товар для продажи')
    }
  }

  return (
      <>
        <Toaster/>
        <Card style={{minWidth: 400, maxWidth: 400}}>
          <TokenForm
              token={currentToken.localValue}
              onChange={(e) =>
                  setCurrentToken((prev) => ({...prev, localValue: e.target.value}))
              }
              onSave={saveToken}
          />

          <Divider/>

          {currentToken.value && (
              <>
                <MainForm
                    form={form}
                    data={data}
                    products={products}
                    isLoading={isLoading}
                    onSearch={setSearchProductQuery}
                    onSubmit={onSubmit}
                />
              </>
          )}
        </Card>
      </>
  )
}
