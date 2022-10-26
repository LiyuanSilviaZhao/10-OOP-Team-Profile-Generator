const inquirer = require("inquirer");
const fs = require('fs'); 
const generateTeam = require("./util/generateHtml")


const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const team =[];
function askQuestion() {
    console.log("Please build your team.");

    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeName',
            message: 'What is the team manager name?',
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the team manager's id?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the team manager's email?",
        },
        {
            type: 'input',
            name: 'officeNum',
            message: "What is the team manager's office number?",
        },
        {
            type: 'list',
            name: 'addMember',
            message: 'What type of team member would you like to add?',
            choices: ["Engineer", "Intern", "I don't want to add any more team members"]
        }
    ]).then(answers => {
        const {employeeName, id, email, officeNum} = answers; 
        const manager = new Manager (employeeName, id, email, officeNum);
        console.log(manager);
        team.push(manager);

        switch (answers.addMember) {
            case "Engineer":
                console.log("add Engineer!")
                addEngineer();
                break;

            case "Intern":
                console.log("add Intern!")
                addIntern();
                break;

            case "I don't want to add any more team members":
                console.log("I don't want to add any more team members")
                buildHtml();
                break;
        }
    })
}

function addEngineer() {
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: "What is the Engineer's name?",
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the Engineer's id?",
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the Engineer's email?",
    },
    {
        name: "github",
        message: "What is the Engineer's github?",
        type: "input"
    },
    {
        type: 'list',
        name: 'addMember',
        message: 'What type of team member would you like to add?',
        choices: ["Engineer", "Intern", "I don't want to add any more team members"]
    },
]).then(answers => {
    const {name,id,email,github} = answers;
    engineer = new Engineer(name,id,email,github);
    console.log(engineer);
    team.push(engineer);

    switch (answers.addMember) {
        case "Engineer":
            console.log("add Engineer!")
            addEngineer();
            break;

        case "Intern":
            console.log("add Intern!")
            addIntern();
            break;

        case "I don't want to add any more team members":
            console.log("I don't want to add any more team members")
            buildHtml();
            break;
    }
})
}

function addIntern() {
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: "What is the Intern's name?",
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the Intern's id?",
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the Intern's email?",
    },
    {
        name: "school",
        message: "What is the Intern's school?",
        type: "input"
    },
    {
        type: 'list',
        name: 'addMember',
        message: 'What type of team member would you like to add?',
        choices: ["Engineer", "Intern", "I don't want to add any more team members"]
    },
]).then(answers => {
        const {name,id,email,school} = answers;
        intern = new Intern(name,id,email,school);
        console.log(intern);
        team.push(intern);

    switch (answers.addMember) {
        case "Engineer":
            console.log("add Engineer!")
            addEngineer();
            break;

        case "Intern":
            console.log("add Intern!")
            addIntern();
            break;

        case "I don't want to add any more team members":
            console.log("I don't want to add any more team members")
            console.log("team array:");
            console.log(team);
            buildHtml();
            break;
    }
})
}

function buildHtml(){
    console.log("output team:")
    console.log(team);
    fs.writeFile("teamLog.html", generateTeam(team), (err) =>
        err ? console.log(err) : console.log('Success!')
    );
}

askQuestion();
