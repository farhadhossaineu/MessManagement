import axios from 'axios';
import { useEffect, useState } from 'react';
import './home.css';

export default function Home(){
    ///CacCulating Meal
    const [lists,setLists] = useState()
    const [MealData,setMeals] = useState({
        totalMeal:0,
        farhad:0,
        mannan:0,
        arif:0
    });

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await axios.get('http://localhost:8800/meal');
            setLists(res)
        }
        fetchData();
    },[])
    
    if(lists){
        const List = lists.data;
         let sum = List.map((v)=>(parseFloat(v.farhad)+parseFloat(v.mannan)+parseFloat(v.arif)))
         let sm = List.map((v)=>(parseFloat(v.farhad)))
         let am = List.map((v)=>(parseFloat(v.arif)))
         let mm = List.map((v)=>(parseFloat(v.mannan)))
         
         var Sum = 0, farhadm=0, Mannanm = 0, Arifm = 0;
         for(let i = 0 ; i<sum.length; i++){
            Sum += sum[i];
         }
         for(let i = 0 ; i<am.length ; i++){
            Arifm += am[i]
            farhadm += sm[i]
            Mannanm += mm[i]
         }
    }
    useEffect(()=>{
        setMeals({
            totalMeal:Sum,
            arif:Arifm,
            farhad:farhadm,
            mannan:Mannanm
         })
     },[Sum,Arifm,farhadm,Mannanm])    

     //Deposit Calculation
     const [depositList, setDeopsitList] = useState();
     const [Deposite, SetDeposit] = useState({
        totalDeposite:0, arif:0,farhad:0,mannan:0
     })
     useEffect(()=>{
        const fetchData = async()=>{
            const res = await axios.get('http://localhost:8800/deposite');
            setDeopsitList(res)
        }
        fetchData();
    },[])
    if(depositList){
        const List = depositList.data;
         let sum = List.map((v)=>(parseFloat(v.amount)))
         let sm = List.map((v)=>(v.name==='farhad'? parseFloat(v.amount) : 0))
         let am = List.map((v)=>(v.name==='Arif'? parseFloat(v.amount) : 0))
         let mm = List.map((v)=>(v.name==='Mannan'? parseFloat(v.amount) : 0))
         
         var S = 0, Sm=0, Mm = 0, Am = 0;
         for(let i = 0 ; i<sum.length; i++){
            S+= sum[i];
         }
         for(let i = 0 ; i<am.length ; i++){
            Am += am[i]
            Sm += sm[i]
            Mm += mm[i]
         }
    }
    useEffect(()=>{
        SetDeposit({
            totalDeposite:S,
            arif:Am,
            farhad:Sm,
            mannan:Mm
         })
     },[S,Am,Sm,Mm])

     //Expense Calculation
     const [ExpenseList, setExpenseList] = useState();
     const [Expense, SetExpense] = useState({
        totalExpense:0
     })
     useEffect(()=>{
        const fetchData = async()=>{
            const res = await axios.get('http://localhost:8800/expense');
            setExpenseList(res)
        }
        fetchData();
    },[])
    if(ExpenseList){
        const List = ExpenseList.data;
         var SD=0
         let sum = List.map((v)=>(parseFloat(v.amount)))
         for(let i = 0 ; i<sum.length; i++){
            SD+= sum[i];
         }
    }
    useEffect(()=>{
        SetExpense({
            ...Expense,
            totalExpense:SD
         })
     },[SD])
    
     // Meal Rate
     const [mealRate,setMealRate] = useState()
     const calcul = MealData.totalMeal ? parseFloat(Expense.totalExpense / MealData.totalMeal).toFixed(2) : 0
     useEffect(()=>{
        setMealRate(calcul)
     },[calcul])


     //Personal Expense
     const [PersonalExpense, setPersonalExpense] = useState({
        farhad:0,mannan:0,arif:0,sc:0,ac:0,mc:0
     })
     //farhad 
     const sExp = (mealRate*MealData.farhad).toFixed(0);
     const mExp = (mealRate*MealData.mannan).toFixed(0);
     const aExp = (mealRate*MealData.arif).toFixed(0);
     const Sc = PersonalExpense.farhad - Deposite.farhad < 0  ? Deposite.farhad-PersonalExpense.farhad :  PersonalExpense.farhad - Deposite.farhad
     const Mc = PersonalExpense.mannan - Deposite.mannan <0 ? Deposite.mannan - PersonalExpense.mannan : PersonalExpense.mannan - Deposite.mannan
     const Ac = PersonalExpense.arif - Deposite.arif <0 ? Deposite.arif-PersonalExpense.arif : PersonalExpense.arif - Deposite.arif

     useEffect(()=>{
        setPersonalExpense({
            farhad:sExp,
            mannan:mExp,
            arif:aExp,
            sc:Sc,
            mc:Mc,
            ac:Ac
        })
     },[sExp,aExp,mExp,Sc,Mc,Ac])
        return(
            <div className="main">
                <div className="homeHeader">
                    <h3>Meal Rate: <span style={{marginLeft:'10px',color:'#9c5400'}}>{mealRate}</span></h3>
                    <h3>Total Meal: <span style={{marginLeft:'10px',color:'#9c5400'}}>{MealData.totalMeal}</span></h3>
                    <h3>Total Deposit: <span style={{marginLeft:'10px',color:'#9c5400'}}>{Deposite.totalDeposite}</span></h3>
                    <h3>Total Expense: <span style={{marginLeft:'10px',color:'#9c5400'}}>{Expense.totalExpense}</span></h3>
                </div>
                <table>
                    <caption>
                        <h3>Members Shortcut Information</h3>
                    </caption>
                    <tr>
                        <th>Name</th>
                        <th>Deposit</th>
                        <th>Expense</th>
                        <th>Total Consumed Meal</th>
                        <th>Comment</th>
                    </tr>
                    <tr key={Math.random()}>
                        <td>Farhad Hossain</td>
                        <td>{Deposite.farhad}</td>
                        <td>{PersonalExpense.farhad}</td>
                        <td>{MealData.farhad}</td>
                        <td>{PersonalExpense.farhad - Deposite.farhad > 0  ? <span>Have to Pay <b style={{color:'red'}}>{PersonalExpense.sc} </b>Taka</span> : <span>Will get  return <b>{PersonalExpense.sc}</b> Taka </span>}</td>
                    </tr>
                    <tr key={Math.random()}>
                        <td>Arifur Rahman</td>
                        <td>{Deposite.arif}</td>
                        <td>{PersonalExpense.arif}</td>
                        <td>{MealData.arif}</td>
                        <td>{PersonalExpense.arif - Deposite.arif > 0  ? <span>Have to Pay <b style={{color:'red'}}>{PersonalExpense.ac}</b> Taka</span> : <span>Will get return  <b>{PersonalExpense.ac}</b> Taka</span>}</td>
                    </tr>
                    <tr key={Math.random()}>
                        <td>Mannan Hossain</td>
                        <td>{Deposite.mannan}</td>
                        <td>{PersonalExpense.mannan}</td>
                        <td>{MealData.mannan}</td>
                        <td>{PersonalExpense.mannan - Deposite.mannan > 0  ? <span>Have to Pay <b style={{color:'red'}}>{PersonalExpense.mc}</b> Taka</span> : <span>Will get return <b>{PersonalExpense.mc}</b> Taka</span>}</td>
                    </tr>
                    {/* <MembersTable members={arr}/> */}
                </table>
            </div>
        )
}