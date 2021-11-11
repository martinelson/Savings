import React from 'react';
import Nav from './components/Nav';
import GoalInputs from './components/GoalInputs';
import Loan from './components/Loan';
import Footer from './components/Footer';

export default function Home() {
    return (
        <div>
            <Nav/>
            <GoalInputs/>
            <Loan/>
            <Footer/>
        </div>
    )
}
