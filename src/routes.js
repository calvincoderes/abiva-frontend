import React, { Suspense, lazy } from 'react'
import Loader from './components/Loader'
import PrivateRoute from './components/PrivateRoute'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { pageHandler, userType } from './utils/helpers'
import {
  USER_TYPE_TEACHER,
  USER_TYPE_STUDENT,
  USER_TYPE_SUPER_ADMIN,
  USER_TYPE_SCHOOL_ADMIN
} from './utils/constants'

// Admin Page
const DashboardPage = lazy(() => import('./components/DashboardPage'))
const ManageSchoolPage = lazy(() => import('./components/ManageSchoolPage'))
const ManageSchoolPageCreate = lazy(() => import('./components/ManageSchoolPage/Create'))
const ManageSchoolPageEdit = lazy(() => import('./components/ManageSchoolPage/Edit'))
const ManageSubjectPage = lazy(() => import('./components/ManageSubjectPage'))
const ManageSubjectPageCreate = lazy(() => import('./components/ManageSubjectPage/Create'))
const ManageYearPage = lazy(() => import('./components/ManageYearPage'))
const ManageYearPageCreate = lazy(() => import('./components/ManageYearPage/Create'))
const ManageClassPage = lazy(() => import('./components/ManageClassPage'))
const ManageClassPageCreate = lazy(() => import('./components/ManageClassPage/Create'))
const ManageClassPageEdit = lazy(() => import('./components/ManageClassPage/Edit'))
const SchoolAdminPage = lazy(() => import('./components/SchoolAdminPage'))
const SchoolSubAdminPage = lazy(() => import('./components/SchoolSubAdminPage'))
const TeacherPage = lazy(() => import('./components/TeacherPage'))
const StudentPage = lazy(() => import('./components/StudentPage'))
const CategoryPage = lazy(() => import('./components/CategoryPage'))
const SubCategoryPage = lazy(() => import('./components/SubCategoryPage'))
const ContentPage = lazy(() => import('./components/ContentPage'))
const AssessmentPage = lazy(() => import('./components/AssessmentPage'))
const AssessmentPageCreate = lazy(() => import('./components/AssessmentPage/Create'))
const AssessmentPageEdit = lazy(() => import('./components/AssessmentPage/Edit'))

const ModuleManagementPage = lazy(() => import('./components/ModuleManagementPage'))
const ModuleManagementPageCreate = lazy(() => import('./components/ModuleManagementPage/Create'))
const ModuleManagementPageEdit = lazy(() => import('./components/ModuleManagementPage/Edit'))
const GradingPage = lazy(() => import('./components/GradingPage'))
const GradingDetailsPage = lazy(() => import('./components/GradingPage/Details'))
const ForgotPasswordPage = lazy(() => import('./components/ForgotPasswordPage'))
const CheckEmailPage = lazy(() => import('./components/CheckEmailPage'))
const CreateNewPasswordPage = lazy(() => import('./components/CreateNewPasswordPage/Main'))
const CreateNewPasswordPageSuccess = lazy(() => import('./components/CreateNewPasswordPage/Success'))

// Teacher Page
const TeacherAssessmentPage = lazy(() => import('./components/TeacherAssessmentPage'))
const TeacherAssessmentDetailsPage = lazy(() => import('./components/TeacherAssessmentPage/Details'))

// Student Page
const StudentContentPage = lazy(() => import('./components/StudentContentPage'))
const StudentContentDetailsPage = lazy(() => import('./components/StudentContentPage/Details'))
const StudentAssessmentPage = lazy(() => import('./components/StudentAssessmentPage'))
const StudentAssessmentDetailsPage = lazy(() => import('./components/StudentAssessmentPage/Details'))
const StudentModulePage = lazy(() => import('./components/StudentModulePage'))
const StudentModuleDetailsPage = lazy(() => import('./components/StudentModulePage/Details'))

const isLoggedIn = sessionStorage.getItem('oauth')
const user = JSON.parse(sessionStorage.getItem('user'))

