import styled from 'styled-components'

const ModalContainer = styled.div`
    transition: all 0.5s ease;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background: #000e;
    display: grid;
    place-items: center;
    opacity: ${props => props.ready ? 1 : 0};
    pointer-events: ${props => !props.ready && 'none'};
    user-select: ${props => !props.ready && 'none'};
    z-index: 99999;

    .window {
        width: 80vw;
        height: 90vh;
        display: flex;
        flex-direction: column;
        background: #fff1;
        border-radius: 8px;
        overflow: hidden;
        backdrop-filter: blur(10px);

        .header {
            background: #fff1;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
                padding: 0;
                padding-left: 2vh;
                font-weight: 400;
            }

            .close-btn {
                border-radius: 0;
                img {
                    width: 20px;
                    filter: invert(1);
                }
            }

        }
        .content {
            flex: 1;
            padding: 2vw;
            overflow-y: scroll;
        }
    }
`

export default function Modal(props) {
    const { onClose, ready, title } = props

    return (
        <ModalContainer ready={ready} className=''>
            <div className='window'>
                <div className='header'>
                    <h3 className='title'>{title}</h3>
                    <button className='close-btn' onClick={e => { e.stopPropagation();  onClose() } }>
                        <img src='img/back.png' />
                    </button>
                </div>
                <div className='content'>
                    {props.children}
                </div>
            </div>
        </ModalContainer>
    )

}