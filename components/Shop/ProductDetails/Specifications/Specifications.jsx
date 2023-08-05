import React, { useContext } from 'react'
import classes from './Specifications.module.css'
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../../index'

const Specifications = observer(({ deleteSpecification }) => {
  const { products, user } = useContext(Context)
  return (
    <div>
      <table className={classes.specTable}>
        <thead className={classes.sT}>
          <tr className={classes.sT}>
            <td className={classes.sT}>Title</td>
            <td className={classes.sT}>Description</td>
          </tr>
        </thead>
        <tbody>
          {products.specifications.map((el) => (
            <tr key={el.id} className={classes.sT}>
              <td className={classes.sT}>{el.title}</td>
              <td className={classes.sT}>{el.description}</td>
              {user.isAuth && (
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
})

export default Specifications
