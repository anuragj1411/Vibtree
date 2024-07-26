--------TECH STACK --------

Front-End 	- HTML, CSS, Javascript (Vite JS, Vanilla JS)
Backend 	- C# (.NET Core 8)
Database 	- MySQL

--------SETTING UP THE DATABASE --------

RUN FOLLOWING SQL SCRIPTS IN GIVEN ORDER TO SETUP DATABASE

DROP SCHEMA [IF EXISTS] vibtree;

CREATE DATABASE Vibtree;

CREATE TABLE `vibtree`.`mstUser` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NULL,
  `Phone` VARCHAR(15) NULL,
  `DateOfBirth` VARCHAR(15) NULL,
  `EMail` VARCHAR(100) NULL,
  `Password` VARCHAR(100) NOT NULL,
  `IsActive` TINYINT NULL,
  PRIMARY KEY (`UserID`));  

--------START THE UI --------

Navigate to UI directory and run following command
npm run dev

-------- CONFIGURE DATABASE CREDENTIALS IN BACKEND --------

Navigate to appsetting.json file in backend application
Locate line line no. 9 and replace User and Password parameters with your actual MySQL Workbench credentials    
Eg. 
"WebApiDatabase": "Server=localhost;Database=vibtree;User=root;Password=root;"


-------- START the Backend --------

go to folder and run following command
dotnet build
dotnet run 

OR

open the .sln file using Visual Studio and 
run the application using green button in Top nav bar