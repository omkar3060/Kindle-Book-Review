var mysql = require('mysql');
var con = mysql.createConnection({
    host: "127.0.0.1",
    user:"root",
    password:"",
    database:"Kindle_Book_Review"
});


con.connect(function(err)
{
    if (err) throw err;
    console.log("Connected!");
    var sql=`CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        reader_name VARCHAR(255),
        book_title VARCHAR(255),
        auth_id INT,
        publication VARCHAR(255),
        genre VARCHAR(255),
        rating INT CHECK (rating >= 1 AND rating <= 10)
    );`
    var sql1=`CREATE TABLE IF NOT EXISTS BOOK (auth_id INT,
    book_id INT, title VARCHAR(255))`
    con.query(sql,
    function(err,result)
    {
       if (err) throw err;
       console.log("Table created");
});
con.query(sql1,
    function(err,result)
    {
       if (err) throw err;
       console.log("Table created");
});
});