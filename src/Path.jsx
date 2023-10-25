import React, { useState, useEffect, useRef } from 'react'

// putting the theme in directly for now, but find out how to not do that in a bit
const theme = {
    primary: '#60b389',
    accent: '#97cfb3',
    base: '#555',
    complement: '#fff',

    red: '#f5877f', // DB5461
    purple: '#7678ED',
    blue: '#91C4F2',
    green: '#83E8BA',
    wine: '#912F40',
    brown: '#A49E8D',
    orange: '#ED9B40',

    green2: '#7FB685',
    green3: '#61C9A8',
    green4: '#97cfb3',

    light: 200,
    regular: 400,
    bold: 700,

    corners: 8,
    cornersSm: 4,
    padding: 30,
    paddingSm: 15,

}

export default function Path(props) {
    const [offset, setOffset] = useState({})
    const [len, setLen] = useState(1)
    const ref = useRef(null)
    const { circle = false, rect = false, on = true, hidden = false, sq = false, styles, weight, time = .5, delay = '0s', round, inverse } = props

    useEffect(() => {
        const l = ref?.current
        if (l) {
            setLen(l.getTotalLength())
            setOffset(l.getBBox())
        }
    }, [ref])

    const pathStyles = {
        strokeDasharray: len,
        strokeDashoffset: on ? 0 : len,
        stroke: inverse ? theme.base : theme.complement,
        strokeWidth: on ? (weight || 20) : 0,
        strokeLinecap: round && 'round',
        strokeLinejoin: round && 'round',
        style: {
            transition: `all ${time}s ease-in-out ${delay}`,
            ...styles,
        },
    }
    const rectStyles = {
        fill: on ? inverse ? theme.base : theme.complement : `${theme.accent}00`,
        opacity: on ? 1 : 0,
        strokeWidth: props.weight || 0,
        style: {
            transition: `all ${time + .5}s ease, opacity ${time}s ease`,
            transform: sq ? (!on ? 'rotate(90deg)' : undefined) : (on ? 'scaleY(1)' : 'scaleY(0)'),
            transformOrigin: 'bottom left',
            ...styles,
        },
    }
    const circleStyles = {
        fill: on ? inverse ? theme.base : theme.complement : `${theme.accent}00`,
        opacity: on ? 1 : 0,
        style: {
            transition: `all ${time + .5}s ease`,
            transform: on ? 'scale(1)' : ` scale(0) translate(${offset.width * 3}px, ${offset.height * 5}px)`,
            ...styles,
        },
    }


    if (circle) return <circle className={`${hidden && 'hidden'} ${props.className}`} ref={ref} {...circleStyles} {...props} />
    if (rect) return <rect className={`${hidden && 'hidden'} ${props.className}`} ref={ref} {...rectStyles} {...props} />

    return <path className={`${hidden && 'hidden'} ${props.className}`} ref={ref} {...pathStyles} {...props} />
}