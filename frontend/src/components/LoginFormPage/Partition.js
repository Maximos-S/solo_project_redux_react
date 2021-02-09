import React from 'react';
import {AiFillLinkedin, AiFillGithub} from 'react-icons/ai'

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
                    <p>was created by full-stack developer <a href="https://maximos-s.github.io" target="_blank" rel="noopener noreferrer">Maximos Salzman</a></p>
                    <div>
                        <a href="https://github.com/Maximos-S" target="_blank" rel="noopener noreferrer"><AiFillGithub /></a>
                        <a href="https://www.linkedin.com/in/maximos-salzman-5a7050171/" target="_blank" rel="noopener noreferrer"><AiFillLinkedin /></a>
                    </div>
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