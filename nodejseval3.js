var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "Kindle_Book_Review"
});

var baseStyle = "style='font-family: Arial, sans-serif; text-align: center; margin-top: 20px;'";
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/login', function (req, res) {
    var rr = "<html>";
    rr += "<head><style>body { background-color: #f0f0f0; }</style></head>";
    rr += "<body " + baseStyle + ">";
    rr += "<h1 style='margin-top: 50px;'>Welcome to Kindle Book Review System</h1>";
    rr += "<form method='post' action='/next' " + baseStyle + ">";
    rr += "Username <input type='text' name='one' value=' ' required><br><br>";
    rr += "Password <input type='text' name='two' value=' ' required><br><br>";
    rr += "Are you a Reader or an Author?<br><br>";
    rr += "<input type='radio' name='role' value='reader'> Reader <br>";
    rr += "<input type='radio' name='role' value='author'> Author <br><br>";
    rr += "<input type='submit' value='Submit'>";
    rr += "</form>";
    rr += "</body>";
    res.send(rr);
});

app.post('/next', urlencodedParser, function (req, res) {
    var role = req.body.role;

    if (role === 'reader') {
        res.redirect('/insert');
    } else if (role === 'author') {
        res.redirect('/insert2');
    } else {
        res.status(400).send('Invalid role selected');
    }
});

app.get('/insert', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("<body " + baseStyle + ">");
    res.write("Give review");
    res.write("<form method='get' action='/reader' " + baseStyle + ">");
    res.write("<input type='submit' value='Yes'>");
    res.write("</form>");
    res.write("<form method='get' action='/display' " + baseStyle + ">");
    res.write("<input type='submit' value='View Records'>");
    res.write("</form>");
    res.write("</body");
    res.end();
});

app.get('/reader', function (req, res) {
    var rr = "<html>";
    rr += "<head><style>body { background-color: #f0f0f0; }</style></head>";
    rr += "<body " + baseStyle + ">";
    rr += "<form method='post' action='send' " + baseStyle + ">";
    rr += "Reader Name <input type='text' name='name' value=' '><br><br>";
    rr += "Book Title <input type='text' name='title' value=' '><br><br>";
    rr += "Author ID <input type='number' name='id' value=' '><br><br>";
    rr += "Publication <input type='text' name='pub' value=' '><br><br>";
    rr += "Genre <input type='text' name='genre' value=' '><br><br>";
    rr += "Rating <input type='number' name='rating' value=' '><br><br>";
    rr += "<input type='submit' name='t1' value='send '>";
    rr += "</form>";
    rr += "</body>";
    res.send(rr);
});

app.get('/insert2', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("Fetch books and reviews");
    res.write("<form method='get' action='/author' " + baseStyle + ">");
    res.write("<input type='submit' value='Yes'>");
    res.write("</form>");
    res.write("<form method='get' action='/add' " + baseStyle + ">");
    res.write("<input type='submit' value='Add book'>");
    res.write("</form>");
    res.end();
});

app.get('/author', function (req, res) {
    var rr = "<html>";
    rr += "<head><style>body { background-color: #f0f0f0; }</style></head>";
    rr += "<body " + baseStyle + ">";
    rr += "<form method='get' action='/display1' " + baseStyle + ">";
    rr += "Author ID <input type='number' name='id' value=' '><br><br>";
    rr += "<input type='submit' name='t1' value='fetch '>";
    rr += "</form>";
    rr += "</body>";
    res.send(rr);
});

app.get('/add', function (req, res) {
    var rr = "<html>";
    rr += "<head><style>body { background-color: #f0f0f0; }</style></head>";
    rr += "<body " + baseStyle + ">";
    rr += "<form method='post' action='send2' " + baseStyle + ">";
    rr += "Book Title <input type='text' name='title' value=' '><br><br>";
    rr += "Author ID <input type='number' name='id' value=' '><br><br>";
    rr += "Book ID <input type='number' name='id1' value=' '><br><br>";
    rr += "<input type='submit' name='t1' value='send '>";
    rr += "</form>";
    rr += "</body>";
    res.send(rr);
});

app.post('/send', urlencodedParser, function (req, res) {
    var reply = '';
    r_name = req.body.name;
    title = req.body.title;
    id = req.body.id;
    pub = req.body.pub;
    genre = req.body.genre;
    rating = req.body.rating;
    var sql = "INSERT INTO reviews (reader_name, book_title, auth_id, publication, genre, rating) VALUES (?, ?, ?, ?, ?, ?)";
    var values = [r_name, title, id, pub, genre, rating];
    con.query(sql, values, function (err, result) {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("Record inserted successfully. Do you want to enter another record?");
        res.write("<form method='get' action='/insert' " + baseStyle + ">");
        res.write("<input type='submit' value='Yes'>");
        res.write("</form>");
        res.write("<form method='get' action='/display' " + baseStyle + ">");
        res.write("<input type='submit' value='View Records'>");
        res.write("</form>");
        res.write("<form method='get' action='/login' " + baseStyle + ">");
        res.write("<input type='submit' value='Go to login page'>");
        res.write("</form>");
        res.end();
    });
});

app.post('/send2', urlencodedParser, function (req, res) {
    var reply = '';
    title = req.body.title;
    id = req.body.id;
    id1 = req.body.id1;

    var sql = "INSERT INTO BOOK (auth_id, book_id, title) VALUES (?, ?, ?)";
    var values = [id,id1,title];
    con.query(sql, values, function (err, result) {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("Record inserted successfully");
        res.end();
    });
}).listen(9001);

app.get('/display', function (req, res) {
    con.query("SELECT * FROM reviews ORDER BY rating", function (err, result, fields) {
        if (err) throw err;

        var displayHtml = "<html><head></head><body><h2>Book Reviews</h2><ul>";

        result.forEach(function (row) {
            displayHtml += "<li>Review ID: " + row.id + ", Reader Name: " + row.reader_name + ", Book title: " + row.book_title + ", Author ID " + row.auth_id + ", Publication: " + row.publication + ", Genre: " + row.genre + ", Rating: " + row.rating + "</li>";
        });

        displayHtml += "</ul></body></html>";
        res.send(displayHtml);
    });
});

app.get('/display1', function (req, res) {
    var authorId = req.query.id;
    var sql = "SELECT * FROM reviews WHERE auth_id = ?";
    
    con.query(sql, [authorId], function (err, result, fields) {
        if (err) throw err;

        var displayHtml = "<html><head></head><body><h2>Book Reviews</h2><ul>";

        result.forEach(function (row) {
            displayHtml += "<li>Review ID: " + row.id + ", Reader Name: " + row.reader_name + ", Book title: " + row.book_title + ", Author ID " + row.auth_id + ", Publication: " + row.publication + ", Genre: " + row.genre + ", Rating: " + row.rating + "</li>";
        });

        displayHtml += "</ul></body></html>";
        res.send(displayHtml);
    });
});
