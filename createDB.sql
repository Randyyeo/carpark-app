create database carpark;

use carpark;

create table accounts (
	id int auto_increment NOT NULL primary key,
    email varchar(40) NOT NULL ,
    password varchar(200) NOT NULL,
    firstname varchar(40) NOT NULL,
    lastname varchar(40) NOT NULL,
    phone int
    
);

insert into accounts (email, password, firstname, lastname,  phone) values 
    ('user1', 'password1', 'Barack', 'Obama',  87654321),
    ('user2', 'password2', 'Donald', 'Trump', 12345678);




