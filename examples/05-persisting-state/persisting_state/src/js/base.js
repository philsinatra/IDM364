import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyCRpb-zieCbX6RrOVgMm9m2VtktZastEzg",
	authDomain: "idm-persisting-state-master.firebaseapp.com",
	databaseURL: "https://idm-persisting-state-master.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export {
	firebaseApp
};
export default base;