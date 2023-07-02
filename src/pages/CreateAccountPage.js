import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confrimPassword, setConfrimPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const createAccount = async() => {
        try{
            if (password !== confrimPassword){
                setError('Password and confrim password not matching');
                return;
            }

            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError(e.message);
        }
    }

   

    return (
        <>
         <h1>account create</h1>
         {error && <p>{error}</p>}
         <input 
         placeholder="email"
         value={email}
         onChange={e => setEmail(e.target.value)}/>
         <input type="password"
         placeholder="password"
         value={password}
         onChange={e => setPassword(e.target.value)}/>
           <input type="password"
         placeholder="Re-enter password"
         value={confrimPassword}
         onChange={e => setConfrimPassword(e.target.value)}/>
         <button onClick={createAccount}>create account</button>
         <Link to="/login">have account</Link>
        </>
       
    );
}

export default CreateAccountPage;