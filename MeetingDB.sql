use ptm;

create table meeting(
	meeting_id varchar(5) primary key,
    meeting_name varchar(50) not null,
    meeting_time datetime not null,
    set_by varchar(10) not null,
	meeting_link varchar(50) not null); 
    
insert into meeting values
	('1', 'office meet', '2022-05-10 09:00:00', 'Sudheer', 'blahblahblahblahblah');
    
select * from meeting;