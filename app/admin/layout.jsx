import Admin from '@/components/Admin/Admin/Admin'
import classes from './adminLayout.module.css'

export default function AdminLayout({ children }) {
  return (
    <div className={classes.adminLayout}>
      <Admin />
      {children}
    </div>
  )
}
