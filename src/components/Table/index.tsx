import React from 'react'
import styled from 'styled-components'

export const TableTheme = styled.table`
  tr {

  }

  tr>th {
    text-align: left;
    padding: 10px;
  }

  tr>td {
    padding: 10px;
    border: 0px;
    border-bottom: 1px solid #ccc;
  }
`

const StyledTable = styled.table`
  width: 100%;
  font: 16px;
  border-collapse: collapse;

  td {
    border: 1px solid #ccc;
    padding: 5px 10px;
  }
  
  .autowidth td {
    white-space: nowrap;
  }
`

export interface TableProps {
  children: React.ReactNode
  as: React.ElementType | undefined
}

const Table: React.FC<TableProps> = ({ children, as }) => {
  return (
    <StyledTable as={as}>
      {children}
    </StyledTable>
  )
}

export default Table
