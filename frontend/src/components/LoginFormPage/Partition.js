import React from 'react';
import './Partition.css'

const Partition = () => {

    const revealSignup = () => {
        const loginPartition = document.getElementById("loginPartition")
        const signupPartition = document.getElementById("signupPartition")
        const loginButton = document.getElementById("loginButton")
        const signupButton = document.getElementById("signupButton")
        loginButton.style.visibility = "visible"
        signupButton.style.visibility = "hidden"
        loginPartition.style.height = "100vh"
        signupPartition.style.height= "0vh"
    }
    const revealLogin = () => {
        const loginPartition = document.getElementById("loginPartition")
        const signupPartition = document.getElementById("signupPartition")
        const loginButton = document.getElementById("loginButton")
        const signupButton = document.getElementById("signupButton")
        loginButton.style.visibility = "hidden"
        signupButton.style.visibility = "visible"
        loginPartition.style.height = "0vh"
        signupPartition.style.height= "100vh"
    }

    return (
        <>
            <div id="loginPartition">
                <div  className="aboutLoginParagraph">
                    <div class="aboutLogo"></div>
                    <p>was created by Maximos Salzman.</p>
                </div>
                <div className="loginIllustration"></div>
            </div>
            <div id="signupPartition">
                <div id="signupIllustration"></div>
                <div  className="aboutSignUpParagraph">
                </div>
            </div>
        </>
    );
};


export default Partition;