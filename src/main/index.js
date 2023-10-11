import React, { useContext } from "react";

/// React router dom
import { Switch, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";

/// Dashboard
import Home from "./components/Dashboard/Home";
import DashboardDark from "./components/Dashboard/DashboardDark";
import Instructors from "./components/Dashboard/Instructors";
import Activity from "./components/Dashboard/Activity";
import Message from "./components/Dashboard/Message";
import Schedule from "./components/Dashboard/Schedule";
import Profile from "./components/Dashboard/Profile";

//Instructor----
import Inst from "./components/Instructon/Inst";

//Learner----
import Learn from "./components/Learner/Learn";

//Learner----
import LearnerCourse from "./components/Learn/LearnCourse/LearnerCourse";
import LearnCourseView from "./components/Learn/LearnCourse/LearnCourseView";

//Learn
import LearnerFiles from "./components/Learn/LearnFiles/LearnerFiles";

//Learner Groups
import Lgroups from "./components/LGroups/Lgroups";

// Learn Certificate
import LearnerCertificate from "./components/Learn/LearnCertificate/LearnerCertificate";

//Learner Training
import Lclassroom from "./components/LTrainings/Lclassroom";
import Lconference from "./components/LTrainings/Lconference";
import Lvirtualtraining from "./components/LTrainings/Lvirtualtraining";

//Learn Timeline
import LearnerTimeline from "./components/Learn/LearnTimeline/LearnerTimeline";

//Users----
import Users from "./components/Users/Users";
import AddUser from "./components/Users/AddUser";
import EditUser from "./components/Users/EditUser";
import ImportUser from "./components/Users/ImportUser";
import ExportUser from "./components/Users/ExportUser";
import UserFiles from "./components/Users/UserFiles";
import UserGroups from "./components/Users/UserGroups";
import UserCourse from "./components/Users/UserCourse";
import UserProg from "./components/Users/UserProg";
import UserCertificate from "./components/Users/UserCertificate";
import UserInfographics from "./components/Users/UserInfographics";
import Badges from "./components/Users/Badges";
import UserTimeline from "./components/Users/UserTimeline";

//Admin Users Pages
import AUsers from "./components/AUsers/AUsers";
import AdAddUser from "./components/AUsers/AdAddUser";
import AdEditUser from "./components/AUsers/AdEditUser";
import AdUserTypes from "./components/AUsers/AdUserTypes";
import AdAddUserType from "./components/AUsers/AdAddUserType";
import AdEditUserType from "./components/AUsers/AdEditUserType";
import AdImportUser from "./components/AUsers/AdImportUser";
import AdExportUser from "./components/AUsers/AdExportUser";
import AdUserFiles from "./components/AUsers/AdUserFiles";
import AdUserGroups from "./components/AUsers/AdUserGroups";
import AdUserCourse from "./components/AUsers/AdUserCourse";
import AdUserProg from "./components/AUsers/AdUserProg";
import AdUserCertificate from "./components/AUsers/AdUserCertificate";
import AdUserTimeline from "./components/AUsers/AdUserTimeline";
import AdUserInfographics from "./components/AUsers/AdUserInfographics";

//Categories----
import Categories from "./components/Categories/Categories";
import AddCategory from "./components/Categories/AddCategory";
import EditCategory from "./components/Categories/EditCategory";

//Courses----
import CoursesMain from "./components/Courses/CoursesMain";
import CourseDetail1 from "./components/Courses/CourseDetail1";
import CourseDetail2 from "./components/Courses/CourseDetail2";
import AddCourses from "./components/Courses/AddCourses";
import EditcourseForm from "./components/Courses/EditcourseForm";
import Info from "./components/Courses/Info";
import UCoursesInfo from "./components/Courses/UCoursesInfo";
// import Content from "./components/Courses/Content";
// import WebContent from "./components/Courses/WebContent";
import Video from "./components/Courses/Video";
// import Audio from "./components/Courses/Audio";
import Presentation from "./components/Courses/Presentation";
import Scorm from "./components/Courses/Scorm";
// import Iframe from "./components/Courses/Iframe";
import SelectTestQuestion from "./components/Courses/SelectTestQuestion";
import SetTestOrder from "./components/Courses/SetTestOrder";
import SetTestWeight from "./components/Courses/SetTestWeight";
import TestOption from "./components/Courses/TestOption";
// import SelectSurveyQuestion from "./components/Courses/SelectSurveyQuestion";
import SetSurveyOrder from "./components/Courses/SetSurveyOrder";
import SurveyOption from "./components/Courses/SurveyOption";
import Assignment from "./components/Courses/Assignment";
import InstructorLed from "./components/Courses/InstructorLed";
import InstOptions from "./components/Courses/InstOptions";
import AddSessions from "./components/Courses/AddSessions";
import Courseusers from "./components/Courses/Courseusers";
import EnrollUsers from "./components/Courses/EnrollUsers";
import Coursegroups from "./components/Courses/Coursegroups";
// import UsersCourseProgress from "./components/Courses/UsersCourseProgress";
// import RulesPath from "./components/Courses/RulesPath";
import CourseUserReports from "./components/Courses/CourseUserReports";
import CourseFiles from "./components/Courses/CourseFiles";
import CourseOverview from "./components/Courses/CourseOverview";
import CoursesUser from "./components/Courses/CoursesUser";
import MessageUsers from "./components/Courses/MessageUsers";
import AdEvent from "./components/Courses/AdEvent";
import MobileAppCompatibility from "./components/Courses/MobileAppCompatibility";

//Admin Courses----
import AdmCoursesMain from "./components/ACourses/AdmCoursesMain";
import AdmCourseDetail1 from "./components/ACourses/AdmCourseDetail1";
import AdmCourseDetail2 from "./components/ACourses/AdmCourseDetail2";
import AdmAddCourses from "./components/ACourses/AdmAddCourses";
import AdmEditcourseForm from "./components/ACourses/AdmEditcourseForm";
import AdmInfo from "./components/ACourses/AdmInfo";
import AdmContent from "./components/ACourses/AdmContent";
import AdmWebContent from "./components/ACourses/AdmWebContent";
import AdmVideo from "./components/ACourses/AdmVideo";
import AdmAudio from "./components/ACourses/AdmAudio";
import AdmPresentation from "./components/ACourses/AdmPresentation";
import AdmScorm from "./components/ACourses/AdmScorm";
import AdmIframe from "./components/ACourses/AdmIframe";
import AdmSelectTestQuestion from "./components/ACourses/AdmSelectTestQuestion";
import AdmSetTestOrder from "./components/ACourses/AdmSetTestOrder";
import AdmSetTestWeight from "./components/ACourses/AdmSetTestWeight";
import AdmTestOption from "./components/ACourses/AdmTestOption";
import AdmSelectSurveyQuestion from "./components/ACourses/AdmSelectSurveyQuestion";
import AdmSetSurveyOrder from "./components/ACourses/AdmSetSurveyOrder";
import AdmSurveyOption from "./components/ACourses/AdmSurveyOption";
import AdmAssignment from "./components/ACourses/AdmAssignment";
import AdmInstructorLed from "./components/ACourses/AdmInstructorLed";
import AdmCourseusers from "./components/ACourses/AdmCourseusers";
import AdmEnrollUsers from "./components/ACourses/AdmEnrollUsers";
import AdmCoursegroups from "./components/ACourses/AdmCoursegroups";
// import AdmUsersCourseProgress from "./components/ACourses/AdmUsersCourseProgress";
import AdmRulesPath from "./components/ACourses/AdmRulesPath";
import AdmCourseUserReports from "./components/ACourses/AdmCourseUserReports";
import AdmCourseFiles from "./components/ACourses/AdmCourseFiles";
import AdmCourseOverview from "./components/ACourses/AdmCourseOverview";
import AdmCoursesUser from "./components/ACourses/AdmCoursesUser";
import AdmMessageUsers from "./components/ACourses/AdmMessageUsers";
import AdmAdEvent from "./components/ACourses/AdmAdEvent";
import AdmMobileAppCompatibility from "./components/ACourses/AdmMobileAppCompatibility";

//Groups----
import Groups from "./components/Groups/Groups";
import AddGroups from "./components/Groups/AddGroups";
import EditGroups from "./components/Groups/EditGroups";
import GroupsUsers from "./components/Groups/GroupsUsers";
import GroupCourses from "./components/Groups/GroupCourses";
import GroupFiles from "./components/Groups/GroupFiles";

//Admin Groups----
import AdmGroups from "./components/AGroups/AdmGroups";
import AdmAddGroups from "./components/AGroups/AdmAddGroups";
import AdmEditGroups from "./components/AGroups/AdmEditGroups";
import AdmGroupsUsers from "./components/AGroups/AdmGroupsUsers";
import AdmGroupCourses from "./components/AGroups/AdmGroupCourses";
import AdmGroupFiles from "./components/AGroups/AdmGroupFiles";

//Instructor Groups----
import InstGroups from "./components/IGroups/InstGroups";
import InstAddGroups from "./components/IGroups/InstAddGroups";
import InstEditGroups from "./components/IGroups/InstEditGroups";
import InstGroupsUsers from "./components/IGroups/InstGroupsUsers";
import InstGroupCourses from "./components/IGroups/InstGroupCourses";
import InstGroupFiles from "./components/IGroups/InstGroupFiles";

//Events Engine----
import Events from "./components/EventsEngine/Events";
import AddNotification from "./components/EventsEngine/AddNotification";
import EditNotification from "./components/EventsEngine/EditNotification";
// import CustomizeNotification from "./components/EventsEngine/CustomizeNotification";
import PendingNotification from "./components/EventsEngine/PendingNotification";

//Admin Events Engine----
import AdmEvents from "./components/AdmEventsEngine/AdmEvents";
import AdmAddNotification from "./components/AdmEventsEngine/AdmAddNotification";
import AdmEditNotification from "./components/AdmEventsEngine/AdmEditNotification";
import AdmCustomizeNotification from "./components/AdmEventsEngine/AdmCustomizeNotification";
import AdmPendingNotification from "./components/AdmEventsEngine/AdmPendingNotification";

//Import-Export
import SuImportUser from "./components/ImpExp/SuImportUser";
import SuExportUser from "./components/ImpExp/SuExportUser";

//Instructors----
import InstructorDashboard from "./components/Instructor/InstructorDashboard";
import InstructorCourses from "./components/Instructor/InstructorCourses";
import InstructorSchedule from "./components/Instructor/InstructorSchedule";
import InstructorStudents from "./components/Instructor/InstructorStudents";
import InstructorResources from "./components/Instructor/InstructorResources";
import InstructorTransactions from "./components/Instructor/InstructorTransactions";
import LiveClass from "./components/Instructor/LiveClass";

//Reports----
import ReportOverview from "./components/Reports/Overview";
import UserReports from "./components/Reports/UserReports";
import CourseReports from "./components/Reports/CourseReports";
import GroupReports from "./components/Reports/GroupReports";
import ScormReports from "./components/Reports/ScormReports";
import TestReports from "./components/Reports/TestReports";
import TestOverview from "./components/Reports/TestOverview";
import TestAnalysis from "./components/Reports/TestAnalysis";
import SurveyReports from "./components/Reports/SurveyReports";
import SurveyOverview from "./components/Reports/SurveyOverview";
import SurveyAnalysis from "./components/Reports/SurveyAnalysis";
import AssignmentReports from "./components/Reports/AssignmentReports";
import IltReports from "./components/Reports/IltReports";
import CustomReports from "./components/Reports/CustomReports";
import Infographics from "./components/Reports/Infographics";

//Admin Reports----
import AdmReportOverview from "./components/AReports/AdmOverview";
import AdmUserReports from "./components/AReports/AdmUserReports";
import AdmCourseReports from "./components/AReports/AdmCourseReports";
import AdmGroupReports from "./components/AReports/AdmGroupReports";
import AdmInfographics from "./components/AReports/AdmInfographics";

/////Accounts & Settings----
// import BasicSettings from "./components/AccountSettings/BasicSettings";
// import Certificates from "./components/AccountSettings/Certificates";
// import Domain from "./components/AccountSettings/Domain";
// import Ecommerce from "./components/AccountSettings/Ecommerce";
// import Gamification from "./components/AccountSettings/Gamifications";
// import Subscription from "./components/AccountSettings/Subscription";
// import Thoms from "./components/AccountSettings/Thoms";
// import UserSettings from "./components/AccountSettings/UserSettings";

/////Admin Accounts & Settings----
import AdmBasicSettings from "./components/AdmAccountSettings/AdmBasicSettings";
import AdmCertificates from "./components/AdmAccountSettings/AdmCertificates";
import AdmDomain from "./components/AdmAccountSettings/AdmDomain";
import AdmEcommerce from "./components/AdmAccountSettings/AdmEcommerce";
import AdmGamification from "./components/AdmAccountSettings/AdmGamifications";
import AdmSubscription from "./components/AdmAccountSettings/AdmSubscription";
import AdmThoms from "./components/AdmAccountSettings/AdmThoms";
import AdmUserSettings from "./components/AdmAccountSettings/AdmUserSettings";

/////Trainings----
import Classrooms from "./components/Trainings/Classroom";
import VirtualTraining from "./components/Trainings/VirtualTraining";
import Conferences from "./components/Trainings/Conference";
import AddClassrooms from "./components/Trainings/AddClassrooms";
import AddConferences from "./components/Trainings/AddConferences";
import AddVirtualTraining from "./components/Trainings/AddVirtualTrainings";
import EditClassroom from "./components/Trainings/EditClassroom";
import EditConference from "./components/Trainings/EditConference";
import EditVirtual from "./components/Trainings/EditVirtual";
import ClassroomUsers from "./components/Trainings/ClassroomUsers";
import ConferenceUsers from "./components/Trainings/ConferenceUsers";
import VirtualUsers from "./components/Trainings/VirtualUsers";

//Calenders----
import Calender from "./components/Calender/Calender";
import AddCEvents from "./components/Calender/AddCEvent";

//Learner Calenders----
import LearnCalender from "./components/LCalender/LearnCalender";

//Discussions-----
import Discussions from "./components/Discussion/Discussion";
import AddDiscussion from "./components/Discussion/AddDiscussions";
import UserDiscussion from "./components/Discussion/UserDiscussion";

//Learner Discussions-----
import LearnDiscussions from "./components/LDiscussion/LearnDiscussion";
import LearnAddDiscussion from "./components/LDiscussion/LearnAddDiscussions";
import LearnUserDiscussion from "./components/LDiscussion/LearnUserDiscussion";

/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import Compose from "./components/AppsMenu/Email/Compose/Compose";
import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
import Read from "./components/AppsMenu/Email/Read/Read";
import Calendar from "./components/AppsMenu/Calendar/Calendar";
import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";

/// Product List
// import Checkout from "../components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";

/// Charts
import SparklineChart from "./components/charts/Sparkline";
import Chartist from "./components/charts/chartist";
import RechartJs from "./components/charts/rechart";
import ApexChart from "./components/charts/apexcharts";

/// Plugins
import Select2 from "./components/PluginsMenu/Select2/Select2";
import Toastr from "./components/PluginsMenu/Toastr/Toastr";

/// Form
import SummerNote from "./components/Forms/Summernote/SummerNote";

// Scorms
import CoursesScorm from "./components/scorm/CoursesScorm";

/// Pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import { ThemeContext } from "@context/ThemeContext";
import PrivateAddress from "./components/Calender/PrivateAddress";
import Reset from "./pages/Reset";

const Markup = () => {
  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    /// Dashboard
    { url: "", component: Home },
    { url: "dashboard", component: Home },
    { url: "dashboard-dark", component: DashboardDark },
    { url: "instructors", component: Instructors },
    { url: "schedule", component: Schedule },
    { url: "message", component: Message },
    { url: "activity", component: Activity },
    { url: "profile", component: Profile },

    /// Instructor
    { url: "inst-dash", component: Inst },

    /// Learner
    { url: "learn-dash", component: Learn },

    // Learn Files
    { url: "learn-files", component: LearnerFiles },

    // Learn Courses list
    { url: "learn-course", component: LearnerCourse },
    { url: "learn-course-view/:id", component: LearnCourseView },

    // Learn Files
    { url: "learn-group", component: Lgroups },

    // Learn Certificate
    { url: "learn-certificate", component: LearnerCertificate },

    // Learn Timeline
    { url: "learn-timeline", component: LearnerTimeline },

    //Users (superadmin)

    { url: "users-list", component: Users },
    { url: "add-user", component: AddUser },
    { url: "edit-user/:id", component: EditUser },
    { url: "import-user", component: ImportUser },
    { url: "export-user", component: ExportUser },
    { url: "user-files/:id", component: UserFiles },
    { url: "user-groups/:id", component: UserGroups },
    { url: "user-course", component: UserCourse },
    { url: "user-progress", component: UserProg },
    { url: "user-certificates", component: UserCertificate },
    { url: "user-infographic", component: UserInfographics },
    { url: "badges-list", component: Badges },
    { url: "user-timeline", component: UserTimeline },

    //Users---

    { url: "insusers-list", component: AUsers }, //instructors list
    { url: "insadd-user", component: AdAddUser }, //instructors add
    { url: "insedit-user/:id", component: AdEditUser }, //instructors edit
    { url: "ad-user-types", component: AdUserTypes },
    { url: "ad-add-user-type", component: AdAddUserType },
    { url: "ad-edit-user-type", component: AdEditUserType },
    { url: "ad-import-user", component: AdImportUser },
    { url: "ad-export-user", component: AdExportUser },
    { url: "insuser-files/:id", component: AdUserFiles }, //instructor user >> files
    { url: "insuser-groups/:id", component: AdUserGroups }, //instructor user >> groups
    { url: "insuser-course/:id", component: AdUserCourse }, //instructor user >> courses
    { url: "ad-user-progress", component: AdUserProg },
    { url: "ad-user-certificates", component: AdUserCertificate },
    { url: "ad-user-timeline", component: AdUserTimeline },
    { url: "ad-user-infographic", component: AdUserInfographics },

    //Categories---

    { url: "categories", component: Categories },
    { url: "add-category", component: AddCategory },
    { url: "edit-category/:id", component: EditCategory },

    // Courses ----
    { url: "courses", component: CoursesMain },
    { url: "course-details-1/:id", component: CourseDetail1 },
    { url: "course-details-2", component: CourseDetail2 },
    { url: "add-courses", component: AddCourses },
    { url: "edit-courses/:id", component: EditcourseForm },
    { url: "courses-info", component: Info },
    { url: "user-courses-info/:id", component: UCoursesInfo },
    // { url: "content", component: Content },
    // { url: "webcontent", component: WebContent },
    { url: "video", component: Video },
    // { url: "audio", component: Audio },
    { url: "presentation", component: Presentation },
    { url: "scorm", component: Scorm },
    // { url: "iframe", component: Iframe },
    { url: "test-question", component: SelectTestQuestion },
    { url: "test-order", component: SetTestOrder },
    { url: "test-weight", component: SetTestWeight },
    { url: "test-option", component: TestOption },
    // { url: "survey-question", component: SelectSurveyQuestion },
    { url: "survey-order", component: SetSurveyOrder },
    { url: "survey-option", component: SurveyOption },
    { url: "assignment", component: Assignment },
    { url: "instructor-led", component: InstructorLed },
    { url: "inst-options", component: InstOptions },
    { url: "add-sessions", component: AddSessions },
    { url: "course_users/:id", component: Courseusers },
    { url: "enroll_users", component: EnrollUsers },
    { url: "course_groups/:id", component: Coursegroups },
    // { url: "users_course_progress", component: UsersCourseProgress },
    // { url: "rules-path", component: RulesPath },
    { url: "course_user_report", component: CourseUserReports },
    { url: "course_files", component: CourseFiles },
    { url: "course_overview", component: CourseOverview },
    { url: "courses_user", component: CoursesUser },
    { url: "message_users", component: MessageUsers },
    { url: "ad_event", component: AdEvent },
    { url: "mobileapp_compt", component: MobileAppCompatibility },

    // Courses ----
    { url: "adm_courses", component: AdmCoursesMain },
    { url: "adm_course-details-1", component: AdmCourseDetail1 },
    { url: "adm_course-details-2", component: AdmCourseDetail2 },
    { url: "adm_add-courses", component: AdmAddCourses },
    { url: "adm_edit-courses", component: AdmEditcourseForm },
    { url: "adm_courses-info", component: AdmInfo },
    { url: "adm_content", component: AdmContent },
    { url: "adm_webcontent", component: AdmWebContent },
    { url: "adm_video", component: AdmVideo },
    { url: "adm_audio", component: AdmAudio },
    { url: "adm_presentation", component: AdmPresentation },
    { url: "adm_scorm", component: AdmScorm },
    { url: "adm_iframe", component: AdmIframe },
    { url: "adm_test-question", component: AdmSelectTestQuestion },
    { url: "adm_test-order", component: AdmSetTestOrder },
    { url: "adm_test-weight", component: AdmSetTestWeight },
    { url: "adm_test-option", component: AdmTestOption },
    { url: "adm_survey-question", component: AdmSelectSurveyQuestion },
    { url: "adm_survey-order", component: AdmSetSurveyOrder },
    { url: "adm_survey-option", component: AdmSurveyOption },
    { url: "adm_assignment", component: AdmAssignment },
    { url: "adm_instructor-led", component: AdmInstructorLed },
    { url: "adm_course_users", component: AdmCourseusers },
    { url: "adm_enroll_users", component: AdmEnrollUsers },
    { url: "adm_course_groups", component: AdmCoursegroups },
    // { url: "adm_users_course_progress", component: AdmUsersCourseProgress },
    { url: "adm_rules-path", component: AdmRulesPath },
    { url: "adm_course_user_report", component: AdmCourseUserReports },
    { url: "adm_course_files", component: AdmCourseFiles },
    { url: "adm_course_overview", component: AdmCourseOverview },
    { url: "adm_courses_user", component: AdmCoursesUser },
    { url: "adm_message_users", component: AdmMessageUsers },
    { url: "adm_ad_event", component: AdmAdEvent },
    { url: "adm_mobileapp_compt", component: AdmMobileAppCompatibility },

    // Groups -----
    { url: "groups", component: Groups },
    { url: "add-groups", component: AddGroups },
    { url: "edit-groups/:id", component: EditGroups },
    { url: "groups-users/:id", component: GroupsUsers },
    { url: "group-courses/:id", component: GroupCourses },
    { url: "group-files/:id", component: GroupFiles },

    // Admin Groups -----
    { url: "adm_groups", component: AdmGroups },
    { url: "adm_add-groups", component: AdmAddGroups },
    { url: "adm_edit-groups", component: AdmEditGroups },
    { url: "adm_groups-users", component: AdmGroupsUsers },
    { url: "adm_group-courses", component: AdmGroupCourses },
    { url: "adm_group-files", component: AdmGroupFiles },

    // Instructor Groups -----
    { url: "inst_groups", component: InstGroups },
    { url: "inst_add-groups", component: InstAddGroups },
    { url: "inst_edit-groups", component: InstEditGroups },
    { url: "inst_groups-users", component: InstGroupsUsers },
    { url: "inst_group-courses", component: InstGroupCourses },
    { url: "inst_group-files", component: InstGroupFiles },

    // Events -----
    { url: "events", component: Events },
    { url: "add-events", component: AddNotification },
    { url: "edit-events/:id", component: EditNotification },
    // { url: "customize-system-notification", component: CustomizeNotification },
    { url: "pending-notification", component: PendingNotification },

    //Admin Events -----
    { url: "adm_events", component: AdmEvents },
    { url: "adm_add-events", component: AdmAddNotification },
    { url: "adm_edit-events", component: AdmEditNotification },
    {
      url: "adm_customize-system-notification",
      component: AdmCustomizeNotification,
    },
    { url: "adm_pending-notification", component: AdmPendingNotification },

    //Import-Export
    { url: "su-import-user", component: SuImportUser },
    { url: "su-export-user", component: SuExportUser },

    ///Instructors  Pages path
    { url: "instructor-dashboard", component: InstructorDashboard },
    { url: "instructor-courses", component: InstructorCourses },
    { url: "instructor-schedule", component: InstructorSchedule },
    { url: "instructor-resources", component: InstructorResources },
    { url: "instructor-students", component: InstructorStudents },
    { url: "instructor-transactions", component: InstructorTransactions },
    { url: "instructor-liveclass", component: LiveClass },

    // Reports -----
    { url: "reports-overview", component: ReportOverview },
    { url: "user-reports", component: UserReports },
    { url: "course-reports", component: CourseReports },
    { url: "group-reports", component: GroupReports },
    { url: "scorm-reports", component: ScormReports },
    { url: "test-reports", component: TestReports },
    { url: "test-overview", component: TestOverview },
    { url: "test-analysis", component: TestAnalysis },
    { url: "survey-reports", component: SurveyReports },
    { url: "survey-overview", component: SurveyOverview },
    { url: "survey-analysis", component: SurveyAnalysis },
    { url: "assign-reports", component: AssignmentReports },
    { url: "ilt-reports", component: IltReports },
    { url: "custom-reports", component: CustomReports },
    { url: "infographics", component: Infographics },

    //Admin Reports -----
    { url: "adm_reports-overview", component: AdmReportOverview },
    { url: "adm_user-reports", component: AdmUserReports },
    { url: "adm_course-reports", component: AdmCourseReports },
    { url: "adm_group-reports", component: AdmGroupReports },
    { url: "adm_infographics", component: AdmInfographics },

    /////Accounts & Settings----
    // { url: "basic-settings", component: BasicSettings },
    // { url: "certificates", component: Certificates },
    // { url: "domains", component: Domain },
    // { url: "ecommerce", component: Ecommerce },
    // { url: "gamification", component: Gamification },
    // { url: "subscriptions", component: Subscription },
    // { url: "thoms-page", component: Thoms },
    // { url: "user-settings", component: UserSettings },

    /////Admin Accounts & Settings----
    { url: "adm_basic-settings", component: AdmBasicSettings },
    { url: "adm_certificates", component: AdmCertificates },
    { url: "adm_domains", component: AdmDomain },
    { url: "adm_ecommerce", component: AdmEcommerce },
    { url: "adm_gamification", component: AdmGamification },
    { url: "adm_subscriptions", component: AdmSubscription },
    { url: "adm_thoms-page", component: AdmThoms },
    { url: "adm_user-settings", component: AdmUserSettings },

    /////Trainings-----
    { url: "classroom", component: Classrooms },
    { url: "conference", component: Conferences },
    { url: "virtual-training", component: VirtualTraining },
    { url: "add-classroom", component: AddClassrooms },
    { url: "add-conference", component: AddConferences },
    { url: "add-virtual-trainings", component: AddVirtualTraining },
    { url: "edit-classroom/:id", component: EditClassroom },
    { url: "edit-conference/:id", component: EditConference },
    { url: "edit-virtual-trainings/:id", component: EditVirtual },
    { url: "info-classroom", component: ClassroomUsers },
    { url: "info-conference", component: ConferenceUsers },
    { url: "info-virtual-trainings", component: VirtualUsers },

    //Learner Training
    { url: "lclassroom", component: Lclassroom },
    { url: "lconference", component: Lconference },
    { url: "lvirtualtraining", component: Lvirtualtraining },

    // Calenders -----
    { url: "calender", component: Calender },
    { url: "add-c-event", component: AddCEvents },
    { url: "private-address", component: PrivateAddress },

    //Learner Calenders -----
    { url: "learn_calender", component: LearnCalender },

    // Discussions -----
    { url: "discussion", component: Discussions },
    { url: "add-Discussion", component: AddDiscussion },
    { url: "user-Discussion", component: UserDiscussion },
    { url: "st-profile", component: Profile },

    //Learner Discussions -----
    { url: "learn_discussion", component: LearnDiscussions },
    { url: "learn_add-Discussion", component: LearnAddDiscussion },
    { url: "learn_user-Discussion", component: LearnUserDiscussion },

    /// Apps
    { url: "app-profile", component: AppProfile },
    { url: "email-compose", component: Compose },
    { url: "email-inbox", component: Inbox },
    { url: "email-read", component: Read },
    { url: "app-calender", component: Calendar },
    { url: "post-details", component: PostDetails },

    /// Chart
    { url: "chart-sparkline", component: SparklineChart },
    { url: "chart-chartist", component: Chartist },
    { url: "chart-apexchart", component: ApexChart },
    { url: "chart-rechart", component: RechartJs },

    /// Scorms
    { url: "scorm-file", component: CoursesScorm },

    /// Plugin
    { url: "uc-select2", component: Select2 },
    { url: "uc-toastr", component: Toastr },

    /// Shop
    { url: "ecom-invoice", component: Invoice },

    /// Form
    { url: "form-element", component: Element },
    { url: "form-editor-summernote", component: SummerNote },

    /// pages
    { url: "page-register", component: Registration },
    { url: "page-lock-screen", component: LockScreen },
    { url: "login", component: Login },
    { url: "page-forgot-password", component: ForgotPassword },
    { url: "page-reset-password", component: Reset },
    { url: "page-error-400", component: Error400 },
    { url: "page-error-403", component: Error403 },
    { url: "page-error-404", component: Error404 },
    { url: "page-error-500", component: Error500 },
    { url: "page-error-503", component: Error503 },
  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}>
        {!pagePath && <Nav />}

        <div
          className={`${!pagePath ? "content-body" : ""}`}
          style={{ minHeight: window.screen.height - 45 }}>
          <div className={`${!pagePath ? "container-fluid" : ""}`}>
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>
        <br />
        {!pagePath && <Footer />}
      </div>
      <ScrollToTop />
    </>
  );
};

export default Markup;
