const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files like HTML, CSS, JS from a 'public' directory

// Load accounts data from JSON file or create an empty array
let accounts = [];
if (fs.existsSync('accounts.json')) {
    const data = fs.readFileSync('accounts.json');
    accounts = JSON.parse(data);
}

// Route for user signup
app.post('/signup', (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    // Check if username or email already exists
    const existingUser = accounts.find((account) => account.username === username || account.email === email);
    if (existingUser) {
        res.status(409).send('Username or email already exists');
        return;
    }

    // Create a new user
    const newUser = { username, email, password };
    accounts.push(newUser);
    fs.writeFileSync('accounts.json', JSON.stringify(accounts, null, 2));

    // Redirect to a success page after signup
    res.redirect('/signup-success.html');
});

// Route for user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = accounts.find((account) => account.username === username && account.password === password);

    if (user) {
        // Redirect to home.html after successful login
        res.redirect('/home.html');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
