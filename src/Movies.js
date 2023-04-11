import { db } from "./SQLite";

export function criaTabela() {
    db.transaction((transaction) => {
      transaction.executeSql("CREATE TABLE IF NOT EXISTS " + 
        "Movies " +
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, idMovie INTEGER, poster TEXT);")
    })
  }

export async function saveMovie(movie) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("INSERT INTO Movies (idMovie, poster) VALUES (?,?);", [movie.idMovie,movie.poster], ()=>{
                resolve("Movie save success");

            })
        })
    })
}

export async function getMovie(idMovie) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("SELECT * FROM Movies WHERE idMovie = ?;", [idMovie], (transaction,result)=>{
                resolve(result.rows._array);
            })
        })
    })
}

export async function removeMovie(id) {
    return new Promise((resolve) => {
      db.transaction((transaction) => {
        transaction.executeSql("DELETE FROM Movies WHERE id = ?;", [id], () => {
          resolve("Movie remove success")
        })
      })
    })
  }

export async function getAllMovies() {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                "SELECT * FROM Movies ",
                []
                ,
                (transaction, result) => {
                    resolve(result.rows._array)
                }
            )
        })
    })
}