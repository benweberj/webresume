import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import Modal from './Modal'
import { WORD_LIST, commonWords } from './words'

const colors = { right: '#618654', wrong: '#616466', maybe: '#9f9151', empty: '#222' }
const modes = Object.keys(colors)

export default function WordleSolver(props) {
   const [possibleWords, setPossibleWords] = useState([])
   const [stagedChar, setStagedChar] = useState(null)
   const [viewingAllWords, setViewingAllWords] = useState(false)
   const goingBack = useRef(false)

   const { ready } = props

   useEffect(() => {
      clearBoard()
   }, [])

   const wordLimit = 10
   const limitedWords = possibleWords.slice(0, wordLimit)

   function getLetters() {
      let i = 0
      const letters = []
      while (i < 25) {
         const input = getInput(i)
         const cell = getCell(i)
         
         if (!input.value || input.value.length != 1) break
         const classes = cell.className.split(' ')

         let status = 'empty'

         if (classes.includes('right')) { status = 'right' }  
         else if (classes.includes('maybe')) { status = 'maybe' }
         else if (classes.includes('wrong')) { status = 'wrong' }

         if (status === 'empty') break

         letters.push([input.value.toLowerCase(), status])
         i++
      }
      return letters
   }

   // ! Fix logic -- sometimes a letter can be marked missing but suggested words contain that letter
   function evaluate() {
      const letters = getLetters()
      const states = {}

      // determine the indices that each guessed letter can appear
      letters.forEach(([letter, status], i) => {
         const idx = i % 5
         const indices = states[letter]
         
         if (typeof indices === 'object') { // we have information about this characters position
            if (status === 'right') {
               if (indices.length === 1 && typeof indices[0] !== 'object' && indices[0] != idx) {
                     states[letter] = [[indices[0], idx]]
               } else {
                  states[letter] = [idx]
               }
            }
            if (status === 'maybe' && indices.length > 1) {
               states[letter] = indices.filter(x => x != idx)
            }
         } else {
            if (status === 'wrong') states[letter] = []
            else if (status === 'right') states[letter] = [idx]
            else if (status === 'maybe') states[letter] = [0,1,2,3,4].filter(x => x != idx)
         }
      })

      const rights = {}
      const maybes = []
      for (let i = 0; i < 25; i++) {
         const cell = getCell(i)
         const idx = i % 5
         if (cell.className.includes('right')) {
            rights[idx] = getInput(i).value.toLowerCase()
         } else if (cell.className.includes('maybe')) {
            maybes.push(getInput(i).value.toLowerCase())
         }
      }
      
      Object.keys(states).forEach(letter => {
         if (states[letter].length > 1) {
            Object.keys(rights).forEach(i => {
               i = parseInt(i)
               if (states[letter].includes(i)) {
                  states[letter] = states[letter].filter(x => x != i)
               }
            })
         }
      })

      const spotsFilter = word => {
         for (let i = 0; i < 5; i++) {
            const curChar = word[i]
            if (Object.keys(rights).includes(`${i}`) && rights[`${i}`] !== curChar) return false
            let charState = states[curChar]
            if (charState) {
               if (charState.length===0) return false
               if (charState.length===1) {
                  if (typeof charState[0] === 'object') {
                     const spot1 = charState[0][0]
                     const spot2 = charState[0][1]
                     if (!(word[spot1]===curChar && word[spot2]===curChar)) return false
                  }
               } else if (!charState.includes(i)) return false
            } else if (Object.keys(rights).includes(`${i}`)) return false
         }

         for (let i = 0; i < maybes.length; i++) {
            if (!word.includes(maybes[i])) return false
         }
         return true
      }
      setPossibleWords(WORD_LIST.filter(spotsFilter))
   }

   function getCell(i) { return document.getElementById(`wordle-cell-${i}`) }
   function getInput(i) { return document.getElementById(`wordle-cell-input-${i}`) }

   function clearBoard() {
      for (let i = 0; i < 25; i++) {
         getInput(i).value = ''
         getCell(i).className = 'cell empty'
      }
      setPossibleWords('Try me out . Open up Wordle in another tab.'.split(' '))
   }

   function toggleMode(idx, mode) {
      const cell = getCell(idx)
      cell.className = `cell ${mode}`
      if (mode === 'empty') {
         getInput(idx).value = ''
      }
   }

   function handlePress(e, idx) {
      const ch = e.target.value
      if (ch.length===1) {
         toggleMode(idx, 'wrong')
         focusOn(idx+1)
      }
   }

   function focusOn(idx) {
      if (idx < 0) idx = 0
      if (idx > 24) idx = 24
      const input = getInput(idx)
      input.focus()
   }

   function handleFocus(e, idx) {
      setStagedChar(e.target.value)
      getInput(idx).value = ''
   }

   function handleBlur(e, idx) {
      if (!e.target.value) {
         if (goingBack.current) {
            toggleMode(idx, 'empty')
         } else {
            getInput(idx).value = stagedChar
         }
      }
      setStagedChar(null)
      goingBack.current = false
   }

   function handleKeydown(e, idx) {
      if (e.code === 'Backspace') {
         goingBack.current = true
         setStagedChar(null)
         focusOn(idx-1)
      }
   }

   return (
      <WordleContainer ready={ready}>
         <h1 style={{ padding: 0 }}>Wordle Solver</h1>
         <div className='main'>
            <div className='board'>
               {[...Array(25).keys()].map(i => (
                  <div id={`wordle-cell-${i}`} className='cell' style={{ transition: `all 0.25s ease, transform 0.5s ease ${.03*i}s` }}>
                     <input
                        id={`wordle-cell-input-${i}`}
                        onKeyDown={e => handleKeydown(e, i)}
                        maxLength={1}
                        placeholder={(document.activeElement == getInput(i)) && stagedChar}
                        onFocus={e => handleFocus(e, i)}
                        onBlur={e => handleBlur(e, i)}
                        onChange={e => handlePress(e, i)}
                     />

                     <div className='toggler'>
                        {modes.map(m => (
                           <div onClick={() => toggleMode(i, m)} style={{ background: colors[m] }} />
                        ))}
                     </div>
                  </div>
               ))}
            </div>

            <div className='wordle-buttons'>
               <button className='solve' onClick={evaluate}>Solve</button>
               <button className='clear' onClick={clearBoard}>Clear</button>
            </div>

            <div style={{ padding: '2vw' }} className='wordle-results'>
               <p>Possible words: <b>{possibleWords.length}</b></p>
               <div className='word-list'>
                  {limitedWords.map((word, i) => (
                     <div onClick={word==='Wordle'  ? () => window.open('https://www.nytimes.com/games/wordle/index.html', '_blank') : () => {}} className={`word-option ${word=='Wordle' && 'wrdl'} ${commonWords.includes(word) && 'common'}`}>{word}</div>
                  ))}
                  {possibleWords.length > wordLimit && <div className='word-option view-all' onClick={() => setViewingAllWords(true)}>See all <b style={{ color: 'black' }}>{possibleWords.length}</b></div>}
               </div>
            </div>
         </div>

         <Modal title={<><b>{possibleWords.length}</b> possible words</>} ready={viewingAllWords} onClose={() => setViewingAllWords(false)}>
            <div className='word-list just-words'>
               {possibleWords.map(w => <div className={`word-option ${commonWords.includes(w) && 'common'}`}>{w}</div>)}
            </div>
         </Modal>
      </WordleContainer>
   )
}

