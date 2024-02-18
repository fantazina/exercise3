import React,{ useState } from 'react';
import LoginForm from './conponents/LoginForm';
import WriteForm from './conponents/WriteForm';

const App = () => {
  const[formPage, setFormPage] = useState(0)

  const onFormPage = (num) => {
    setFormPage(num)
  }

  return (
    <div>
      { formPage === 0 && <WriteForm onFormPage={ onFormPage } /> }
      { formPage === 1 && <LoginForm onFormPage={ onFormPage } /> }
    </div>
  );
};

export default App;