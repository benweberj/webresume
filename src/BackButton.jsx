import styled from 'styled-components'

const BackButtonContainer = styled.button`
    position: ${props => !props.free && 'fixed'};
    top: ${props => !props.free && '10px'};
    right: ${props => !props.free && '10px'};
    padding: 10px 50px;
    transform: scale(${props => props.ready ? 1 : 0});
    z-index: 9999;
    backdrop-filter: blur(5px);

    img {
        width: 20px;
        filter: invert(1);
    }
`

export default function BackButton(props) {
    const { onClick, ready, free=false } = props
    // free means that its just a regular button and not positioned absolutely

    return (
        <BackButtonContainer onClick={e => { e.stopPropagation(); onClick() }} ready={ready}>
            <img src='img/back.png' />
        </BackButtonContainer>
    )
}