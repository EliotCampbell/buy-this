import React from 'react'
import classes from './Specifications.module.css'

const Specifications = ({ specifications }) => {
  return (
    <div>
      <table className={classes.specTable}>
        <tbody>
          {specifications.map((el) => (
            <tr key={el.id} className={classes.sT}>
              <td className={classes.sT}>{el.title}</td>
              <td className={classes.sT}>{el.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Specifications
