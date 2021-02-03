const SELECT_ROWS = 0;
const SELECT_COLS = 1;
const GAME_FINISH = 2;

let width = 400, 
    height = 400,
    fieldCols = 8,
    fieldRows = 6,
    gameArray = [],
    canvas,
    posClicked = [],
    stateSelected = SELECT_ROWS,
    solutionNum = 1,
    solutionLength = 5,
    solution = [],
    activeRow = 0,
    activeCol = 0,
    startState = SELECT_ROWS;

class BytesGame {
    constructor() {
        this.bytesArray = [
            '55', '1C', 'BD', '7A', 'DE', 'AD', 'BE', 'EF'
        ];

        for( var i = 0; i < fieldCols; i++ ) {
            var row = [];

            for( var j = 0; j < fieldRows; j++ ) {
                row.push( this.bytesArray[parseInt( Math.random() * this.bytesArray.length )] );
            }

            gameArray.push( row );
        }
    }
}

function fillGrid() {
    clearGrid();
    for( var i = 0; i < fieldCols; i++ ) {
        for( var j = 0; j < fieldRows; j++ ) {
            let text = createP( gameArray[i][j] );
            
            text.class( 'cell' );
            text.position( 10 + i * 50 + 15, 10 + j * 50 );
        }
    }
};

function clearGrid() {
    var elems = document.querySelectorAll( '.cell' );

    elems.forEach( function( elem ) { elem.remove(); });
}

function setup() {
    canvas = createCanvas( innerWidth - 50, innerHeight - 50 );
    
    newGame();

    document.addEventListener( 'contextmenu', event => event.preventDefault());
}

function newGame() {
    var game = new BytesGame();

    drawGrid();
    drawSolutionRow();
    fillGrid();

    dbg( 'game ready' );
}

function isSolutionFull() {
    return !( solution.length < solutionLength )
}

function getCell() {
    let row = parseInt( mouseY / 50 );
    let col = parseInt( mouseX / 50 );

    if( row > fieldRows - 1 ) 
    {
        row = fieldRows - 1;
    }

    if( col > fieldCols - 1 ) 
    {
        col = fieldCols - 1;
    }

    if( stateSelected == SELECT_ROWS ) {
        row = activeRow;
    }

    if( stateSelected == SELECT_COLS ) {
        col = activeCol;
    }

    return [col, row];
}

function isClickInField() {
    if(( mouseX > 0 && mouseX < fieldCols * 50 ) && ( mouseY > 0 && mouseY < fieldRows * 50 ))
    {
        return true;
    }

    return false;
}

function getByte() {
    let pos = getCell();
    return gameArray[pos[0]][pos[1]];
}

function drawGrid() {
    drawHLines( 10, 10, fieldRows, fieldCols );
    drawVLines( 10, 10, fieldRows, fieldCols );
}

function drawSolutionRow() {
    drawHLines( 500, 10, solutionNum, solutionLength );
    drawVLines( 500, 10, solutionNum, solutionLength );
}

function drawCell( row, col ) {
    //fill( 255, 255, 255 );
    noFill();
    square( 10 + row * 50 + 3, 10 + col * 50 + 3, 44 );
}

function drawHLines( startX, startY, cols, rows ) {
    for( var i = 0; i <= cols; i++ ) {
        line( startX, startY + i * 50, startX + rows * 50, startY + i * 50 );
    }
}

function drawVLines( startX, startY, cols, rows ) {
    for( var j = 0; j <= rows; j++ ) {
        line( startX + j * 50, startY, startX + j * 50, startY + cols * 50 );
    }
}

function drawRow() {
    let pos = getCell();

    for( var i = 0; i < fieldCols; i ++ ) {
        drawCell( i, activeRow );
    }
}

function drawCol() {
    let pos = getCell();

    for( var j = 0; j < fieldRows; j ++ ) {
        drawCell( activeCol, j );
    }
}

function drawActiveCell() {
    let pos = getCell();
    
    push();
    noStroke();
    fill( '#aaaaaa' );
    square( 10 + pos[0] * 50 + 3, 10 + pos[1] * 50 + 3, 44 );
    pop();
}

function dbg( text ) {
    select( '#debug' ).html(  '<p>' + text + '</p>' );
}

function drawGame() {
    clear();

    drawGrid();
    drawSolutionRow();
    drawActiveCell();

    if( startState == SELECT_ROWS ) {
        
    }

    if( stateSelected == SELECT_ROWS ) {
        drawRow( activeRow );
    }
    else if( stateSelected == SELECT_COLS ) {
        drawCol( activeCol );
    }
}

function mouseMoved() {
    if( stateSelected != GAME_FINISH )
    {
        drawGame();
    }
    else
    {
        console.log( 'GAME FINISH' );
    }
}

function fillSolution( solutionByte ) {
    solution.push( solutionByte );
}

function drawSolutionArray() {
    var elems = document.querySelectorAll( '.solutionCell' );
    
    elems.forEach( function( elem ) { elem.remove();});

    for( var i = 0; i < solution.length; i++ ) {
        let text = createP( solution[i] );
            
        text.class( 'solutionCell' );
        text.position( i * 50 + 515, 10 );
    }
}

function removeByteFromField( pos ) {
    gameArray[pos[0]][pos[1]] = null;

}

function isByteExists( pos ) {
    if( gameArray[pos[0]][pos[1]] != null )
    {
        return true;
    }

    return false;
}

function mousePressed() {
    if( mouseButton === LEFT && isClickInField()) 
    {
        if( !isSolutionFull())
        {
            let pos = getCell();
            posClicked = pos;
            
            if( isByteExists( pos )) 
            {
                fillSolution( getByte());
                drawSolutionArray();
                removeByteFromField( pos );
                fillGrid();
                dbg( pos[0] + ', ' + pos[1] + ': ' + getByte() + ' == ' + solution );

                activeRow = posClicked[1];
                activeCol = posClicked[0];

                if( stateSelected == SELECT_ROWS ) {
                    stateSelected = SELECT_COLS;
                }
                else {
                    stateSelected = SELECT_ROWS;
                }

                dbg( 'activeCol ' + activeCol + ', activeRow ' + activeRow );
            }
        }
        
        if( isSolutionFull())
        {
            stateSelected = GAME_FINISH;

            clear();

            drawGrid();
            drawSolutionRow();
        }
    }

    // if( mouseButton === RIGHT ) {
    //     if( stateSelected == SELECT_ROWS ) {
    //         stateSelected = SELECT_COLS;
    //     }
    //     else {
    //         stateSelected = SELECT_ROWS;
    //     }

    //     dbg( 'right click' );
    // }

    //drawGame();
}