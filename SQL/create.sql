DROP DATABASE IF EXISTS baseballstanding;

CREATE DATABASE baseballstanding;

USE baseballstanding;

CREATE TABLE User (
	Id int PRIMARY KEY AUTO_INCREMENT,
	Username varchar(20) NOT NULL UNIQUE,
	Password varchar(70) NOT NULL,
    Salt varchar(30) NOT NULL,
	Firstname varchar(20) NOT NULL,
	Lastname varchar(20) NOT NULL,
	Phone varchar(13) NOT NULL,
	Email varchar(75) NOT NULL,
    Admin bit 
);

CREATE TABLE League(
	Id int PRIMARY KEY AUTO_INCREMENT,
    Name varchar(20) NOT NULL,
    BirthdayBefore date NOT NULL,
    Year int NOT NULL,
    ManagerId int NOT NULL,
    FOREIGN KEY (ManagerId) REFERENCES User(Id)
);

CREATE TABLE Team(
	Id int PRIMARY KEY AUTO_INCREMENT,
    CoachId int NOT NULL,
    Name varchar(75) NOT NULL,
    LeagueId int NOT NULL,
    FOREIGN KEY (CoachId) REFERENCES User(Id),
    FOREIGN KEY (LeagueId) REFERENCES League(Id)
);

CREATE TABLE Game(
	Id int PRIMARY KEY AUTO_INCREMENT,
    HomeTeamId int NOT NULL,
    AwayTeamId int NOT NULL,
    HomeScore int,
    AwayScore int,
    Scheduled DateTime,
    WinningTeamId int,
    LosingTeamId int,
    Status varchar(15) NOT NULL DEFAULT 'SCHEDULED',
    FOREIGN KEY (HomeTeamId) REFERENCES Team(Id),
    FOREIGN KEY (AwayTeamId) REFERENCES Team(Id),
    FOREIGN KEY (WinningTeamId) REFERENCES Team(Id),
    FOREIGN KEY (LosingTeamId) REFERENCES Team(Id)
);

ALTER TABLE Game
ADD ParkName varchar(50),
ADD FieldNbr int,
ADD AddressLine varchar(125),
ADD City varchar(50),
ADD State varchar(2),
ADD Zip varchar(10)