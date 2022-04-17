import './App.css';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function App() {

  let initBlanks = [];
  let initHiddenWord = 'HANGMAN'
  let initAvailLetters = [{value: 'A', exists: false, attempted: false}, 
  {value: 'B', exists: false, attempted: false}, 
  {value: 'C', exists: false, attempted: false},
  {value: 'D', exists: false, attempted: false},
  {value: 'E', exists: false, attempted: false},
  {value: 'F', exists: false, attempted: false},
  {value: 'G', exists: false, attempted: false},
  {value: 'H', exists: false, attempted: false},
  {value: 'I', exists: false, attempted: false},
  {value: 'J', exists: false, attempted: false},
  {value: 'K', exists: false, attempted: false},
  {value: 'L', exists: false, attempted: false},
  {value: 'M', exists: false, attempted: false},
  {value: 'N', exists: false, attempted: false},
  {value: 'O', exists: false, attempted: false},
  {value: 'P', exists: false, attempted: false},
  {value: 'Q', exists: false, attempted: false},
  {value: 'R', exists: false, attempted: false},
  {value: 'S', exists: false, attempted: false},
  {value: 'T', exists: false, attempted: false},
  {value: 'U', exists: false, attempted: false},
  {value: 'V', exists: false, attempted: false},
  {value: 'W', exists: false, attempted: false},
  {value: 'X', exists: false, attempted: false},
  {value: 'Y', exists: false, attempted: false},
  {value: 'Z', exists: false, attempted: false},
  {value: '0', exists: false, attempted: false},
  {value: '1', exists: false, attempted: false},
  {value: '2', exists: false, attempted: false},
  {value: '3', exists: false, attempted: false},
  {value: '4', exists: false, attempted: false},
  {value: '5', exists: false, attempted: false},
  {value: '6', exists: false, attempted: false},
  {value: '7', exists: false, attempted: false},
  {value: '8', exists: false, attempted: false},
  {value: '9', exists: false, attempted: false},
  {value: ' ', exists: false, attempted: false}];
  const [wordsFieldError, setWordsFieldError] = React.useState( { error: false, text: '' } )
  const [blanksList, setBlanksList] = React.useState( initBlanks );
  const [availableLettersList, setAvailableLettersList] = React.useState( initAvailLetters );
  const [selectedWords, setSelectedWords] = React.useState('');
  const [hiddenWord, setHiddenWord] = React.useState( initHiddenWord );
  const [submittedWords, setSubmittedWords] = React.useState([]);
  const [showHangmanImage, setShowHangmanImage] = React.useState(false);
  const [misses, setMisses] = React.useState(0);

  const regexForAllowedChars = /[a-zA-Z0-9 ]/;


  let handleLetterBoxClick = ( letter ) => {
    console.log('Inside handleLetterBoxClick ' + letter.value );
    let newBlanks = [ ...blanksList ];
    let newAvailableLettersList = [ ...availableLettersList ];
    let letterFound = false;
    for( var i=0; i<hiddenWord.length; i++ ) {
      if( hiddenWord[i] === letter.value ) {
        newBlanks[i].symbol = letter.value;
        newBlanks[i].revealed = true;
        letterFound = true;
      }
    }
    for( var i=0; i< availableLettersList.length; i++ ) {
      if( newAvailableLettersList[i].value === letter.value ) {
        if( letterFound ) {
          newAvailableLettersList[i].exists = true;
          newAvailableLettersList[i].attempted = true;
        }else {
          newAvailableLettersList[i].attempted = true;
          setMisses( ( prevMisses ) => prevMisses + 1 );
        }
      }
    }
    setBlanksList( newBlanks);
    setAvailableLettersList( newAvailableLettersList );
  }

  React.useEffect(() => {
    for( var i=0; i<blanksList.length; i++ ) {
      if( i === blanksList.length - 1 && blanksList[i].revealed && submittedWords.length > 1 ) {
        //setTimeout( () => nextWord(), 1000);
        return;
      }
      if( blanksList[i].revealed ) {
        continue;
      }
      break;
    }
  }, [blanksList]);

  React.useEffect(() => {
    if( misses === 7 ) {
      revealWord();
    }

  }, [misses]);

  const handleChange = (event) => {
    setSelectedWords(event.target.value);
    if( !regexForAllowedChars.test(event.target.value) ) {
      setWordsFieldError({ error: true, text: 'Only alphabets allowed'});
    }else {
      setWordsFieldError({ error: false, text: ''});
    }
  };

  const submitWords = ( event ) => {
    let sw = selectedWords.toUpperCase().trim().split('\n');
    setSubmittedWords( sw );
    selectHiddenWord( sw );
    setShowHangmanImage(true);
  }

  const selectHiddenWord = ( sWords ) => {
    let hiddenWordCandidate = sWords[ Math.floor(Math.random() * sWords.length) ];
    setHiddenWord( hiddenWordCandidate );
    createBlankList( hiddenWordCandidate );
  }

  const revealWord = () => {
    let newBlanks = []
    for( var i=0; i<hiddenWord.length; i++ ) {
      newBlanks.push( {
        symbol: hiddenWord[i],
        revealed: true
      } )
    }
    setBlanksList( newBlanks );
    setAvailableLettersList( initAvailLetters );
  }

  const nextWord = () => {
    let newSubmittedWords = [ ...submittedWords ];
    newSubmittedWords.splice( newSubmittedWords.indexOf( hiddenWord ), 1 );
    setSubmittedWords( newSubmittedWords );
    selectHiddenWord( newSubmittedWords );
    setAvailableLettersList( initAvailLetters );
    //setMisses(0);
  }

  const createBlankList = ( blankedWord ) => {
    let newBlanks = [];
    for( var i = 0; i<blankedWord.length; i++ ) {
      let blanksObj = {
        symbol: '___',
        revealed: false
      }
      newBlanks.push( blanksObj );
    }
    setBlanksList( newBlanks );
  }

  const resetHangman = () => {
    setHiddenWord( initHiddenWord );
    setAvailableLettersList( initAvailLetters );
    createBlankList( initHiddenWord );
    setSubmittedWords([]);
    setSelectedWords('');
    setShowHangmanImage(false);
    setMisses(0);
  }

  const draw = ( ctx, width, height ) => {
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    if( misses === 0 ) {
      ctx.clearRect( 0, 0, width, height );
      ctx.lineWidth = 12;
      ctx.moveTo(50,75);
      ctx.lineTo(350,75)
      ctx.moveTo(300,45);
      ctx.lineTo(300,445)
      ctx.moveTo(150,75);
      ctx.lineTo(150,125)
      ctx.stroke(); 
    }
    ctx.lineWidth = 6;
    if( misses === 1 ) {
      ctx.arc(150,155,30,0,2*Math.PI);
      ctx.stroke();
    }
    if( misses === 2 ) {
      ctx.moveTo(150,185);
      ctx.lineTo(150,290)
      ctx.stroke();
    }
    if( misses === 3 ) {
      ctx.moveTo(150,200);
      ctx.lineTo(115,225);
      ctx.stroke();
    }
    if( misses === 4 ) {
      ctx.moveTo(150,200);
      ctx.lineTo(185,225);
      ctx.stroke();
    }
    if( misses === 5 ) {
      ctx.moveTo(150,290);
      ctx.lineTo(115,315);
      ctx.stroke();
    }
    if( misses === 6 ) {
      ctx.moveTo(150,290);
      ctx.lineTo(185,315);
      ctx.stroke();
    }
    if( misses === 7 ) {
      ctx.lineWidth = 3;
      ctx.moveTo(134,140);
      ctx.lineTo(143,150);
      ctx.moveTo(143,140);
      ctx.lineTo(134,150);
      ctx.moveTo(158,140);
      ctx.lineTo(168,150);
      ctx.moveTo(168,140);
      ctx.lineTo(158,150);
      ctx.stroke();
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.arc(150,165,5,0,2*Math.PI);
      ctx.stroke();
    }
  }

  const handleKeyDown = ( event ) => {
    if( submittedWords.length > 0 && ( event.keyCode  === 32 || ( event.keyCode >= 48 && event.keyCode <= 90) ) ) {
      let pressedKey = { value: event.key.trim().toUpperCase() };
      handleLetterBoxClick( pressedKey );
    }
  }

  React.useEffect(() => {
    createBlankList( hiddenWord ); 
    document.addEventListener("keydown", handleKeyDown ); 
  }, [submittedWords]);
  
  return (
    <div className="App">
      <React.Fragment>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, bgcolor: '#cfe8fc', height: '100vh' }}>
          <h1>Hangman</h1>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 8 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                    {
                        availableLettersList.map((letter) => (
                            <LetterBox value={letter} onLetterBoxClick={handleLetterBoxClick}></LetterBox>
                        ))
                    }
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ backgroundColor: 'white' }}>
                {!showHangmanImage && <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '10px' }}
                >
                  <div>
                    <TextField
                      multiline
                      error={wordsFieldError.error}
                      helperText={wordsFieldError.text}
                      maxRows={4}
                      value={selectedWords}
                      onChange={handleChange}
                    />
                  </div>
                  <Button sx={{ height: 50 }} variant="contained" onClick={submitWords}>Submit</Button>
                </Box>
                }
                {showHangmanImage && <Canvas id="myCanvasComp" width="500" height="500" draw={draw} misscount={misses} />}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                {blanksList.map((blank, index) => (
                      <CharBox value={blank}></CharBox>
                    ))
                }
              </Box>     
            </Grid>
            <Grid item xs={12}>
              <Box xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 2 }}>
                  <Button sx={{ height: 50 }} variant="contained" onClick={revealWord}>Reveal</Button>
                  {submittedWords.length === 1 && <Button sx={{ height: 50 }} variant="contained" onClick={resetHangman}>Reset</Button>}
                  {submittedWords.length > 1 && <Button sx={{ height: 50 }} variant="contained" onClick={nextWord}>Next</Button>}
              </Box>
            </Grid>
          </Grid>
        </Box>
        
      </React.Fragment>      
    </div>
  );
}

const CharBox = ( { value } ) => (
  <Box sx={ {
    width: 100,
    height: 100,
    backgroundColor: value.revealed ? 'green' : 'white',
    fontSize: 'h4.fontSize',
    marginLeft: '10px',
    paddingTop: '30px',
    boxShadow: 1,
    borderRadius: 2
  } }>
    <div>
    { value.symbol }
    </div>
  </Box>
);

const LetterBox = ( { value, onLetterBoxClick } ) => (
  <Box sx={ {
    width: 40,
    height: 40,
    backgroundColor: value.exists && value.attempted ? 'green' : !value.exits && value.attempted ? 'red' : 'black',
    fontSize: '25px',
    color: 'white',
    marginLeft: '8px',
    paddingTop: '3px',
    boxShadow: 1,
    borderRadius: 2
  } }
  onClick={ () => onLetterBoxClick( value ) }>
    <div>
      { value.value }
    </div>
  </Box>
);

const Canvas = ( props ) => {
  const canvasRef = React.useRef(null);
  const { draw, misscount, ...rest } = props;
  React.useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    draw(context, rest.width, rest.height);
  }, [draw, misscount]); 
  return <canvas ref={canvasRef} {...rest}/>
}

export default App;
