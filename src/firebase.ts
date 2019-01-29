import firebase from 'firebase'
import { firebaseConfig } from './firebaseConfig'

// Initialize Firebase on the App
firebase.initializeApp(firebaseConfig)

// Global variables
export const database = firebase.database()