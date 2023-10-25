import { useState, useEffect } from 'react'

import { GlobalStyles } from './styles'
import Landing from './Landing'
import Work from './Work'
import Projects from './Projects'

export default function App() {
    const [page, setPage] = useState()
    const [ready, setReady] = useState(false)

    // useEffect(() => {
    //     setTimeout(() => { setReady(true); setPage('landing') }, 500)
    // }, [])

    useEffect(() => {
        setReady(true)
        setPage('landing')
    }, [])

    return (
        <>
            <GlobalStyles loaded={ready} landing={page=='landing'} /> 
            <Landing ready={page=='landing'} setPage={setPage} />
            <Projects ready={page=='projects'} setPage={setPage} />
            <Work ready={page=='work'} setPage={setPage}/>
        </>
    )
}