import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import toast, { Toaster } from 'react-hot-toast'

import Path from './Path'
import Modal from './Modal'

const SocialsContainer = styled.div`
    display: inline-flex;
    pointer-events: ${props => !props.ready && 'none'};

    .icon-wrapper {
        margin: 10px min(2vw, 20px);
        position: relative;
        display: flex;
        align-items: center;

        svg {
            transition: all 0.5s ease;
        }

        p {
            position: absolute;
            left: 50%;
            transform: translateX(-50%) translateY(40px); 
            pointer-events: none;
            transition: opacity 0.5s ease, transform 0.5s ease;
            opacity: 0;
            font-size: calc(.7rem + .25vw);
            user-select: none;
        }

        button.icon-arrow {
            width: 25px;
            height: 25px;
            padding: 0;
            border-radius: 99px;
            background: white;
            position: absolute;
            left: 50%;
            transform: translateX(-50%) scale(0);
            pointer-events: none;
            transition: transform 0.75s ease;

            img {
                width: 15px;
                height: 15px;
                transform: rotate(180deg);
                opacity: 0.5;
            }
        }

        :hover {
            & + button {
                transform: translateX(-50%) scale(1);
            }

            & + p {
                opacity: 1;
                transform: translateX(-50%) translateY(25px); 
            }
        }
    }
}
`

// TODO: fix permeneantly un-active icon when mouse leaves

export default function Socials(props) {
    const [onStatus, setOnStatus] = useState([false, false, false, false]) // the 'on' status of each icon
    const [hovStatus, setHovStatus] = useState([false, false, false, false])
    const [scale, setScale] = useState(0.08)
    const [showingResume, setShowingResume] = useState(false)

    const { ready } = props

    useEffect(() => {
        setScale(Math.min(window.innerWidth / 4000, .08))
        window.addEventListener('resize', () => {
            setScale(Math.min(window.innerWidth / 4000, .08))
        })
    }, [])

    function turnOn(idx) {
        let s = onStatus.slice()
        s[idx] = true
        setOnStatus(s)
    }

    function turnOff(idx) {
        let s = onStatus.slice()
        s[idx] = false
        setOnStatus(s)
    }

    function setHov(idx, bool) {
        bool ? turnOff(idx) : turnOn(idx)
        let h = hovStatus.slice()
        h[idx] = bool
        setHovStatus(h)
    }

    useEffect(() => {
        for (let i = 0; i < onStatus.length; i++) {
            let s = onStatus.slice(0)
            for (let j = 0; j <= i; j++) {
                s[j] = ready
            }
            setTimeout(() => setOnStatus(s), 200 * i)
        }
    }, [ready])

    const icons = {
        'GitHub': [
            <svg width={313 * scale} height={349 * scale} viewBox="0 0 313 349" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path on={onStatus[0]} style={{ transition: 'all .75s ease', transitionDelay: '.25s' }} d="M107 285.111C93.8319 289.82 64.2035 294.086 51.0354 273.476C34.5752 247.713 40.3363 244.388 14 234" />
                <Path on={onStatus[0]} d="M119.5 335C111.167 305.5 101.1 242.7 127.5 227.5C105.667 226.333 57.6 215 40 179C18 134 40.5 81.5 53 69.5C47.6667 58.5 40.2 31.8 53 13C61.5 13.1667 85.8 18.6 115 39C129.667 31 170.8 19.8 218 39C225.667 31.5 248.2 15.8 277 13C282.667 22.6667 290.6 47.5 277 69.5C289 84.1667 309.4 123.4 295 163C277 212.5 234 223 206 227.5C215.333 237 229.4 271.8 211 335" />
            </svg>,
            'https://github.com/benweberj'
        ],

        'LinkedIn': [
            <svg width={266 * scale} height={286 * scale} viewBox="0 0 266 286" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path on={onStatus[1]} d="M33 250V118" />
                <Path on={onStatus[1]} d="M115.5 181.992C122 159 150.5 126.5 181.5 122.5C222.19 117.25 235.5 147.492 235.5 181.992C235.5 209.592 235.5 234.994 235.5 254.994" />
                <Path on={onStatus[1]} d="M115 117V182.492V255.494" />
                <Path on={onStatus[1]} circle cx="33" cy="33" r="33" />
            </svg>,
            'https://www.linkedin.com/in/benjweber/'
        ],

        'Email': [
            <svg width={407 * scale} height={260 * scale} viewBox="0 0 407 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path on={onStatus[2]} d="M15 224.5V35.5C15 24.4543 23.9543 15.5 35 15.5H371.5C382.546 15.5 391.5 24.4543 391.5 35.5V224.5C391.5 235.546 382.546 244.5 371.5 244.5H35C23.9543 244.5 15 235.546 15 224.5Z" />
                <Path on={onStatus[2]} d="M33.5 32L195.113 159.036C202.512 164.851 212.964 164.722 220.216 158.726L373.5 32" />
            </svg>,
            'https://www.google.com'
        ],

        'Resume': [
            <svg width={281 * scale} height={268 * scale} viewBox="0 0 281 268" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path on={onStatus[3]} rect sq y="1" width="111" height="111" rx="20" />
                <Path on={onStatus[3]} styles={{ transitionDelay: '.1s' }} d="M18 251H264" />
                <Path on={onStatus[3]} styles={{ transitionDelay: '.2s' }} d="M18 173H264" />
                <Path on={onStatus[3]} styles={{ transitionDelay: '.3s' }} d="M161 95H264" />
                <Path on={onStatus[3]} styles={{ transitionDelay: '.4s' }} d="M161 17H264" />
            </svg>,
            'https://www.google.com'
        ]
    }

    function moveIcon(i, dir) {
        let svg = document.querySelector(`#social-${i} svg`)
        let btn = document.querySelector(`#social-${i} .icon-arrow`)

        svg.style.opacity = dir == 'up' ? 0 : 1
        btn.style.transform = `translateX(-50%) scale(${dir=='up' ? 1 : 0})`
    }

    function copyEmail() {
        navigator.clipboard.writeText('ben.weberj@gmail.com')
        toast('Email copied')
    }

    return (
        <SocialsContainer ready={ready}>
            <Toaster />
            {Object.keys(icons).map((name, i) => {
                const hov = hovStatus[i]

                return (
                    <div
                        className='icon-wrapper'
                        key={`social-${i}`}
                        id={`social-${i}`}
                        onMouseEnter={() => { moveIcon(i, 'up'); setHov(i, true) }}
                        onMouseLeave={() => { moveIcon(i); setHov(i, false) }}
                        onClick={() => name==='Resume' ? setShowingResume(true)
                            : name==='Email' ? copyEmail()
                            : window.open(icons[name][1], '_blank')}
                    >
                        {icons[name][0]}
                        <p>{name==='Email' ? 'ben.weberj@gmail.com' : name}</p>
                        <button className='icon-arrow'>
                            <img src='/img/back.png' />
                        </button>
                    </div>
                )
            })}

            <Modal ready={showingResume} onClose={() => setShowingResume(false)}>
                <img src='/img/resume.png' style={{ width: '100%' }} />
            </Modal>
        </SocialsContainer>
    )
}