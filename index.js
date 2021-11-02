#!/usr/bin/env node

//import fetch from 'node-fetch';
import axios from 'axios';
import countries from 'country-list';
import ora from 'ora';
import chalk from 'chalk';


var myArgs = process.argv.slice(2); //parse arguments from the terminal by skiping node default arguments (2)
if (myArgs.length !== 0){
    
    
    const countryHolidates = (countryName)=>{
        
        const d = new Date();
        let year = d.getFullYear();
        
        let countryCode = countries.getCode(`${countryName}`)
        
        if (countryCode != undefined){
            const spinner = ora(`Loading ${chalk.red('Loading...')}`).start();

            axios.get(`https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`)
            .then(function (response) {
                let myArr = response.data
                myArr.forEach(el => {
                    console.log()
                    console.log("------------------------------------")
                    console.log(`${chalk.yellow("Date :")} ${el.date}\n${chalk.yellow("Name :")} ${el.name}\n${chalk.yellow("Local name :")} ${el.localName}`);
                    
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            /*.then(function () {
                // always executed
            });*/
            spinner.succeed("End of process successfull")
            
            console.log()
            console.log(chalk.greenBright("Country : " + myArgs[0]))
        
        }else {
            console.log()
            console.error(chalk.red("Error!\nYou have entred a wrong country name"));
            console.log()
        
        }
    
    }
    countryHolidates(myArgs[0])

}
else{
    
    console.log(chalk.red(`ERROR!\nYou did not enter a country name`))
    
}

