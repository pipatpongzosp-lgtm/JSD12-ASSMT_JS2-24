import React from 'react'
import TableData from './TableData'

function AdminButton() {
  const db = document.createElement('button')
  const button = db;
  return (
    <div>
      <button onClick={<TableData/>}>
        User Home Section
      </button>
    </div>
  )
}

export default AdminButton
