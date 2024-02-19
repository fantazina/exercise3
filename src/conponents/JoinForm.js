import React,{ useState } from 'react';
import styles  from '../css/Form.module.css';
import axios from 'axios';

const JoinForm = ({onFormPage}) => {
    const[userDTO, setUserDTO] = useState({
        name : '',
        id : '',
        pwd : '',
        pwd_re : ''
    })

    // const[joinError, setJoinError] = useState(true)
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

        if(name === 'id') { // 아이디가 빈값이 아닐 시 중복체크 하기
           onIsExistId(value) // valuer값 보내기
        }
        if(name === 'name') {
            setNameError('')
        }
        if(name === 'pwd') {
            setPwdError('')
        }
        if(name === 'pwd_re') {
            setPwd_reError('')
        }
    }

    //아이디 중복체크
    const onIsExistId = (id) => { // 매개변수로 id값을 받어
        axios.get(`http://localhost:8080/user/isExistId/${id}`)
             .then(res => {
                if(res.data === 'non_exist') {
                    setIdError('');
                    return false

                } else {
                    setIdError('이미 사용 중인 아이디');
                    return true
                }
            })
    }

    const onJoinSubmit = (e) => {
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

        if(sw === 1) {
            // 아이디 중복 검사
            axios.get(`http://localhost:8080/user/isExistId/${userDTO.id}`)
                .then(res => {
                    if (res.data === 'non_exist') {

                        // 중복이 없으면 회원가입 요청
                        axios.post(`http://localhost:8080/user/write`, userDTO)
                            .then(() => {
                                alert('회원가입을 축하합니다.')
                                onFormPage(1)

                            })

                    } else {
                        alert('회원가입 실패!..')
                        setIdError('사용 불가능')
                    }
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
                <input name='name' onChange={ onInput } type='text' value={ userDTO.name } />
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
                <button onClick={ onJoinSubmit }>회원가입</button>
                <button className={ styles.reset } onClick={ onReset }>취소</button>
            </div>
        </div>
    );
};

export default JoinForm;