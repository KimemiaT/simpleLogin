import React, { useState } from 'react';
import Login from './Login';
import Todo from './Todo';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return <div>{isLoggedIn ? <Todo /> : <Login onLogin={setIsLoggedIn} />}</div>;
}

export default App;
