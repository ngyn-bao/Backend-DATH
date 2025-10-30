-- =============================================
-- 1. Bảng Role
-- =============================================
create database ĐATH;
use ĐATH;
CREATE TABLE role (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL
);

-- =============================================
-- 2. Bảng User
-- =============================================
CREATE TABLE user (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    manager_id INT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    status VARCHAR(50),
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    phone_num VARCHAR(20),
    role_id INT,
    FOREIGN KEY (manager_id) REFERENCES user(ID),
    FOREIGN KEY (role_id) REFERENCES role(ID)
);

-- =============================================
-- 3. Bảng Room
-- =============================================
CREATE TABLE room (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50),
    capacity INT,
    type VARCHAR(100),
    name VARCHAR(255),
    building VARCHAR(255),
    description TEXT,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES user(ID)
);

-- =============================================
-- 4. Bảng Device
-- =============================================
CREATE TABLE device (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT,
    name VARCHAR(255),
    description TEXT,
    energy_consumption FLOAT,
    type VARCHAR(100),
    FOREIGN KEY (room_id) REFERENCES room(ID)
);

-- =============================================
-- 5. Bảng Booking
-- =============================================
CREATE TABLE booking (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    booking_user INT,
    start_time DATETIME,
    end_time DATETIME,
    cancel_reason TEXT,
    room_id INT,
    status VARCHAR(50),
    check_log TEXT,
    checkin_time DATETIME,
    checkout_time DATETIME,
    FOREIGN KEY (booking_user) REFERENCES user(ID),
    FOREIGN KEY (room_id) REFERENCES room(ID)
);

-- =============================================
-- 6. Bảng Feedback
-- =============================================
CREATE TABLE feedback (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    booking_id INT,
    FOREIGN KEY (booking_id) REFERENCES booking(ID)
);

-- =============================================
-- 7. Bảng Penalty
-- =============================================
CREATE TABLE penalty (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    edited_user_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    point INT,
    type VARCHAR(100),
    note TEXT,
    booking_id INT,
    FOREIGN KEY (user_id) REFERENCES user(ID),
    FOREIGN KEY (edited_user_id) REFERENCES user(ID),
    FOREIGN KEY (booking_id) REFERENCES booking(ID)
);

-- =============================================
-- 8. Bảng System Config
-- =============================================
CREATE TABLE system_config (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    config_name VARCHAR(255),
    config_value VARCHAR(255),
    manage_config VARCHAR(255),
    config_id INT,
    admin_id INT,
    FOREIGN KEY (admin_id) REFERENCES user(ID)
);

-- =============================================
-- 9. Bảng Usage Report
-- =============================================
CREATE TABLE usage_report (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    period_start DATETIME,
    period_end DATETIME,
    time_usage_by_hours FLOAT,
    violation_by_user INT,
    violation_by_group_user INT,
    no_checkin_count INT,
    booking_count INT,
    room_usage_rate FLOAT,
    peak_hours VARCHAR(100),
    generate_by INT,
    FOREIGN KEY (generate_by) REFERENCES user(ID)
);

-- =============================================
-- 10. Bảng Booking Usage Report
-- =============================================
CREATE TABLE booking_usage_report (
    Booking_ID INT,
    report_id INT,
    PRIMARY KEY (Booking_ID, report_id),
    FOREIGN KEY (Booking_ID) REFERENCES booking(ID),
    FOREIGN KEY (report_id) REFERENCES usage_report(ID)
);

-- =============================================
-- 11. Bảng Energy Report
-- =============================================
CREATE TABLE energy_report (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    period_start DATETIME,
    period_end DATETIME,
    cost_forecast FLOAT,
    total_energy_consumption FLOAT,
    iot_device_performance VARCHAR(255),
    device_id INT,
    generate_by INT,
    FOREIGN KEY (device_id) REFERENCES device(ID),
    FOREIGN KEY (generate_by) REFERENCES user(ID)
);

CREATE TABLE room_image (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_id INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  cloudinary_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (room_id) REFERENCES room(ID) ON DELETE CASCADE
);

CREATE TABLE room_qr (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_id INT NOT NULL UNIQUE,
  qr_path VARCHAR(255) NOT NULL,
  generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES room(ID) ON DELETE CASCADE
);
feedbackfeedback