import React,{ useState } from 'react';
import styles  from '../css/WriteForm.module.css';
import axios from 'axios';

const WriteForm = ({onFormPage}) => {
    const[userDTO, setUserDTO] = useState({
        name : '',
        id : '',
        pwd : '',
        pwd_re : ''
    })

    const[nameError, setNameError] = useState('')
    const[idError, setIdError] = useState('')
    const[pwdError, setPwdError] = useState('')
    const[pwd_reError, setPwd_reError] = useState('')

    const onInput = (e) => {
        const{ name, value } = e.target
        setUserDTO({
            ...userDTO,
            [name] : value
        })
    }

    //아이디 중복체크
    const onIsExistId = () => {
        axios.get(`https://localhost:8080/user/isExistId?id=${ userDTO.id }`)
             .then(res => {
              setIdError(res.data === 'non_exist' ? '사용 가능' : '사용 불가능')
            })
             .catch(error => console.log(error))
    }

    const onWriteSubmit = (e) => {
        e.preventDefault()

        var sw = 1

        if(!userDTO.name) {
            setNameError('이름을 입력하세요.')
            sw = 0 
        } else {
            setNameError('')
        }
        if(!userDTO.id) {
            setIdError('아이디를 입력하세요.')
            sw = 0
        } else {
            setIdError('')
        }
        if(!userDTO.pwd) {
            setPwdError('비밀번호를 입력하세요.')
            sw = 0
        } else {
            setPwdError('')
        }
        if(!userDTO.pwd_re) {
            setPwd_reError('비밀번호를 다시 입력하세요.')
            sw = 0
        } else {
            setPwd_reError('')
        }

        if(sw === 1){
            axios.post(`https://localhost8080/user/write`, null, {
                params : {
                    name : userDTO.name, // name으로 가능,
                    id : userDTO.id,
                    pwd : userDTO.pwd,
                }
            }).then(
                alert('회원가입을 축하합니다.')
                )
                .then(
                onFormPage(1)
                
                )
            .catch(error => {
                alert('회원가입에 실패하였습니다.')
            })
          }
    }

    const onReset = () => {
        setUserDTO({
            name : '',
            id : '',
            pwd :'',
            pwd_re :''
        })
    }

    return (
        <div className={ styles.write_container }>
            <h3>회원가입</h3>

            <div className={ styles.name_div }>
                <p>이름</p>
                <input name='name' onChange={ onInput } type='text' value={ userDTO.name }/>
            </div>
            <div className={styles.check}>{nameError}</div>

            <div className={ styles.id_div }>
                <p>Id</p>
                <input name='id' onChange={ onInput } type='text' value={ userDTO.id } />
            </div>
            <div className={styles.check}>{idError}</div>

            <div className={ styles.pwd_div }> 
                <p>Pwd</p>
                <input name='pwd' onChange={ onInput } type='password' value={ userDTO.pwd } />
            </div>
            <div className={styles.check}>{pwdError}</div>

            <div className={ styles.pwdre_div }> 
                <p>Pwd 확인</p>
                <input name='pwd_re' onChange={ onInput } type='password' value={ userDTO.pwd_re } />
            </div>
            <div className={styles.check}>{pwd_reError}</div>

            <div className={ styles.btn_div }>
                <button onClick={ onWriteSubmit }>회원가입</button>
                <button className={ styles.reset } onClick={ onReset }>취소</button>
            </div>
        </div>
    );
};

export default WriteForm;