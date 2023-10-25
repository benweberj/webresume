import React, { useState } from 'react'
import styled from 'styled-components'

import Parallax from './Parallax'

export default function TwoFace(props) {
    const [real, setReal] = useState(false)
    const { ready } = props

    return (
        <Parallax fs>
            <TwoFaceContainer ready={ready} onClick={() => setReal(!real)}>
                <img width={200} className='real' src='/img/real.png' />
                <img width={200} className={`vec ${real && 'hide'}`} src='/img/vec-t.png' />
            </TwoFaceContainer>
        </Parallax>
    )
}

const TwoFaceContainer = styled.div`
    width: 200px;
    height: 200px;
    transition: transform 0.5s ease;
    transform: scale(${props => props.ready ? 1 : 0});
    user-select: none;
    z-index: 99999999;
    position: relative;
    
    img {
        width: 200px;
        height: 200px;
        border-radius: 999px;
        overflow: hidden;
        user-select: none;
        user-drag: none;
        transition: all .5s ease;
        
        &.vec {
            position: absolute;
            left: 0;
            background: #5b95;
        }

        &.vec.hide { opacity: 0 }
    }

    &:hover .vec { background: #5b99; }

`