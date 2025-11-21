import {createRoot} from 'react-dom/client'
import './global.css'
import 'antd/dist/reset.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Provider} from 'react-redux'
import {store} from './redux/store.js'
import {PaymentForm} from './components/form/ui/PaymentForm.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PaymentForm/>
      </Provider>
    </QueryClientProvider>
)
