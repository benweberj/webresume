import { useState } from 'react'
import styled from 'styled-components'

import BackButton from './BackButton'
import ScreenshotsViewer from './ScreenshotsViewer'
import Preview from './Preview'
import GlassUI from './GlassUI'

const OmicContainer = styled.div`
    padding: 5vw;
    padding-top: calc(3vh + 3vw);
    overflow: ${props => !props.ready && 'hidden'};
    z-index: 5;
    transition: opacity 0.5s ease;
    opacity: ${props => props.ready ? 1 : 0};
    pointer-events: ${props => !props.ready && 'none'};
    user-select: ${props => !props.ready && 'none'}; 
    
    .header {
        display: flex;
        align-items: center;
        margin-bottom: 3vw;

        img {
            width: 60px;
            margin-right: calc(1vw + 1vh);
            transition: all 0.5s ease;
            transform: scale(${props => props.ready ? 1 : 0});
        }

        .job-title {
            h1 {
                padding: 0;
                transition: all 0.5s ease;
                opacity: ${props => props.ready ? 1 : 0};
                transform: translateX(${props => props.ready ? 0 : -30}px);
                padding-bottom: 0px;
                line-height: 1.1;
            }
    
            p {
                color: #5b9bea;
                padding-left: 5px;
                transition: all 0.5s ease 0.2s;
                opacity: ${props => props.ready ? 1 : 0};
                transform: translateX(${props => props.ready ? 0 : -10}px);
                font-size: 1.14rem;
            }
        }

    }

    .about {
        display: flex;

        @media (max-width: 700px) {
            flex-direction: column;
        }

        > p {
            > p {display: inline; color: white }

            cursor: default;
            padding: calc(2vw + 1vh);
            margin: 0vw 2vw 2vw 0;
            background: #5b9bea22;
            border-radius: 8px;
            color: #fffb;
            transition: all 0.5s ease;
            font-size: 1.1rem;
            line-height: 1.5;
            transform: translateX(${props => props.ready ? 0 : -30}px);
            opacity: ${props => props.ready ? 1 : 0};
            overflow: hidden;

            &:hover {
                &:after {
                    transform: scale(1.1);
                    opacity: 0.05;
                }
            }

            // background images for paragraph cards
            &:after {
                transition: all 0.5s ease;
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: cover;
                opacity: 0.1;    
                z-index: -1;
            }

            &:nth-child(1) {
                transition: all 0.5s ease 0.1s;
                &:after {
                    // ! Pick a better one and download it to public
                    background-image: url(https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpapercave.com%2Fwp%2FD6bjicD.jpg&f=1&nofb=1&ipt=334168764d0c39095c7dbb553cc6944b1caefe2845ab980632c0b5828abde966&ipo=images);
                }

            }
            &:nth-child(2) {
                transition: all 0.5s ease 0.2s;
                &:after {
                    // ! Pick a better one and download it to public
                    background-image: url(https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.unsplash.com%2Fphoto-1569748130764-3fed0c102c59%3Fixlib%3Drb-1.2.1%26q%3D80%26fm%3Djpg%26crop%3Dentropy%26cs%3Dtinysrgb%26w%3D1080%26fit%3Dmax%26ixid%3DeyJhcHBfaWQiOjEyMDd9&f=1&nofb=1&ipt=87f10e8490f30b3f1f0468409e2e96bcf5e12c8e17febf3436499f5fca506cbf&ipo=images);
                }
            }
        }

        // make text glow
        @keyframes glow {
            0% { text-shadow: 0 0 20px #fff1, 0 0 40px #5b9bea00, 0 0 60px #c190 }
            50% { text-shadow: 0 0 20px #fff8, 0 0 40px #5b9bea88, 0 0 60px #c198 }
            100% { text-shadow: 0 0 20px #fff1, 0 0 40px #5b9bea00, 0 0 60px #c190 }
        }

        .omic-website {
            transition: all 0.5s ease;
            cursor: pointer;
            animation: glow 2s ease infinite;
            position: relative;
            font-weight: bold;
            opacity: 0.8;

            &:after {
                transition: all 0.5s ease;
                position: absolute;
                content: '';
                background: white;
                height: 2px;
                width: 100%;
                top: 100%;
                left: 0;
                transform-origin: left;
                transform: scaleX(0);
                opacity: 0;
            }

            &:hover {
                opacity: 1;
                &:after {
                    transform: scaleX(1);
                    opacity: 1;
                }
            }
        }

        .os-link {
            color: #5b9bea;
            cursor: pointer;
            transition: opacity 0.25s ease;

            &:hover {
                opacity: 0.5;
            }
        }
    }

    // omic websites heading
    > h3 {
        margin-top: 3vh;
        margin-bottom: 1vh;
        font-size: 1.3rem;
        transition: all 0.5s ease 0.5s;
        transform: translateY(${props => props.ready ? 0 : -30}px);
        opacity: ${props => props.ready ? 1 : 0};
    }

    > .disclaimer {
        font-size: 0.9rem;
        font-style: italic;
        opacity: ${props => props.ready ? 0.4 : 0};
        transition: opacity 0.5s ease ${props => props.ready ? 0.75 : 0.5}s;
        margin-bottom: 3vh;   
    }

    .sites {
        display: flex;
        flex-direction: column;

        .site-entry {
            width: 100%;
            margin-bottom: 3vh;
            padding: calc(2vw + 1vh);
            border-radius: 8px;
            background: #5b9bea11;
            transition: all 0.5s ease;
            position: relative;
            overflow: hidden;

            img.star {
                width: 15px;
                height: 15px;
                margin-left: 7px;
                opacity: 0.5;
                transition: transform 0.5s ease, opacity 0.75s ease;
            }

            &:hover {
                img.bg {
                    transform: scale(2.1);
                    opacity: 0.1;
                }

                img.star {
                    transform: scale(1.07);
                    opacity: 1;
                }
            }

            p {
                font-size: 0.8rem;
                opacity: 0.8;
            }

            img.bg {
                transition: all 0.5s ease;
                position: absolute;
                height: 100%;
                bottom: 0;
                right: 0;
                transform: scale(2);
                z-index: -1;
                opacity: 0.01;
            }

            transform: translateX(${props => props.ready ? 0 : -30}px);
            opacity: ${props => props.ready ? 1 : 0};

            &:nth-child(1) {
                transition: all 0.5s ease 0.4s;
            }
            &:nth-child(2) {
                transition: all 0.5s ease .6s;
            }
            &:nth-child(3) {
                transition: all 0.5s ease .8s;
            }

            .btns {
                margin-top: 1vh;

                // view screenshots button
                button {
                    margin-right: 1vw;
                    background: transparent;
                    border: 1px solid #5b95;
                    color: #5b9;
                    padding: 7px 20px;
                    position: relative;                        

                    &:hover {
                        color: #0009 !important;
                        border: 1px solid #5b9;
                        background: #5b9;
                    }

                    // link to live site button
                    &:nth-child(2) {
                        border: 1px solid #5b9bea55;
                        color: #5b9bea;

                        &:hover {
                            border: 1px solid #5b9bea;
                            background: #5b9bea;
                        }
                    }

                    // expired SSL certificate
                    &.expired {
                        border: 1px solid #f3626255;
                        color: #f36262;

                        &:hover {
                            border: 1px solid #f36262;
                            background: #f36262;
                        }

                        &:after {
                            color: #f36262;
                            font-size: 0.7rem;
                            content: 'SSL certificate expired';
                            position: absolute;
                            top: calc(100% + 20px);
                            left: 0;
                            width: 100%;
                            opacity: 0;
                            transition: all 0.25s ease;
                        }

                        // make the expired disclaimer text visible
                        &:hover {
                            &:after {
                                opacity: 1;
                                top: calc(100% + 2px);
                            }
                        }
                    }
                }
            }

        }
    }
`

