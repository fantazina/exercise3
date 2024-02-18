import React, { useEffect, useState } from 'react';
import Lstyles from '../css/WriteForm.module.css';
import axios from 'axios';

const LoginForm = () => {
    const[loginDTO, setLoginDTO] = useState({
        id : '',
        pwd : ''
    })

    useEffect(() => {
        axios.get(`http://localhost:8080/write/getUserDTO`)
    }, [])

    const onInput = (e) => {
        const {name, value} = e.target
        setLoginDTO({
            ...loginDTO,
            [name] : value
        })
    }

    const onReset = () => {
        setLoginDTO({
            id : '',
            pwd : ''
        })
    }

    return (
        <div className={ Lstyles.login_container }>
            <h3>로그인</h3>
            <div className={ Lstyles.id_div }>
                <p>아이디</p>
                <input onChange={ onInput } type='text' value={ loginDTO.id } />
            </div>

            <div className={ Lstyles.pwd_div }>
                <p>비밀번호</p>
                <input onChange={ onInput } type='password' value={ loginDTO.pwd } />
            </div>

            <div className={ Lstyles.btn_div }>
                <button>로그인</button>
                <button onClick={ onReset } className={ Lstyles.reset }>취소</button>
            </div>
        </div>
    );
};

export default LoginForm;