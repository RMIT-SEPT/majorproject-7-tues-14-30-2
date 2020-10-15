INSERT INTO USER (USERNAME, ADDRESS, CONTACT, NAME, PASSWORD, ROLE, CREATED_AT, UPDATED_AT) VALUES
('customer', '12 Home Street', '0412389657', 'John Doe', 'password', 'CUSTOMER', current_date(), current_date()),
('cu57om3r', '24 Home Street', '0346518297', 'George Deer', 'password', 'CUSTOMER', current_date(), current_date()),
('w0rk3r', '50 Work Street', '0567894321', 'Peter Rabbit', 'password', 'WORKER', current_date(), current_date()),
('poshduck', '100 Boss Street', '09435261798', 'Cygnet Swan', 'password', 'ADMIN', current_date(), current_date());

INSERT INTO SERVICES (AVAILABLE_DAYS, CREATED_AT, UPDATED_AT, START_TIME, SERVICE, END_TIME, ASSIGNED_WORKER) VALUES
('2,3,4,5,6', current_date(), current_date(), PARSEDATETIME('08:30:00', 'HH:mm:ss'), 'Gardening', PARSEDATETIME('12:30:00', 'HH:mm:ss'), 'w0rk3r'),
('1,2,5,6,7', current_date(), current_date(), PARSEDATETIME('012:30:00', 'HH:mm:ss'), 'Cleaning', PARSEDATETIME('21:30:00', 'HH:mm:ss'), 'w0rk3r');

INSERT INTO BOOKING (BOOKING_DATE, BOOKING_TIME, CREATED_AT, UPDATED_AT, DURATION, NOTES, ASSIGNED_WORKER, SERVICE, CUSTOMER_USERNAME) VALUES
(PARSEDATETIME('2020-11-30', 'yyyy-MM-dd'), PARSEDATETIME('014:30:00', 'HH:mm:ss'), current_date(), current_date(), 10, 'This is seed data', 'w0rk3r', 2, 'customer');