const sites = [
    {
        name:'os.omic.ai',
        id: 'os',
        link: 'https://www.devel.omic.ai',
        desc: 'A collaborative suite of genomics analysis tools powered by AI, served through a web app',
        img: 'img/ml.png',
        screenshots: [
            { name: 'OS Signin page', id: 'signin', desc: 'The landing page where you can sign in, create an account, or check out our efforts against Covid-19. On the right is a rotating gallery of GIFs showing off our platform.' },
            { name: 'OS Dashboard, version 1', id: 'dash1', desc: 'This is one version of our homepage, where you can manage your team, navigate to each part of the site, and receive basic activity notifications (right).' },
            { name: 'OS Dashboard, version 2', id: 'dash2', desc: 'This version of the homepage is much more informative and acts more as a biomedical dashboard, which was our aim. You can see the status of any running experiments, browse your team\'s pipelines, and receive chat and activity notifications.' },
            { name: 'Inlink python notebooks', id: 'notebooks', desc: 'Building an entire notebook editor is a bit of a large task, so instead I just used an iFrame linking to a Jupyter Notebook and applied my custom styling to the interface.' },
            { name: 'Gene selection (step in drug discovery)', id: 'gene', desc: 'In this step of drug discovery, you are provided a potential gene as well as genes with similar structures. You can view these genes in 3D and see properties such as protein-binding pockets and residues.' },
            { name: 'Risk stratification dashboard', id: 'risk', desc: 'A dashboard for one of our models, risk stratification. This dashboard is intended to be used by doctors looking for their most at-risk patients and patient cohorts.' },
            { name: 'Biomedical search page', id: 'search', desc: 'The search page for our AI search. It uses natural language processing to decipher the query and return related results, such as patents, charts, and affected patient cohorts.' },
            { name: 'Target selection (step in drug discovery)', id: 'targets', desc: 'In this step of drug discovery, we return drugs that we have screened that may target the necessary biological pathway or molecule. The pipeline returns a string representing the drug, and I used a library to display that molecule.' }
        ]
    },
    {
        name:'omic.ai',
        id: 'omic',
        link: 'https://www.omic.ai',
        desc: 'The informational site for Omic, showing users what the platform has to offer',
        img: 'img/omic-logo.png',
        screenshots: [
            { name: 'Omic.ai landing page', id: 'landing', desc: 'This the landing page for our informational website. The search bar here isn\'t functional, it autoloads a query then animates the answer appearing. This site was made in one night by me and the CTO.' },
            { name: 'Our platform', id: 'platform', desc: 'This was just an animated graphic that I placed at the top of the page showing off our platform. The dashboard had a parallax effect and soft glow behind it, giving it a futuristic feel.' },
            { name: 'Omic research publications', id: 'research', desc: 'A page showing publications by our company and their status.' },
        ]
    },
    {
        name:'c19.ai',
        id: 'c19',
        link: 'https://www.c19.ai',
        desc: 'An onboarding site for Omic OS, asking users of all disciplines to contribute to our open-source fight against Covid-19',
        img: 'img/c19.png',
        expired: true,
        screenshots: [
            { name: 'C19.ai landing page', id: 'landing', desc: 'The landing page for c19.ai. This site served as a call to action for everyone, no matter their skills or expertise. The banner cycled through representative images for doctors, biologists, coders, and everyday people.' },
            { name: 'Omic staff table', id: 'staff', desc: 'A table introducing our staff and what they do at Omic.' },
            // { name: 'Outreach to biology community', id: 'bio', desc: '...' },
        ]
    }
]

