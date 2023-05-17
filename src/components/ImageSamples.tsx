import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  width: 100px;
  margin: 10px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
`

const getFolder = (): string | null => {
  const url = window.location.href.split('/').pop()

  if (url?.includes('cifar') === true) {
    return 'cifar'
  }

  if (url?.includes('mnist') === true) {
    return 'mnist'
  }

  if (url?.includes('camelyon') === true) {
    return 'camelyon'
  }

  return null
}

const ImageSamples: React.FC = () => {
  const folder = getFolder()

  if (folder === null) {
    return null
  }

  const urls = new Array(10).fill(0).map((_, i) => {
    return `/${folder}/iimage${i}.png`
  })

  const unimportantUrls = new Array(10).fill(0).map((_, i) => {
    return `/${folder}/uimage${i}.png`
  })

  return (
    <Column>
      <h2>Important</h2>
      <Row>
        {urls.map((url) => (
          <Image key={url} src={url} />
        ))}
      </Row>

      <h2>Unimportant</h2>
      <Row>
        {unimportantUrls.map((url) => (
          <Image key={url} src={url} />
        ))}
      </Row>
    </Column>
  )
}

export default ImageSamples
