export default function List({lists,Bool,DltHandle}){
        console.log(Bool)
        return(
            <>
                {lists.map((v)=>(
                    <tr key={Math.random()}>
                        <td key={Math.random()}>{v.date}{Bool? <button name={v._id} value="Delete" onClick={DltHandle}>Delete</button>: null}</td>
                        <td key={Math.random()}>{v.name}</td>
                        <td key={Math.random()}>{v.amount}</td>
                    </tr>
                ))}
            </>
        )
}