import { useState, useEffect } from 'react'

export default function useWindowWidth() {
    const [ width, setWidth ] = useState(window.innerWidth)
    useEffect(() => {
        let handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
    }, [width])
    return width
}