export default function Omic(props) {
    const { ready, setPage } = props
    const [showing, setShowing] = useState(null)
    const [showingGlass, setShowingGlass] = useState(false)

    return (
        <>
            <BackButton ready={ready && !showing} onClick={() => setPage('landing')} />
            <OmicContainer ready={ready} className='full abs'>
                <div className='header'>
                    <img src='img/omic-logo.png' alt='Omic logo' />
                    <div className='job-title'>
                        <h1>Omic MD</h1>
                        <p>Lead Web Developer</p>
                    </div>
                </div>

                <div className='about'>
                    <p>
                        From <span style={{color:'white'}}>2020 to 2021</span>, I worked as the Lead Web Developer for <b>Omic</b>,
                        a small, but powerful genomics analysis startup. Check them out <p className='omic-website' onClick={() => window.open('https://www.omic.ai/', '_blank')}>here</p>.
                    </p>
                    <p>
                        I built the UI for our web app from scratch and was able to proptotype and implement
                        new designs rapidly with the help of my custom <button className='inline' onClick={() => setShowingGlass(true)}>components library</button>
                    </p>
                </div>

                <h3>Sites I developed</h3>
                <p className='disclaimer'>*Omic's current UI is influenced by my work, however I am no longer developing for them and their webpages have changed</p>

                <div className='sites'>
                    {sites.map(site => (
                        <div className='site-entry'>
                            <h3>{site.name} {site.id === 'os' && <img src='img/star.png' className='star' alt='Star' />}</h3>
                            <p>{site.desc}</p>
                            <div className='btns'>
                                <button className='inline' onClick={() => setShowing(site.id)}>Screenshots</button>
                                <button className={`inline ${site.expired && 'expired'}`} onClick={() => window.open(site.link, '_blank')}>View the current site</button>
                            </div>
                            <img src={site.img} className='bg' alt={`${site.id} background icon`} />
                        </div>
                    ))}
                </div>
            </OmicContainer>

            <ScreenshotsViewer screenshots={showing && sites.find(s => s.id === showing).screenshots} id={showing} onClose={() => setShowing(null)} />
            
            <Preview ready={showingGlass} onClose={() => setShowingGlass(false)}>
                <GlassUI ready={showingGlass} />
            </Preview>
        </>
    )
}