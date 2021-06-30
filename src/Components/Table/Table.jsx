import React from 'react'

const Table = ({ titleRow, rows, theme }) => {
  const isStriped = theme === 'striped'

  return (
    <table className={`
      table
      ${isStriped ? 'is-striped' : ''}
    `}>
      {
        isStriped && (
          <thead>
            <tr>
              {
                titleRow.map((column, i) => (
                  <th key={i}>{column}</th>
                ))
              }
            </tr>
          </thead>
        )
      }
      <tbody>
        {
          rows.map((row, i) => (
            <tr key={i}>{row}</tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default Table
