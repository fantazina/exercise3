import React, { useState } from 'react';
import Lstyles from '../css/Form.module.css';
import axios from 'axios';

const LoginForm = ({onFormPage}) => {
    const[userDTO, setUserDTO] = useState({
        id : '',
        pwd : ''
    })

    const[idError, setIdError] = useState('');
    const[pwdError, setPwdError] = useState('');

    const onLoginSubmit = (e) => {
        var sw = 1

        if(!userDTO.id){
            setIdError('아이디를 입력하세요.')
            sw = 0
        }
        else {
            setIdError('')
        }
        if(!userDTO.pwd){
            setPwdError('비밀번호를 입력하세요.')
            sw = 0
        }
        else {
            setPwdError('')
        }

        if(sw === 1) {
            axios.post(`http://localhost:8080/user/login`, {
                params : {
                    id : userDTO.id,
                    pwd : userDTO.pwd
                }
            }).then(() => {
                alert('로그인 완료')
                onFormPage(2)

            }).catch(error => alert('error'))                
        }
    }

    const onInput = (e) => {
        const {name, value} = e.target
        setUserDTO({
            ...userDTO,
            [name] : value
        })
    }

    const onReset = (e) => {
        setUserDTO({
            id : '',
            pwd : ''
        })
    }

    return (
        <div className={ Lstyles.login_container }>
            <h3>로그인</h3>
            <div className={ Lstyles.id_div }>
                <p>Id</p>
                <input onChange={ onInput } name='id' type='text' value={ userDTO.id } />
            </div>
            <div className={ Lstyles.check } >{idError}</div>

            <div className={ Lstyles.pwd_div }>
                <p>Pwd</p>
                <input onChange={ onInput } name='pwd' type='password' value={ userDTO.pwd } />
            </div>
            <div className={ Lstyles.check } >{pwdError}</div>

            <div className={ Lstyles.btn_div }>
                <button onClick={ onLoginSubmit }>로그인</button>
                <button onClick={ onReset } className={ Lstyles.reset }>취소</button>
            </div>
        </div>
    );
};

export default LoginForm;