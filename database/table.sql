create table test.shortenURL
(
    PK int AUTO_INCREMENT,
    url varchar(100),
    uuid varchar(20),
    PRIMARY KEY(url),
    UNIQUE KEY(PK)
)