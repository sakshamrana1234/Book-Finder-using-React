import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { Provider } from 'react-redux'
import BookStore from './store/BookSlice.js'
import Home from './routes/Home.jsx'
import Details from './routes/Details.jsx'



const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
    {path:"/",element:<Home/>},
    {path:"/Details",element:<Details/>},
  ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={BookStore}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
