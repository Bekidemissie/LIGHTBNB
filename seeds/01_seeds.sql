INSERT INTO users (name, email, password) VALUES
('John Doe', 'john.doe@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jane Doe', 'jane.doe@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Alice', 'alice@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bob', 'bob@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Charlie', 'charlie@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('David', 'david@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Emily', 'emily@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Frank', 'frank@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Grace', 'grace@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Helen', 'helen@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ivy', 'ivy@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jack', 'jack@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Kate', 'kate@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Linda', 'linda@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- Inserting 3 rows into the properties table
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) VALUES
(1, 'Cozy Apartment', 'A cozy and affordable apartment.', 'thumbnail1.jpg', 'cover1.jpg', 120, 1, 1, 2, 'USA', '100 Elm St', 'Springfield', 'IL', '62704'),
(2, 'Beach House', 'A house with an ocean view.', 'thumbnail2.jpg', 'cover2.jpg', 300, 2, 2, 3, 'USA', '200 Ocean Ave', 'Malibu', 'CA', '90265'),
(1, 'Mountain Cabin', 'A cabin in the mountains.', 'thumbnail3.jpg', 'cover3.jpg', 250, 0, 1, 1, 'USA', '300 Pine Rd', 'Aspen', 'CO', '81611');

-- Inserting 3 rows into the reservations table
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES
('2023-10-01', '2023-10-07', 1, 3),
('2023-11-15', '2023-11-20', 2, 1),
('2023-12-25', '2024-01-01', 3, 2);

-- Inserting 3 rows into the property_reviews table
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES
(3, 1, 1, 4, 'Nice and cozy place.'),
(1, 2, 2, 5, 'Beautiful ocean view!'),
(2, 3, 3, 5, 'Quiet and comfortable.');

-- Inserting 3 rows into the guest_reviews table
INSERT INTO guest_reviews (guest_id, owner_id, reservation_id, rating, message) VALUES
(3, 1, 1, 5, 'Excellent guest. Very clean.'),
(1, 2, 2, 4, 'Good guest but left some items behind.'),
(2, 1, 3, 5, 'Perfect guest. Would host again.');
