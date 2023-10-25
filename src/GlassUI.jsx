import styled from 'styled-components'
import { CodeBlock } from 'react-code-blocks'

const GlassContainer = styled.div`
    width: 90vw;
    height: 80vh;

    > p {
        font-size: 1.3rem;
        line-height: 1.5;
        padding-bottom: calc(3vh + 1vw);
    }

    img#layout-example {
        max-width: 100%;
        border-radius: 8px;
        padding-bottom: calc(3vh + 1vw);
    }

    > span {
        background: none !important;

        code {
            padding: 2vw !important;
            padding-right: 4vw !important;
            border-radius: 10px;

            span.linenumber { min-width: 2rem !important }
        }
    }

    code { color: #fff9 }

    b code { color: white !important }

    h2 { margin-bottom: 2vh }

    ul {
        padding-bottom: calc(3vh + 1vw);

        li {
            margin-bottom: calc(1vw + 1vh);
            line-height: 1.5;
            margin-left: 3vw;
        }
    }
`

const $ = styled.code``

export default function GlassUI(props) {
    const { ready } = props

    return (
        <GlassContainer ready={ready}>
            <p style={{ marginTop: '3vh' }}>
                With Omic being a small startup in its early stages, the website changed constantly as new features were added and requirements from stakeholders became better known.
                Using my custom component library, getting a prototype for a page ready took no time at all.
            </p>

            <h2>You can make a simple layout like this: </h2>
            <img id='layout-example' src='/img/quick-layout.png' />

            <h2>With these 22 lines of code:</h2>

            <CodeBlock
                text={
`import { Div, Text, Button, Img } from './components/index'
<Div fs> // container that takes up the whole screen
    <Div glass center split px={10} bg='#0002'> // full width glassy header
        <Button intent='back' onClick={/* go back */} />
        <Div center hsep={'2vh'}> // centered flexbox with spacing vertical between children
            <Text bold={page=='home'} onClick={/* go to home */}>Home</Text>
            <Text bold={page=='about'} onClick={/* go to about */}>About</Text>
            <Text bold={page=='download'} onClick={/* go to download */}</Text>
        </Div>
        <Img src={/* path to image */} w={80} h={80} circle />
    </Div>
        <Div full center glass contain rel> // glass div that fills remaining space
            <Div abs h={'100%'} w={500} p={40} hidden={!sidebarOpen} vsep={30}> // absolutely positioned sidebar
                <Text h3>Sidebar</Text>
                <Div glass center>Item 1</Div>
                <Div glass center>Item 2</Div>
                <Div glass center>Item 3</Div>
            </Div>
            <Text center h1>Hello</Text> // centered heading
        </Div>
    </Div>
</Div>`
                }
                language='javascript'
                showLineNumbers={true}
            />

            <p style={{ marginTop: 'calc(3vh + 1vw)' }}>The magic lies in the extensive list of shorthand props that you can pass to my components to apply styling. I have created several, but here are the most useful:</p>
            <ul>
                <li><b><$>fs</$></b> is short for fullscreen and applies <$>{`{ width: 100vw; height: 100vh }`}</$></li>
                <li><b><$>full</$></b> makes the element fill its container <$>{`{ width: 100vw; height: 100vh }`}</$></li>
                <li><b><$>center</$></b> centers the content using flex <$>{`{ display: flex; align-items: center; justify-content: center }`}</$></li>
                <li><b><$>col</$></b> makes the element flex vertically <$>{`{ display: flex; flex-direction: column }`}</$></li>
                <li><b><$>glass</$></b> applies our signature styling -- a semi-transparent card that blurs the content behind it <$>{`{ border-radius: 8px; background: #5b9bea11; padding: 30px; backdrop-filter: blur(5px) }`}</$></li>
                <li><b><$>split</$></b> uses flex to space children out horizontally <$>{`{ display: flex; align-items: center; justify-content: space-between }`}</$></li>
                <li><b><$>bg</$>:</b> applies the css <$>{`{ background: x }`}</$></li>
                <li><b><$>hsep</$></b> defines the horizontal spacing between children <$>{`> *:not(:first-child):not(:last-child) { margin-left: x; margin-right: x }`}</$></li>
                <li><b><$>circle</$></b> gives the element max border-radius <$>{`{ border-radius: 9999px }`}</$></li>
                <li><b><$>contain</$></b> prevents children from extending past the parent <$>{`{ overflow: hidden }`}</$></li>
                <li><b><$>rel</$></b> makes the element positioned relatively (used when you want an absolutely positioned element to be based off this element) <$>{`{ position: relative }`}</$></li>
                <li><b><$>abs</$></b> positions the element absolutely <$>{`{ position: absolute }`}</$></li>
                <li><b><$>p</$> / <$>px</$> / <$>py</$> / <$>pl</$> / <$>pr</$> / <$>pt</$> / <$>pb</$></b> define the padding, horizontal padding, vertical padding, left padding, right padding, top padding, and bottom padding respectively</li>
                <li><b><$>m</$> / <$>mx</$> / <$>my</$> / <$>ml</$> / <$>mr</$> / <$>mt</$> / <$>mb</$></b> define the margin, and work the same as padding</li>
                <li><b><$>hidden</$></b> controls the elements visibility <$>{`{ display: none }`}</$></li>
                <li><b><$>intent</$></b> is specific to buttons and places an icon alongside, or in place of the button text. Supported intents are: <$>back</$>, <$>forward</$>, <$>down</$>, <$>up</$>, <$>success</$>, and <$>loading</$></li>
            </ul>
        </GlassContainer>
    )
}