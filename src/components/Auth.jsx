import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import signinImage from '../assets/signup.jpg';
import { async } from 'q';
// import Earth from './Earth';
const cookies = new Cookies(); 

const initialState = {
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    avatarURL: '',
}


const Auth = () => {

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, phoneNumber, avatarURL} = form;

        const URL = 'https://tchat-sm.herokuapp.com/auth';

        const {data: { token, userId, hashedPassword, fullName}} = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignup){
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)

        document.querySelector('.auth__form-container_fields-content').classList.toggle('active')
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? '회원가입' : '로그인'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">이름</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="이름"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username"> 닉네임</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="닉네임"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">핸드폰번호</label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="핸드폰번호"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">아바타 URL</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="아바타 URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">비밀번호</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="비밀번호"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmpassword">비밀번호확인</label>
                                <input
                                    name="confirmpassword"
                                    type="password"
                                    placeholder="비밀번호확인"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "회원가입" : "로그인"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                                ? "이미 계정이 있으신가요??"
                                : "계정이 없으신가요?"
                            }
                            <span onClick={switchMode}>
                                {isSignup
                                    ? '로그인'
                                    : '회원가입'
                                }
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={require('../assets/signup.jpg')} alt="#" />
                {/* <Earth /> */}
            </div>
        </div>
    )
}

export default Auth