import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: white;
        font-family: Urbanist;
        outline: none;
        border: none;
    }

    html, body, #root { height: 100% }

    body { background: black }

    #root {
        overflow: hidden;
        position: relative;

        &:after {
            transition: opacity 0.5s ease;
            position: absolute;
            content:'';
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            z-index: -1;
            background: radial-gradient(#15312b, #000);
            opacity: ${props => props.landing ? 0.8 : props.loaded ? 0.5 : 0};
        }
    }

    button {
        background: #fff2;
        border-radius: 99px;
        padding: 10px 30px;
        transition: all 0.25s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        cursor: pointer;

        &:hover { background: #fff4 }

        &.inline {
            display: inline;
            padding: 5px 10px;
            font-size: 80%;
        }
    }

    p { color: #fff8 }

    h1 {
        padding-bottom: 3vh;
        font-size: 2.5rem;
    }

    h2 {  }

    h3 { }

    code {
        font-family: monospace;
        background: #fff1;
        padding: 5px;
        border-radius: 4px;
        line-height: 1.75rem;
        
        * { font-family: monospace !important }
    }

    // wordle preview animation
    .wordle-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 3px;
  
        .box {
            width: 12px;
            height: 12px;
            border-radius: 2px;
            transition: all .25s ease;
    
            &.unchanging {
                background: #000a;
                font-size: 12px;
                color: #fff5;
           }
        }
    }

    .word-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 10px;
        background: #fff1;
        border-radius: 5px;
        margin-top: 5px;

        &.just-words {
            margin: 0;
            padding: 0;
            background: transparent;
        }

        .word-option {
           borderRadius: 999;
           background: #fff2;
           margin: 2px;
           padding: 5px 15px;
           color: white;
           font-size: .9rem;
           border-radius: 99px;
           transition: all 0.25s ease;

           &.common { border: 2px solid #5b9 }

           &.wrdl {
              background: #6aaa64;
              font-weight: bold;
              cursor: pointer;

              &:hover { background: #c9b458 }
           }

           &.view-all {
              background: white;
              color: black;
              cursor: pointer;
           }
        }
     }

    // -----------------------------------------------------------------

    .full {
        width: 100%;
        height: 100%;
    }

    .abs {
        position: absolute;
        top: 0;
        left: 0;
    }

    .flex {
        display: flex;
        flex-wrap: wrap;
    }

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .col {
        display: flex;
        flex-direction: column;
    }

    .glass {
        padding: 2vw;
        background: #5b9bea11;
        border-radius: 8px;
    }

    .debug {
        border: 1px solid white;

        * {
            border: 1px dashed gray;
        }
    }
`

export { GlobalStyles }