import './globals.css'
import { Inter } from 'next/font/google'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Task Management',
  description: 'A comprehensive task management application',
  keywords: 'task, management, app, nextjs, firebase',
  author: 'Your Name',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className='container mt-3'>{children}</div>
      </body>
    </html>
  )
}
