import { ArrowLeftOutlined } from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Glass } from './NetworkInfo'

export interface BackButtonProps {
  href: string
}

const Container = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.2s;

  :hover {
    transform: scale(1.1);
`

const BackButton: React.FC<BackButtonProps> = ({ href }) => {
  const navigate = useNavigate()
  const handleClick = (): void => {
    navigate(href)
  }

  return (
    <Container as={Glass} onClick={handleClick}>
      <ArrowLeftOutlined />
    </Container>
  )
}

export default BackButton
