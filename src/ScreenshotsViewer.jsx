import { useState } from 'react'
import styled from 'styled-components'

import Preview from './Preview'

const Screenshots = styled.div`
    width: 90vw;
    height: 80vh;
    padding: calc(1vw + 1vh);

    .screenshot-entry {
        display: flex;
        align-items: center;
        padding-bottom: calc(5vw + 5vh);
        transform: translateX(${props => props.ready ? 0 : -50}px);
        opacity: ${props => props.ready ? 1 : 0};
        transition: all 0.5s ease;


        &.viewing {
            flex-wrap: wrap;
            
            img {
                width: 100%;
                min-width: 100%;
            }
            
            p {
                font-size: 1.1rem;
                color: white;
            }
        }

        &:nth-child(odd) {
            flex-direction: row-reverse;
            transform: translateX(${props => props.ready ? 0 : 50}px);
        }

        &:last-child { padding-bottom: 6vw }

        &:nth-child(1) { transition: all 0.5s ease, transform 0.5s ease 0.2s, opacity 0.5s ease 0.2s }
        &:nth-child(2) { transition: all 0.5s ease, transform 0.5s ease 0.5s, opacity 0.5s ease 0.5s }
        &:nth-child(3) { transition: all 0.5s ease, transform 0.5s ease 0.8s, opacity 0.5s ease 0.8s }
        &:nth-child(4) { transition: all 0.5s ease, transform 0.5s ease 1.1s, opacity 0.5s ease 1.1s }
        &:nth-child(5) { transition: all 0.5s ease, transform 0.5s ease 1.4s, opacity 0.5s ease 1.4s }
        &:nth-child(6) { transition: all 0.5s ease, transform 0.5s ease 1.7s, opacity 0.5s ease 1.7s }
        &:nth-child(7) { transition: all 0.5s ease, transform 0.5s ease 2.0s, opacity 0.5s ease 2.0s }

        // &:not(.viewing) p { opacity: 0.75 }

        img {
            width: 40vw;
            min-width: 40vw;
            min-height: ${40*0.5}vw;
            border-radius: 8px;
            transition: all 0.25s ease;
            background: #5b9bea11;

            &:hover {
                box-shadow: 0 0 40px 5px #ffffff09, 0 0 40px 10px #5b9bea22;
                transform: scale(1.04);

                & + p {
                    color: white;
                }
            }
        }

        p {
            padding: 2vw;
            transition: all 0.5s ease;
        }

        @media screen and (max-width: 1000px) {
            flex-direction: column;
            align-items: auto;
            justify-content: center;

            &:nth-child(odd) { flex-direction: column }

            img {
                width: 70vw;
                min-width: 70vw;
                min-height: ${70*0.5}vw;
            }
        }

        @media screen and (max-width: 650px) {
            img {
                width: 100%;
                min-width: 100%;
                min-height: ${90*0.5}vw;
            }
        }
    }
`

function ScreenshotsViewer(props) {
    const [viewing, setViewing] = useState(null) // the one being displayed at full width
    const { screenshots, onClose, id } = props
    
    // const ready = !!screenshots
    const ready = !!screenshots
    const scr = ready ? screenshots : Array.from({length:5}, (_,i) => ({ id: `default-${i}`, name: '...', desc: 'Give me a second to load' }))

    return (
        <Preview ready={ready} onClose={onClose}>  
            <Screenshots ready={ready}>
                {scr.map(s => (
                    <div className={`screenshot-entry ${s.id===viewing && 'viewing'}`}>
                        <img
                            onClick={() => setViewing(viewing === s.id ? null : s.id)}
                            src={`/img/${id}-screenshots/${s.id}.png`}
                            alt={s.alt}
                        />
                        <p>{s.desc}</p>
                    </div>
                ))}
            </Screenshots>

        </Preview>
    )
}

export default ScreenshotsViewer