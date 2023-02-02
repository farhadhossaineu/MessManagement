export default function MealList({lists,DltHandle,Bool}){
    return(
        <>
            {lists.map((v)=>(
            <tr key={Math.random()}>
                <td key={Math.random()}>{v.date} {Bool? <button name={v._id} value="Delete" onClick={DltHandle}>Delete</button>: null}</td>
                <td key={Math.random()}>{v.farhad}</td>
                <td key={Math.random()}>{v.arif}</td>
                <td key={Math.random()}>{v.mannan}</td>
            </tr>
        ))}
        </>
        
    )
}