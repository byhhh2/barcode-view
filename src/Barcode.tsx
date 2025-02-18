import {useEffect, useRef, useState} from 'react'

import ReactBarcode from 'react-barcode'

interface BarcodeProps {
  code: string
  height: number
}

const START_CHARACTER_COUNT = 11
const DATE_CHARACTER_COUNT = 11
const CHECKSUM_CHARACTER_COUNT = 11
const STOP_CHARACTER_COUNT = 13

const getTotalBarCount = (code: string) => {
  return (
    START_CHARACTER_COUNT +
    DATE_CHARACTER_COUNT * code.length +
    CHECKSUM_CHARACTER_COUNT +
    STOP_CHARACTER_COUNT
  )
}

const Barcode = ({code, height}: BarcodeProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    if (!wrapperRef.current) {
      return
    }

    setWidth(wrapperRef.current.clientWidth)
  }, [])

  return (
    <div ref={wrapperRef} style={{width: '100%', height: '70px'}}>
      <ReactBarcode
        value={code}
        width={width / getTotalBarCount(code)}
        height={height}
        format="CODE128B"
        displayValue={false}
        margin={0}
      />
    </div>
  )
}

export default Barcode
