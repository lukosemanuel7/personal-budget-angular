// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 50
        },
        {
            title: 'Rent',
            budget: 350
        },
        {
            title: 'Groceries',
            budget: 70
        },
        {
            title: 'Insurance',
            budget: 150
        },
        {
            title: 'Internet',
            budget: 40
        },
        {
            title: 'Loan',
            budget: 500
        },
        {
            title: 'Misc',
            budget: 50
        }
    ]
};


app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});