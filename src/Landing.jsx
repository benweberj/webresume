import styled from 'styled-components'

import ParticleMesh from './ParticleMesh'
import Socials from './Socials'
import TwoFace from './TwoFace'

const MyName = styled.div`
    user-select: none;
    font-size: 2rem;
    margin-top: 1vw;
    margin-bottom: 0.5vw;
    transition: transform 0.5s ease, opacity 0.5s ease;
    opacity: ${props => props.ready ? 1 : 0};
    transform: rotateX(${props => props.ready ? 0 : -90}deg) translateZ(40px);
    transition-delay: 0.25s;
`

const NavButtons = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: min(10vh);
    
    :nth-child(2) { transition: background 0.25s ease, transform 0.5s ease 0.1s }

    > button {
        margin: 5px;
        transform: scale(${props => props.ready ? 1 : 0});
    }
`

export default function Landing(props) {
    const { ready, setPage } = props

    return (
        <div className='abs full col center' style={{ transition: 'all 1s ease', opacity: ready ? 1 : 0 }}>
            <ParticleMesh disperse={!ready} />
            <TwoFace ready={ready} />
            <MyName ready={ready}>Ben Weber</MyName>
            <Socials ready={ready} />

            <NavButtons ready={ready}>
                <button onClick={() => setPage('work')}>Work Experience</button>
                <button onClick={() => setPage('projects')}>Projects</button>
            </NavButtons>
        </div>
    )
}