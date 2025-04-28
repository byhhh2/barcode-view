import {useEffect, useState} from 'react'
import Barcode from './Barcode'
import './App.css'
import {QRCodeCanvas} from 'qrcode.react'

const Device = () => {
  const [query, setQuery] = useState<string | null>(null)
  const [width, setWidth] = useState<string>('320')
  const [mode, setMode] = useState<string>('qr') // 'qr' | 'barcode'

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setQuery(params.get('code'))
    setWidth(params.get('width') || '320')
    setMode(params.get('mode') || 'qr')
  }, [])

  return mode === 'barcode' ? (
    <div>
      <h3>width: {width}</h3>
      <div
        style={{
          boxSizing: 'border-box',
          width: `${width}px`,
          height: '110px',
          padding: '20px',
          border: '1px solid black',
        }}
      >
        {query && <Barcode code={query} height={70} />}
      </div>
      code: {query}
    </div>
  ) : (
    <div>
      <h3>width: {width}</h3>
      <div
        style={{
          boxSizing: 'border-box',
          padding: '20px',
          border: '1px solid black',
          display: 'inline-block',
        }}
      >
        {query && <QRCodeCanvas value={query} size={+width} />}
      </div>
      <p>code: {query}</p>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Device />
    </div>
  )
}

export default App