const Routes = () => (
  <Suspense fallback={<Loader />}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={pageHandler(user, isLoggedIn)} />
        <Route exact path='/forgot-password' component={ForgotPasswordPage} />
        <Route exact path='/new-password' component={CreateNewPasswordPage} />
        <Route exact path='/new-password/success' component={CreateNewPasswordPageSuccess} />
        <Route exact path='/check-email' component={CheckEmailPage} />
        <PrivateRoute>
          {() => (
            <Switch>
              {userType(user) === (USER_TYPE_SUPER_ADMIN || USER_TYPE_SCHOOL_ADMIN) && (
                <>
                  <Route exact path='/dashboard' component={DashboardPage} />
                  <Route exact path='/school' component={ManageSchoolPage} />
                  <Route exact path='/school/create' component={ManageSchoolPageCreate} />
                  <Route exact path='/school/:id/edit' component={ManageSchoolPageEdit}/>
                  <Route exact path='/subject' component={ManageSubjectPage} />
                  <Route exact path='/subject/create' component={ManageSubjectPageCreate} />
                  <Route exact path='/year' component={ManageYearPage} />
                  <Route exact path='/year/create' component={ManageYearPageCreate} />
                  <Route exact path='/class' component={ManageClassPage} />
                  <Route exact path='/class/create' component={ManageClassPageCreate} />
                  <Route exact path='/class/:id/edit' component={ManageClassPageEdit} />
                  <Route exact path='/school-admin' component={SchoolAdminPage} />
                  <Route exact path='/school-sub-admin' component={SchoolSubAdminPage} />
                  <Route exact path='/teacher' component={TeacherPage} />
                  <Route exact path='/student' component={StudentPage} />
                  <Route exact path='/category' component={CategoryPage} />
                  <Route exact path='/sub-category' component={SubCategoryPage} />
                  <Route exact path='/content' component={ContentPage} />
                  <Route exact path='/assessment' component={AssessmentPage} />
                  <Route exact path='/assessment/create' component={AssessmentPageCreate} />
                  <Route exact path='/assessment/:id/edit' component={AssessmentPageEdit} />
                  <Route exact path='/module' component={ModuleManagementPage} />
                  <Route exact path='/module/create' component={ModuleManagementPageCreate} />
                  <Route exact path='/module/:id/edit' component={ModuleManagementPageEdit} />
                  <Route exact path='/grading' component={GradingPage} />
                  <Route exact path='/grading/:id' component={GradingDetailsPage} />
                </>
              )}
              {userType(user) === USER_TYPE_TEACHER && (
                <>
                  <Route exact path='/dashboard' component={DashboardPage} />
                  <Route exact path='/assessment' component={AssessmentPage} />
                  <Route exact path='/assessment/create' component={AssessmentPageCreate} />
                  <Route exact path='/assessment/:id' component={AssessmentPageEdit} />
                  <Route exact path='/module' component={ModuleManagementPage} />
                  <Route exact path='/module/create' component={ModuleManagementPageCreate} />
                  <Route exact path='/module/:id/edit' component={ModuleManagementPageEdit} />
                  <Route exact path='/grading' component={GradingPage} />
                  <Route exact path='/grading/:id' component={GradingDetailsPage} />
                  <Route exact path='/assessments-for-checking' component={TeacherAssessmentPage} />
                  <Route exact path='/assessments-for-checking/:id' component={TeacherAssessmentDetailsPage} />
                </>
              )}
              {userType(user) === USER_TYPE_STUDENT && (
                <>
                  <Route exact path='/contents' component={StudentContentPage} />
                  <Route exact path='/contents/:id' component={StudentContentDetailsPage} />
                  <Route exact path='/assessments' component={StudentAssessmentPage} />
                  <Route exact path='/assessments/:id' component={StudentAssessmentDetailsPage} />
                  <Route exact path='/modules' component={StudentModulePage} />
                  <Route exact path='/modules/:id' component={StudentModuleDetailsPage} />
                </>
              )}
            </Switch>
          )}
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  </Suspense>
)

export default Routes
