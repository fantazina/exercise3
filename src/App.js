import React,{ useState } from 'react';
import LoginForm from './conponents/LoginForm';
import WriteForm from './conponents/WriteForm';

const App = () => {
  const[page, setPage] = useState(0)

  const onPage = (num) => {
    setPage(num)
  }

  return (
    <div>
      { page === 0 && <WriteForm onPage={ onPage } /> }
      { page === 1 && <LoginForm onPage={ onPage } /> }
    </div>
  );
};

export default App;