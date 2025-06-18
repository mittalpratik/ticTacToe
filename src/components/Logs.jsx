export default function Logs({turns}) {
    return (
        <ol id="log">
            {turns.map((turn) => {
                return (<li key={turn.key}>
                    {turn.player} selected {turn.square.row},{turn.square.col}
                </li>)
            })}
        </ol>
    );
}