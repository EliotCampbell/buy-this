import React from 'react'
import classes from './Specifications.module.css'
import Button from '@/components/UI/Button/Button'
import { useUserStore } from '@/store/mainStore/store'

const Specifications = ({ deleteSpecification, specifications }) => {
  const { role } = useUserStore((state) => ({ role: state.user.role }))
  return (
    <div>
      <table className={classes.specTable}>
        <tbody>
          {specifications.map((el) => (
            <tr key={el.id} className={classes.sT}>
              <td className={classes.sT}>{el.title}</td>
              <td className={classes.sT}>{el.description}</td>
              {role === 'ADMIN' && (
                <td>
                  <Button onClick={() => deleteSpecification(el.id)}>
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Specifications
