const SELECT_ROWS = 0;
const SELECT_COLS = 1;

let width = 400, 
    height = 400,
    fieldCols = 8,
    fieldRows = 6,
    gameArray = [],
    canvas,
    posClicked,
    stateSelected = SELECT_ROWS;

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
    for( var i = 0; i < fieldCols; i++ ) {
        for( var j = 0; j < fieldRows; j++ ) {
            let text = createP( gameArray[i][j] );
            
            text.class( 'cell' );
            text.position( 10 + i * 50 + 15, 10 + j * 50 );
        }
    }
};

function setup() {
    canvas = createCanvas( innerWidth - 50, innerHeight - 50 );
    
    var game = new BytesGame();

    drawGrid();
    //drawChain2();
    fillGrid();


    dbg( 'game ready' );

    document.addEventListener( 'contextmenu', event => event.preventDefault());
}


function getCell() {
    let row = parseInt( mouseX / 50 );
    let col = parseInt( mouseY / 50 );

    if( row > fieldRows - 1 ) {
        row = fieldRows - 1;
    }

    if( col > fieldCols - 1 ) {
        col = fieldCols - 1;
    }

    return [row, col];
}

function getByte() {
    let pos = getCell();
    return gameArray[pos[0]][pos[1]];
}

function drawGrid() {
    drawHLines( 10, 10, fieldRows, fieldCols );
    drawVLines( 10, 10, fieldRows, fieldCols );
}

function drawChain2() {
    drawHLines( 500, 10, 1, 5 );
    drawVLines( 500, 10, 1, 5 );
}

function drawCell( row, col ) {
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
        drawCell( i, pos[1] );
    }
}

function drawCol() {
    let pos = getCell();

    for( var j = 0; j < fieldCols; j ++ ) {
        drawCell( pos[0], j );
    }
}

function dbg( text ) {
    select( '#debug' ).html(  '<p>' + text + '</p>' );
}

function drawGame() {
    clear();

    drawGrid();
    drawChain2();

    if( stateSelected == SELECT_ROWS ) {
        drawRow();
    }
    else if( stateSelected == SELECT_COLS ) {
        drawCol();
    }
}

function mouseMoved() {
    //drawGame();
}

function drawChain() {

}

function mousePressed() {
    if( mouseButton === LEFT ) {
        let pos = getCell();
        posClicked = pos;


        dbg( pos[0] + ', ' + pos[1] + ': ' + getByte() );
    }

    if( mouseButton === RIGHT ) {
        if( stateSelected == SELECT_ROWS ) {
            stateSelected = SELECT_COLS;
        }
        else {
            stateSelected = SELECT_ROWS;
        }

        dbg( 'right click' );
    }

    //drawGame();
}