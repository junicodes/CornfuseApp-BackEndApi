--This habdle the remote mysql connection
--const connection = mysql.createConnection({
--     host: 'remotemysql.com',
--     user: 'zMHU3nfqP6',
--     password: 'peaQYOKvUS',
--    database: 'zMHU3nfqP6'
--});
--this Create the users table for the sites
CREATE TABLE users (
    id int(11) NOt NULL AUTO_INCREMENT,
    username varchar(191),
    location varchar(191),
    PRIMARY KEY (id)
) ENGInE=innoDB DEFAULT CHARSET=utf8 AUTO_INCREmENT=1;

CREATE TABLE contact_us (
    id int(11) NOt NULL AUTO_INCREMENT,
    name varchar(191),
    email varchar(191),
    message text(230)
    PRIMARY KEY (id)
) ENGInE=innoDB DEFAULT CHARSET=utf8 AUTO_INCREmENT=1;
