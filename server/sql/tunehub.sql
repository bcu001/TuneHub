use tunehub;

select * from songs;
select * from songMedia;
select * from users;
select * from albums;

INSERT INTO songs (songName, likes, artist, writer, releaseDate, category, albumID) VALUES
('One Thousand Miles', 1200000, 'Yo Yo Honey Singh', 'Yo Yo Honey Singh', '2014-08-26', 'Hip Hop', 1),
('Stardom', 900000, 'Yo Yo Honey Singh', 'Yo Yo Honey Singh', '2014-08-26', 'Hip Hop', 1),
('Chal Mere Ghar', 1500000, 'Yo Yo Honey Singh', 'Yo Yo Honey Singh', '2014-08-26', 'Hip Hop', 1),
('Daftar Ki Girl', 1100000, 'Yo Yo Honey Singh', 'Yo Yo Honey Singh', '2014-08-26', 'Hip Hop', 1),
('I Am Your DJ Tonight', 950000, 'Yo Yo Honey Singh', 'Yo Yo Honey Singh', '2014-08-26', 'Hip Hop', 1);

INSERT INTO albums (albumID, albumName, artist, releaseDate) VALUES
(2, 'Tum Hi Ho - Best of Arijit Singh', 'Arijit Singh', '2016-12-15');

INSERT INTO songs (songName, likes, artist, writer, releaseDate, category, albumID) VALUES
('Tum Hi Ho', 8000000, 'Arijit Singh', 'Mithoon', '2013-04-08', 'R&B', 2),
('Channa Mereya', 7500000, 'Arijit Singh', 'Amitabh Bhattacharya', '2016-09-23', 'Folk', 2),
('Raabta', 5000000, 'Arijit Singh', 'Amitabh Bhattacharya', '2012-06-22', 'Pop', 2),
('Agar Tum Saath Ho', 7800000, 'Arijit Singh', 'Irshad Kamil', '2015-10-16', 'Classical', 2),
('Muskurane', 4500000, 'Arijit Singh', 'Rashmi Singh', '2014-05-16', 'R&B', 2),
('Janam Janam', 6000000, 'Arijit Singh', 'Amitabh Bhattacharya', '2015-12-18', 'Pop', 2),
('Gerua', 7000000, 'Arijit Singh', 'Amitabh Bhattacharya', '2015-11-18', 'Pop', 2),
('Tera Yaar Hoon Main', 7200000, 'Arijit Singh', 'Kumaar', '2018-02-14', 'Folk', 2);


INSERT INTO songs (songName, likes, artist, writer, releaseDate, category, albumID) VALUES
('Bekhayali', 6500000, 'Arijit Singh', 'Irshad Kamil', '2019-05-24', 'R&B', NULL),
('Vaaste', 7200000, 'Dhvani Bhanushali', 'Arafat Mehmood', '2019-04-06', 'Pop', NULL),
('Excuses', 8100000, 'AP Dhillon', 'AP Dhillon', '2021-06-24', 'Hip Hop', NULL),
('Brown Munde', 8900000, 'AP Dhillon', 'Shinda Kahlon', '2020-09-18', 'Hip Hop', NULL),
('Kesariya', 9500000, 'Arijit Singh', 'Amitabh Bhattacharya', '2022-07-17', 'R&B', NULL),
('Lut Gaye', 7300000, 'Jubin Nautiyal', 'Manoj Muntashir', '2021-02-17', 'Pop', NULL),
('Maan Meri Jaan', 7700000, 'King', 'King', '2022-12-06', 'Hip Hop', NULL),
('Pasoori', 9000000, 'Ali Sethi', 'Ali Sethi', '2022-02-07', 'Folk', NULL),
('Raataan Lambiyan', 8600000, 'Jubin Nautiyal', 'Tanishk Bagchi', '2021-07-30', 'R&B', NULL),
('Pehli Dafa', 6800000, 'Atif Aslam', 'Shakeel Sohail', '2017-01-06', 'R&B', NULL);
