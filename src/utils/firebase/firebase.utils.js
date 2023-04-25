import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCxGXvZUNGbcJoqLxI9aYSVPucadKW10ws",
  authDomain: "liryqal.firebaseapp.com",
  projectId: "liryqal",
  storageBucket: "liryqal.appspot.com",
  messagingSenderId: "141986049795",
  appId: "1:141986049795:web:97f876f2d8e1bdcb244336"
};


const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

 if (!userSnapshot.exists()) {
 	const { displayName, email } = userAuth;
 	const createdAt = new Date();
 	try {
 		await setDoc(userDocRef, {
 			displayName,
 			email,
 			createdAt,
 			...additionalInformation,
 		});
 	}
 	catch (error) {
 	console.log('Error creating the user', error.message);
 	}
 }

 return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
}
