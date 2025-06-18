export default function GameOver({winner, ...props}){
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p>{winner} won!</p>}
            {!winner && <p>It is a draw!</p>}
            <p><button {...props}>Reset Match</button></p>
        </div>
    );
}