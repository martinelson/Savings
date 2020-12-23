import React from 'react';
import GoalInputs from './components/GoalInputs';
import Loan from './components/Loan';
import Footer from './components/Footer';

export default function Home() {
    return (
        <div>
            <GoalInputs/>
            <Loan/>
            <Footer/>
        </div>
    )
}
