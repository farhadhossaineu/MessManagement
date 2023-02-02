import axios from 'axios';
import { useEffect, useState } from 'react';
import './bazar.css';
import List from "./component/List";
const Sc = "tmatrix@19"
export default function Bazar(){
        const [Data,setData] = useState({
            date:'',
            name:'',
            amount:''
        })
        const [Data1,setData1] = useState({
            date:'',
            name:'',
            amount:''
        })
        const [scrt,setScrt] = useState()
        const [scrt1,setScrt1] = useState()
        const [track1,setTrac1] = useState()
        const [track2,setTrac2] = useState()

        const [Elists,setExLists] = useState()
        const [Dlists,setDeLists] = useState()

        useEffect(()=>{
            const fetchData = async()=>{
                const res = await axios.get('http://localhost:8800/expense');
                setExLists(res)
            }
            fetchData();
        },[Data,track1])
        useEffect(()=>{
            const fetchData = async()=>{
                const res = await axios.get('http://localhost:8800/deposite');
                setDeLists(res)
            }
            fetchData();
        },[Data1,track2])
        const handleExpenseChange = (e)=>{
            if(e.target.name === 'date'){
                setData({
                    ...Data,
                    date:e.target.value
                })
            }
            else if(e.target.name === 'expenser'){
                setData({
                    ...Data,
                    name:e.target.value
                })
            }
            else if(e.target.name === 'amount'){
                setData({
                    ...Data,
                    amount: e.target.value
                })
            }
        }
        const handleExpenseSubmit = async(e)=>{
            e.preventDefault();
            const {date,name,amount} = Data;
            const ExData = {
                date,
                name,
                amount
            }
            await axios.post('http://localhost:8800/expense',ExData)
            .then(res=>{
                console.log(res.data)
            })
            setData({
                date:'',
                name:'',
                amount:''
            })
            setScrt('')
            
        }
        const handleDepositChange = (e)=>{
            if(e.target.name === 'date'){
                setData1({
                    ...Data1,
                    date:e.target.value
                })
            }
            else if(e.target.name === 'deposit'){
                setData1({
                    ...Data1,
                    name: e.target.value
                })
            }
            else if(e.target.name === 'amount'){
                setData1({
                    ...Data1,
                    amount: e.target.value
                })
            }
        }
        const handleDepositSubmit = async(e)=>{
            e.preventDefault();
            const {date,name,amount} = Data1;
            const DepData ={
                date,name,amount
            }
            await axios.post('http://localhost:8800/deposite',DepData)
            .then(res=>{
                console.log(res.data)
            })
            setData1({
                date:'',
                name:'',
                amount:''
            })
            setScrt1('')
        }
        const cngScrt = (e)=>{
            if(e.target.name === 'scrt'){
                setScrt(e.target.value)
            }
            else if(e.target.name === 'scrt1'){
                setScrt1(e.target.value)
            }
        }



        //total expense amount
        if(Elists){
            let sum = Elists.data.map((v)=>(parseInt(v.amount)))
            var Esum = 0;
            for(let i = 0 ; i<sum.length ; i++){
                Esum += sum[i];
            }
        }
        //Totla deposite
        if(Dlists){
            let sum = Dlists.data.map((v)=>(parseInt(v.amount)))
            var Dsum = 0;
            for(let i = 0 ; i<sum.length ; i++){
                Dsum += sum[i];
            }
        }

        const DltHandle1 = async(e) =>{
            const url = `http://localhost:8800/expense/${e.target.name}`;
            await axios.delete(url).then(res=>console.log(res.data))
            setScrt('')
            setTrac1({track1:Math.random()})
        }
        const DltHandle2 = async(e) =>{
            const url = `http://localhost:8800/deposite/${e.target.name}`;
            await axios.delete(url).then(res=>console.log(res.data))
            setScrt1('')
            setTrac2({track2:Math.random()})
        }
        return(
            <div className="main">
                <div className='form_data'>
                    <form onSubmit={handleExpenseSubmit}>
                        <div className="fieldSet fset">
                                <fieldset>
                                    <legend> <h3>Date</h3></legend>
                                    <input required={true} type="date" name="date" value={Data.date} onChange={handleExpenseChange} />
                                </fieldset>
                                <fieldset>
                                <legend> <h3>Name</h3></legend>
                                    <select required={true} name="expenser" value={Data.name} onChange={handleExpenseChange}>
                                        <option value="">Select One</option>
                                        <option value="Farhad">Farhad</option>
                                        <option value="Arif">Arif</option>
                                        <option value="Mannan">Mannan</option>
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <legend> <h3>Amount</h3></legend>
                                    <input placeholder='Input Amount' type="text" name="amount" value={Data.amount} onChange={handleExpenseChange} />
                                    <br/>
                                    <input placeholder='Key for Delete & Submit' type='password' name='scrt' value={scrt} onChange={cngScrt}/>
                                </fieldset>
                            
                        </div>
                        {scrt === Sc ? <input className="submit" type="submit" value="Submit" />: <p></p>}
                        
                    </form>
                    <form onSubmit={handleDepositSubmit}>
                        <div className="fieldSet fset1">
                                <fieldset>
                                    <legend> <h3>Date</h3></legend>
                                    <input required={true} type="date" name="date" value={Data1.date} onChange={handleDepositChange} />
                                </fieldset>
                                <fieldset>
                                    <legend> <h3>Name</h3></legend>
                                    <select required={true} name="deposit" value={Data1.name} onChange={handleDepositChange}>
                                         <option value="">Select One</option>
                                        <option value="Farhad">Farhad</option>
                                        <option value="Arif">Arif</option>
                                        <option value="Mannan">Mannan</option>
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <legend> <h3>Amount</h3></legend>
                                    <input placeholder='Input Amount' type="text" name="amount" value={Data1.amount} onChange={handleDepositChange} />
                                    <br/>
                                    <input placeholder='Key for Delete & Submit' type='password' name='scrt1' value={scrt1} onChange={cngScrt}/>
                                </fieldset>
                        </div>
                        {scrt1 === Sc ? <input className="submit" type="submit" value="Submit" />: <p></p>}
                    </form>
                </div>
                <div className="table_data">
                    <table>
                        <caption>Bazar List</caption>
                        <tbody>
                            <tr>
                                <th>Date</th>
                                <th>Expenser Name</th>
                                {/*next update expenser name
                                will be in dropdown list */}
                                <th>Amount</th>
                            </tr>
                            { Elists ? <List Bool={scrt === Sc ? true : false} DltHandle={DltHandle1} lists={Elists.data}/> : null}
                            <tr>
                                <th colSpan={2}>Total</th>
                                <th>{Esum}</th>
                            </tr>
                        </tbody>
                        
                    </table>
                    <table className='deposite'>
                        <caption>Deposit Hisotory</caption>
                        <tbody>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            {/*next update expenser name
                            will be in dropdown list */}
                            <th>Amount</th>
                        </tr>
                        { Dlists ? <List Bool={scrt1 === Sc ? true : false} DltHandle={DltHandle2} lists={Dlists.data}/> : null}
                        <tr>
                            <th colSpan={2}>Total</th>
                            <th>{Dsum}</th>
                        </tr>
                        </tbody>
                        
                    </table>
                </div>  
                             
            </div>
        )
    
}