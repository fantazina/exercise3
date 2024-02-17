import React,{ useState } from 'react';
import styles  from '../css/WriteForm.module.css';
import axios from 'axios';

const WriteForm = ({onPage}) => {
    const[userDTO, setUserDTO] = useState({
        name : '',
        id : '',
        pwd : ''
    })

    const onInput = (e) => {
        const{ name, value } = e.target
        setUserDTO({
            ...userDTO,
            [name] : value
        })
    }

    const onWriteSubmit = () => {
        axios.post(`http://localhost:8080/write/write`, userDTO)
             .then(() => {
                alert('회원가입 완')
                onPage(1)
             })
    }

    const onReset = () => {
        setUserDTO('')
    }

    return (
        <div className={ styles.write_container }>
            <h3>회원가입</h3>

            <div className={ styles.name_div }>
                <p>이름</p>
                <input name='name' onChange={ onInput } type='text' value={ userDTO.name }/>
            </div>

            <div className={ styles.id_div }>
                <p>아이디</p>
                <input name='id' onChange={ onInput } type='text' value={ userDTO.id } />
            </div>

            <div className={ styles.pwd_div }> 
                <p>비밀번호</p>
                <input name='pwd' onChange={ onInput } type='password' value={ userDTO.pwd } />
            </div>

            <div className={ styles.btn_div }>
                <button onClick={ onWriteSubmit }>회원가입</button>
                <button className={ styles.reset } onClick={ onReset }>취소</button>
            </div>
        </div>
    );
};

export default WriteForm;