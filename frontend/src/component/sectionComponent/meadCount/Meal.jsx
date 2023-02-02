import axios from 'axios';
import { useEffect, useState } from 'react';
import MealList from './component/MealList';
import './meal.css';
const sc = "tmatrix@19"
export default function Meal(){
        
        const [Data,setData] = useState({
            date:"",
            farhad:"",
            arif:"",
            mannan:"",
            secret:"",
        })
        const [lists,setLists] = useState()
        useEffect(()=>{
            const fetchData = async()=>{
                const res = await axios.get('http://localhost:8800/meal');
                setLists(res)
            }
            fetchData();
        },[Data])
        if(lists){
             let sum = lists.data.map((v)=>(parseFloat(v.farhad)+parseFloat(v.mannan)+parseFloat(v.arif)))
             var Sum = 0;
             for(let i = 0 ; i<sum.length; i++){
                Sum += sum[i];
             }
        }

        
        const handleSubmit = (e)=>{
            if(e.target.name === 'farhad'){
                setData({
                    ...Data,
                    farhad:e.target.value
                })
            }
            else if(e.target.name==='arif'){
                setData({
                    ...Data,
                    arif:e.target.value
                })
            }
            else if(e.target.name==='mannan'){
                setData({
                    ...Data,
                    mannan:e.target.value
                })
            }
            else if(e.target.name === 'date'){
                setData({
                    ...Data,
                    date:e.target.value
                })
            }
            else if(e.target.name==='secret'){
                setData({
                    ...Data,
                    secret:e.target.value
                })
            }
        }
        const Submit = async(e)=>{
            e.preventDefault()
            const {farhad,arif,mannan,date} = Data;
            
            const mealData = {
                date,
                farhad,
                arif,
                mannan
            }
            // console.log(mealData)
            await axios.post('http://localhost:8800/meal',mealData)
            .then(res=>{
                console.log(res.data)
            })
            setData({
                date:"",
                farhad:"",
                arif:"",
                mannan:"",
                secret:"",
            })
        }

        const DltHandle = async(e) =>{
            const url = `http://localhost:8800/meal/${e.target.name}`;
            await axios.delete(url).then(res=>console.log(res.data))
            setData({
                ...Data,
                secret:''
            })
        }
        return(
            <div>
                <form action="" onSubmit={Submit}>
                        <div className="fieldSet">
                            <fieldset>
                                <legend> <h3>Date</h3></legend>
                                <input required={true} onChange={handleSubmit} value={Data.date} type="date" name="date"  />
                            </fieldset>
                            <fieldset>
                                <legend>
                                    <h3>Input Meal</h3>
                                </legend>
                                <label htmlFor="">Farhad</label>
                                <input  style={{width:'50px',marginLeft:'15px'}} onChange={handleSubmit} type="text" name="farhad" value={Data.farhad} />
                                <br/>
                                <label htmlFor="">Arif</label>
                                <input style={{width:'50px',marginLeft:'44px'}} onChange={handleSubmit} type="text" name="arif" value={Data.arif} />
                                <br/>
                                <label htmlFor="">Mannan</label>
                                <input style={{width:'50px',marginLeft:'5px'}} onChange={handleSubmit} type="text" name="mannan" value={Data.mannan} />
                            </fieldset>
                            <fieldset>
                                <legend> <h3>Secret Code</h3></legend>
                                <input placeholder='for delete and submit button' onChange={handleSubmit} value={Data.secret} type="password" name="secret" id="" />
                            </fieldset>
                        </div>
                        {Data.secret === sc ? <input  className="submit" type="submit" value="Submit" /> : <p></p>}
                    </form>
                    <table>
                        <tbody>
                            <tr>
                                <th>Date</th>
                                <th>Farhad</th>
                                <th>Arif</th>
                                <th>Mannan</th>
                            </tr>
                            
                            {lists ? <MealList Bool={Data.secret === sc ? true : false} DltHandle={DltHandle} lists={lists.data}/> : null}
                            <tr>
                                <th colSpan={3}>Total Meal</th>
                                <th>{Sum ? Sum : '0'}</th>
                            </tr>
                        </tbody>
                        

                    </table>
            </div>
        )
}