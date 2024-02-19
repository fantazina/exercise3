import React,{ useState } from 'react';
import JoinForm from './conponents/JoinForm';
import LoginForm from './conponents/LoginForm';
import WriteForm from './conponents/WriteForm';

const App = () => {
  const[formPage, setFormPage] = useState(0)

  const onFormPage = (num) => {
    setFormPage(num)
  }

  return (
    <div>
      { formPage === 0 && <JoinForm onFormPage={ onFormPage } /> }
      { formPage === 1 && <LoginForm onFormPage={ onFormPage } /> }
      { formPage === 2 && <WriteForm onFormPage={ onFormPage } /> }
    </div>
  );
};

export default App;