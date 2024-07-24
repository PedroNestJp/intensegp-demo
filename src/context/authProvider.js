import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithRedirect, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  signInWithPopup 
} from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const googleProvider = new GoogleAuthProvider();

  const loginWithPopup = async (name, email, password, phone, address, cpf) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userData = {
        name,
        email,
        password,
        phone,
        address,
        cpf,
      };
      await setDoc(doc(db, 'users', user.uid), userData);
      setUser(user);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (email, password, phone, address, cpf) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const userData = {
        email,
        password,
        // phone,
        // address,
        // cpf,
      };
      await setDoc(doc(db, 'users', user.uid), userData);
      setUser(user);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      setUser(user);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const loginWithRedirect = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const value = {
    user,
    signup,
    login,
    loginWithRedirect,
    loginWithPopup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;