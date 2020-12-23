import React, { useState } from 'react';

export default function GoalInputs() {

    //state setup
    const [inputs, setInputs] = useState({
        income: 0,
        expense: 0,
        begSaving: 0,
        endSaving: 0,
        budget: 0,
        date: ""
    });

    const [total, setTotal] = useState();
    const [days, setDays] = useState();
    const [perDay, setperDay] = useState();
    const [resultsDescription, setResultsDesc] = useState();
    const [resultsAmount, setResultsAmt] = useState();

    
    //handlers
    function handleChange(event){
        const {name, value} = event.target;
        setInputs((prevInputs) => {
            return {...prevInputs,[name]: value}
        });
    }

    function handleClick() {
        var amt =  parseInt(inputs.budget) + 
        parseInt(inputs.endSaving) - 
        parseInt(inputs.begSaving) 

        var date = new Date().toISOString().slice(0,10);
        var dateOne = new Date(inputs.date);
        var dateTwo = new Date(date);
        var timeDiff = dateOne.getTime() - dateTwo.getTime();
        var dayDiff = timeDiff / (1000 * 3600 * 24);
        var monthsLeft = parseFloat(dayDiff/30).toFixed(1);
        var perMonthsLeft = Math.round(amt/monthsLeft);

        if(perMonthsLeft > amt){
            perMonthsLeft = amt;
        }


        if(!dayDiff){
            monthsLeft = "Please enter a valid date";
            perMonthsLeft = 0;
        }

        if (amt < 0){
            amt = "Congrats, you already have enough saved!";
            monthsLeft = "";
            perMonthsLeft = 0;
        }

        //savings analysis
        if(perMonthsLeft !== 0){
            if(parseInt(inputs.income - inputs.expense) < perMonthsLeft){
                setResultsDesc("The amount of money you need to save to reach your goal exceeds the monthly surplus you currently earn. In order to make this goal attainable, we suggest saving for a longer period of time.")
            } else if(perMonthsLeft/parseInt(inputs.income-inputs.expense) > 0.5){
                setResultsDesc("Although this goal is achievable, it may be difficult to save without making some sacrifices since the amount you need to save per month is over half of your monthly surplus.")
                setResultsAmt("Monthly Surplus After Saving: " + parseInt(inputs.income-inputs.expense - perMonthsLeft).toLocaleString())
            } else{
                setResultsDesc("If you commit to saving this much a month, this goal is very acheivable.")
                setResultsAmt("Monthly Surplus After Saving: " + parseInt(inputs.income-inputs.expense - perMonthsLeft).toLocaleString())
            }
            setperDay("Savings per Months Left: " + perMonthsLeft.toLocaleString());
        }
        
        setDays("Months Left: " + monthsLeft.toLocaleString());
        setTotal("Total Saving Amount: " + amt.toLocaleString());
        
    }

    return (
        <div className="goal">
            <h1>Calculate Your Saving Amount</h1>
        <div className="flex-container">
            <div className="flex-child">
                <div className="inputs">
                    <label htmlFor="income">What is your cash income per month?</label>
                    <input name="income" onChange={handleChange} id="income" type="range" min="0" max="10000" step="100" className="slider" value={inputs.income} />
                    <label htmlFor="expense">What are your necesssary expenses per month?</label>
                    <input name="expense" onChange={handleChange} id="expense" type="range" min="0" max="10000" step="100" className="slider" value={inputs.expense}/>
                    <label htmlFor="beg-savings">How much do you already have saved up?</label>
                    <input name="begSaving" onChange={handleChange} id="beg-savings" type="range" min="0" max="100000" step="100" className="slider" value={inputs.begSaving}/>
                    <label htmlFor="end-savings">How much savings do you want left over?</label>
                    <input name="endSaving" onChange={handleChange} id="end-savings" type="range" min="0" max="100000" step="100" className="slider" value={inputs.endSaving}/>
                    <label htmlFor="price">What is the estimated budget for your goal?</label>
                    <input name="budget" onChange={handleChange} id="price" type="range" min="0" max="100000" step="100" className="slider" value={inputs.budget}/>
                    <label htmlFor="date">When do you want to purchase your item?</label>
                    <input name="date" min={new Date().toISOString().slice(0,10)} onChange={handleChange} id="date" type="date" className="date" value={inputs.date}/>
                </div>
                
            </div>
            <div className="flex-child">
                <div className="outputs">
                    <h5>Beginning Savings: <span>{parseInt(inputs.begSaving).toLocaleString()}</span></h5>
                    <h5>Ending Savings: <span>{parseInt(inputs.endSaving).toLocaleString()}</span></h5>
                    <h5>Price of Goal: <span>{parseInt(inputs.budget).toLocaleString()}</span></h5>
                    <br/>
                    <h5>Income: <span>{parseInt(inputs.income).toLocaleString()}</span></h5>
                    <h5>Expenses: <span>{parseInt(inputs.expense).toLocaleString()}</span></h5>
                    <h5>Monthly Surplus (Defecit) <span>{parseInt(inputs.income - inputs.expense).toLocaleString()}</span></h5>
                    <br/>
                    <button onClick={handleClick}>Calculate Saving Goal</button>
                    <h5>{total}</h5>
                    <h5>{days}</h5>
                    <h5>{perDay}</h5>
                </div>
            </div>
            
        </div>
        <div className="results">
             <h5 className="output-result">{resultsDescription}</h5>
            <h5 className="output-result">{resultsAmount}</h5>
        </div>
        </div>
    )
}
