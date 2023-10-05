import './globals.css'
import TopBar from '../components/UI/TopBar/TopBar'
import NavBar from '@/components/NavBar/NavBar'
import Footer from '../components/UI/Footer/Footer'

export const metadata = {
  title: 'BUY THIS!',
  description: 'BUY THIS! SHOP'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className={'App'}>
          <TopBar />
          <NavBar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
