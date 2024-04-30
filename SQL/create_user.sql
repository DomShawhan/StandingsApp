USE baseballstanding;

DROP USER IF EXISTS baseballstanding@localhost;
CREATE USER baseballstanding@localhost IDENTIFIED BY 'B@seb@11';
GRANT SELECT, INSERT, DELETE, UPDATE ON baseballstanding.* TO baseballstanding@localhost;