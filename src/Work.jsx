import styled from 'styled-components'

import Omic from './Omic'

const WorkContainer = styled.div`
    transition: all 0.5s ease;
    pointer-events: ${props => !props.ready && 'none'};
    user-select: ${props => !props.ready && 'none'};
    opacity: ${props => props.ready ? 1 : 0};
    overflow-y: scroll;
`

export default function Work(props) {
    const { ready, setPage } = props

    return (
        <WorkContainer className='abs full' ready={ready}>
            <Omic ready={ready} setPage={setPage} />
        </WorkContainer>
    )
}