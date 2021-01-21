var canvas = document.getElementById( 'c1' );

var clearCanvas = function( ctx, x,y, width, height ) {
    ctx.beginPath();
    ctx.rect( x, y, width, height );
    ctx.fillStyle = 'rgba( 0, 0, 0, 1 )';
    ctx.fill();
}

class CP2077MiniGame {
    constructor() {
        this.charsArray = [
            '55', '1C', 'BD', '7A', 'DE', 'AD', 'BE', 'EF'
        ];
        this.gameArray = [];
        this.fieldCols = 8;
        this.fieldRows = 8;

        for( var i = 0; i < this.fieldCols; i++ ) {
            var row = []
            for( var j = 0; j < this.fieldRows; j++ ) {
                row.push( this.charsArray[parseInt( Math.random() * this.charsArray.length )] );
            }

            this.gameArray.push( row );
        }
    }

    checkChain() {
        // check what solution chain is exists
        // TODO
        return true;
    }

    fillGrid() {
        let canvas = createCanvas( 400, 400);

        for( var i = 0; i < this.fieldCols; i++ ) {
            for( var j = 0; j < this.fieldRows; j++ ) {
                let text = createP( this.gameArray[i][j] );
                
                text.class( 'cell' );
                text.position( j * 25, i * 25 );
                console.log( text );
            }
        }

        canvas.position( 50, 50 );
    }
    
}

if( canvas ) {
    var game = new CP2077MiniGame();

    game.fillGrid();
}
