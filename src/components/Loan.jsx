import React, { useState } from 'react'

export default function Loan() {
    //state set-up
    const [amounts, setAmounts] = useState({
        price: 0,
        downpmt: 0,
        interest: 0,
        loan: 0
    });

    const [results, setResults] = useState({
        monthlyPaymentTitle: "",
        monthlyPayment: "",
        totalLoanTitle:"",
        totalLoan: "",
        totalCostTitle: "",
        totalCost: "",
        totalInterestTitle: "",
        totalInterest: "",
        class: "hide"
    });

    //handlers
    //handling slider
    function handleInput(e){
        const {name, value} = e.target;
        setAmounts((prevInputs) =>{
            return {...prevInputs, [name]: value}
        });
    }
    //handling interest payment calc
    function handleCalc(){
        const monthlyPaymentTitle = "E. Monthly Payment";
        const totalLoanTitle = "F. Total Loan Payment";
        const totalCostTitle = "G. Total Cost";
        const totalInterestTitle = "H. Total Interest Paid";
        if(parseInt(amounts.interest) === 0 | parseInt(amounts.loan) === 0){
            console.log("true")
            setResults((prevCalcs) =>{
                return {...prevCalcs, 
                    monthlyPaymentTitle: monthlyPaymentTitle,
                    totalLoanTitle: totalLoanTitle,
                    totalCostTitle: totalCostTitle,
                    totalInterestTitle: totalInterestTitle,
                    class: "hide"
                    }
            })
        } else{
            var cost = parseInt(amounts.price)
            var downpayment = parseInt(amounts.downpmt);
            var loanAmt = parseInt(amounts.price) - parseInt(amounts.downpmt);
            var interest = parseFloat(amounts.interest)/100;
            var monthLoan = parseInt(amounts.loan)*12;
            var annuityFactor = (1+(interest/12))**monthLoan;
            var monthlyPayment = parseFloat((loanAmt * (interest/12) * annuityFactor)/(annuityFactor - 1)).toFixed(2);
            var totalLoan = parseFloat(monthlyPayment * monthLoan).toFixed(2);
            var totalCost = parseFloat(downpayment + parseInt(totalLoan)).toFixed(2);
            var totalInterest = parseFloat(totalCost - cost).toFixed(2);
    
            setResults((prevCalcs) => {
                return{...prevCalcs,
                    monthlyPaymentTitle: monthlyPaymentTitle,
                    monthlyPayment: monthlyPayment,
                    totalLoanTitle: totalLoanTitle,
                    totalLoan: totalLoan,
                    totalCostTitle: totalCostTitle,
                    totalCost: totalCost,
                    totalInterestTitle: totalInterestTitle,
                    totalInterest: totalInterest,
                    class: "show"
                }
            });
        }
    }




    return (
        <div className="loan-pmt-container">
            <h1>Calculate Loan Payments</h1>
            <table>
                <tbody>
                <tr>
                    <td>
                        <h5 className="category">A. Price of Item</h5>
                    </td>
                    <td>
                        <input onChange={handleInput} name="price" type="range" min="0" max="1000000" step="10000" className="slider" value={amounts.price} />
                        <p>{parseInt(amounts.price).toLocaleString()}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h5 className="category">B. Downpayment Amount</h5>
                    </td>
                    <td>
                        <input onChange={handleInput} name="downpmt" type="range" min="0" max="200000" step="10000" className="slider" value={amounts.downpmt} />
                        <p>{parseInt(amounts.downpmt).toLocaleString()}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h5 className="category">C. Interest Rate</h5>
                    </td>
                    <td>
                        <input onChange={handleInput} name="interest" type="range" min="0" max="20" step="0.1" className="slider" value={amounts.interest}/>
                        <p>{amounts.interest + "%"}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h5 className="category">D. Length of Loan/Mortgage in Years</h5>
                    </td>
                    <td>
                        <input onChange={handleInput} name="loan" type="range" min="0" max="120" step="1" className="slider" value={amounts.loan}/>
                        <p>{amounts.loan}</p>
                    </td>
                </tr>
                <tr>
                    <td>

                    </td>
                    <td>
                    <button className="loan-btn" onClick={handleCalc}>Calculate Loan Amount</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h5 className="category">{results.monthlyPaymentTitle}</h5>
                    </td>
                    <td>
                        <p className={`${results.class}`}>{parseInt(results.monthlyPayment).toLocaleString()}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h5 className="category">{results.totalLoanTitle}</h5>
                    </td>
                    <td>
                        <p className={`${results.class}`}>{parseInt(results.totalLoan).toLocaleString()}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h5 className="category">{results.totalCostTitle}</h5>
                    </td>
                    <td>
                        <p className={`${results.class}`}>{parseInt(results.totalCost).toLocaleString()}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h5 className="category">{results.totalInterestTitle}</h5>
                    </td>
                    <td>
                        <p className={`${results.class}`}>{parseInt(results.totalInterest).toLocaleString()}</p>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
