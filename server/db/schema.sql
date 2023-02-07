DROP TABLE IF EXISTS parents CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS schedules CASCADE;
DROP TABLE IF EXISTS children CASCADE;
DROP TABLE IF EXISTS employees_children CASCADE;
DROP TABLE IF EXISTS schedules_children CASCADE;
--parents could alternatively be account holder
CREATE TABLE parents (
  id SERIAL PRIMARY KEY NOT NULL,
  parent_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE activities (
  id SERIAL PRIMARY KEY NOT NULL,
  activity_name VARCHAR(255) NOT NULL,
  description TEXT,
  out_of_daycare BOOLEAN NOT NULL DEFAULT FALSE
);
--schedule items might be better name
CREATE TABLE schedules (
  id SERIAL PRIMARY KEY NOT NULL,
  activity_id INTEGER REFERENCES activities(id) ON DELETE CASCADE,
  date_time TIMESTAMP
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY NOT NULL,
  employee_name VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE children (
  id SERIAL PRIMARY KEY NOT NULL,
  parent_id INTEGER REFERENCES parents(id) ON DELETE CASCADE,
  child_name VARCHAR(255) NOT NULL,
  notes TEXT,
  birthday DATE,
  age_group TEXT
);

CREATE TABLE employees_children (
id SERIAL PRIMARY KEY NOT NULL,
employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
child_id INTEGER REFERENCES children(id) ON DELETE CASCADE
);

CREATE TABLE schedules_children (
 id SERIAL PRIMARY KEY NOT NULL,
 child_id INTEGER REFERENCES children(id) ON DELETE CASCADE,
 schedule_id INTEGER REFERENCES schedules(id) ON DELETE CASCADE
);
/*
if we want to allow multiple accounts to access a child we can use this
CREATE TABLE parents_children (
id SERIAL PRIMARY KEY NOT NULL,
parent_id INTEGER REFERENCES parents(id) ON DELETE CASCADE,
child_id INTEGER REFERENCES children(id) ON DELETE CASCADE,
);
*/