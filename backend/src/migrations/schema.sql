-- Courses Table
CREATE TABLE course (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL
);

-- Lectures Table
CREATE TABLE lecture (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) NOT NULL,
  release_date TIMESTAMPTZ,
  FOREIGN KEY (course_id) REFERENCES course(id)
);

-- Class Groups Table
CREATE TABLE class_group (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL
);

-- Students Table
CREATE TABLE student (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  class_group_id UUID NOT NULL,
  FOREIGN KEY (class_group_id) REFERENCES class_group(id)
);

-- Modules Table
CREATE TABLE module (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lecture_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  FOREIGN KEY (lecture_id) REFERENCES lecture(id)
);

-- Module Attempts Table
CREATE TABLE module_attempt (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL,
  student_id UUID NOT NULL,
  correct BOOLEAN NOT NULL,
  attempted BOOLEAN NOT NULL,
  FOREIGN KEY (module_id) REFERENCES module(id),
  FOREIGN KEY (student_id) REFERENCES student(id)
);
