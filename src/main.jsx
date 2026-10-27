import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { CartProvider } from './context/CartContext.jsx'
import { LangProvider } from './context/LangContext.jsx'
import RootLayout, { PageLoader } from './layouts/RootLayout.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import NotFound from './pages/NotFound.jsx'
import './index.css'

const loaders = {
  home: () => import('./pages/Home.jsx'),
  collection: () => import('./pages/Collection.jsx'),
  product: () => import('./pages/ProductDetail.jsx'),
  about: () => import('./pages/About.jsx'),
  philosophy: () => import('./pages/Philosophy.jsx'),
  contact: () => import('./pages/Contact.jsx'),
  cart: () => import('./pages/Cart.jsx'),
}
const pages = Object.fromEntries(Object.entries(loaders).map(([k, load]) => [k, lazy(load)]))

// Muat semua halaman di latar setelah situs siap, supaya perpindahan halaman tidak menampilkan layar "memuat".
window.addEventListener('load', () => setTimeout(() => Object.values(loaders).forEach((load) => load()), 1500))

const page = (Page) => (
  <Suspense fallback={<PageLoader />}>
    <Page />
  </Suspense>
)

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: page(pages.home) },
          { path: 'koleksi', element: page(pages.collection) },
          { path: 'koleksi/:slug', element: page(pages.product) },
          { path: 'tentang-kami', element: page(pages.about) },
          { path: 'filosofi-batik', element: page(pages.philosophy) },
          { path: 'kontak', element: page(pages.contact) },
          { path: 'keranjang', element: page(pages.cart) },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
], { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </LangProvider>
    </MotionConfig>
  </React.StrictMode>
)
