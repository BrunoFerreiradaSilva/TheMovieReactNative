import * as SQLite from 'expo-sqlite'

function openConnection(){
    const database = SQLite.openDatabase('movie.db')
    return database
}

export const db = openConnection()