import styled from 'styled-components'

const PreviewContainer = styled.div`
    transition: opacity 0.5s ease;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background: #000000f9;
    display: grid;
    place-items: center;
    opacity: ${props => props.ready ? 1 : 0};
    pointer-events: ${props => !props.ready && 'none'};
    user-select: ${props => !props.ready && 'none'};
    z-index: 99999;
    overflow-y: scroll;

    .content {
        position: relative;

        .close-btn {
            position: absolute;
            top: 0;
            right: 0;
            transform: translateY(calc(-100% - 5px));
            border: 1px solid #f36262;
            background: #f3626222;

            &:hover { background: #f36262 }
        }
    }
`

export default function Preview(props) {
    const { onClose, ready } = props

    return (
        <PreviewContainer ready={ready} onClick={e => !e.target.closest('.content') && onClose()}>
            <div className='content'>
                {props.children}
                <button onClick={onClose} className='close-btn'>X</button>
            </div>
        </PreviewContainer>
    )
}