import { createStore } from 'easy-peasy'
// Login
import login from './login'

// Logout
import logout from './logout'

// Me
import me from './me'

// Forgot Password Request
import forgotPasswordRequest from './forgot_password_request'

// Change Password
import changePassword from './change_password'

// Update Password
import updatePassword from './update_password'

// Users
import users from './users'

// Subjects
import subjects from './subjects'

// Year/Level
import yearLevel from './year_level'

// Cities
import cities from './cities'

// Provinces
import provinces from './provinces'

// Schools
import schools from './schools'

// Sections
import sections from './sections'

// Categories
import categories from './categories'

// Sub Categories
import subCategories from './sub_categories'

// Content
import content from './content'

// Assessments
import assessments from './assessments'

// Student Assessments
import studentAssessments from './student_assessments'

// Student Assessments
import studentModules from './student_modules'

// Modules
import modules from './modules'

// Grading
import grading from './grading'

// Images
import images from './images'

// Files
import files from './files'

export default createStore({
  // Login
  ...login,
  // Logout
  ...logout,
  // Me
  ...me,
  // Forgot Password Request
  ...forgotPasswordRequest,
  // Change Password
  ...changePassword,
  // Update Password
  ...updatePassword,
  // Users
  ...users,
  // Subjects
  ...subjects,
  // Year/Level
  ...yearLevel,
  // Cities
  ...cities,
  // Provinces
  ...provinces,
  // Schools
  ...schools,
  // Sections
  ...sections,
  // Categories
  ...categories,
  // Sub Categories
  ...subCategories,
  // Sub Categories
  ...content,
  // Assessments
  ...assessments,
  // Student Assessments
  ...studentAssessments,
  // Student Modules
  ...studentModules,
  // Modules
  ...modules,
  // Grading
  ...grading,
  // Images
  ...images,
  // Files
  ...files
})