const WordleContainer = styled.div`
   pointer-events: ${props => !props.ready && 'none'};
   user-select: ${props => !props.ready && 'none'};
   padding: 2vw;
   height: 100%;
   width: 100%;
   display: flex;
   flex-direction: column;
   position: absolute;
   top: 0;
   left: 0;

   h1 {
      transition: all 0.5s ease;
      transform: translateX(${props => props.ready ? 0 : -30}px);
      opacity: ${props => props.ready ? 1 : 0};
   }

   .main {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      flex: 1;

      .board {
         width: min(85vw, 300px);
         height: min(85vw, 300px);
         display: grid;
         grid-template-columns: repeat(5, 1fr);
         grid-gap: 1vw;
   
         .cell {
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 10px;
            overflow: hidden;
            transition: all .25s ease;
            transform: scale(${props => props.ready ? 1 : 0});
            background: #2228;

            &.right { background: #61865488 }
            &.wrong { background: #61646688 }
            &.maybe { background: #9f915188 }

            input {
               cursor: pointer;
               border-radius: 0;
               background: none;
               width: 100%;
               height: 100%;
               text-align: center;
               font-size: 1.5rem;
               text-transform: lowercase;
               transition: all 0.25s ease;

               :focus { background: #0005 }

               &:hover { background: #5b91 }
            }

            .toggler {
               height: 20px;
               width: 100%;
               display: flex;

               > div {
                  width: 100%;
                  height: 100%;
               }
            }
         }
      }

      .wordle-buttons {
         display: flex;
         width: min(85vw, 300px);
         margin-top: 1vw;
         margin-bottom: 2vw;
         justify-content: center;
   
         button {
            margin: 5px;
            transform: scale(${props => props.ready ? 1 : 0});
            transition: transform 0.5s ease 0.25s;

            &.solve {
               background: #5b95;
               
               &:hover { background: #5b9 }
            }

            &.clear {
               background: #d7555555;
               
               &:hover { background: #d75555 }
            }
         }
      }
   }

   .wordle-results {
      transition: all 0.5s ease;
      transform: scale(${props => props.ready ? 1 : 0});

      // word-list styles in styles.js
   }
`