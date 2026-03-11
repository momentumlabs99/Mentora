# Login to Logout Flow

This document provides detailed flowcharts for the complete user session lifecycle from login to logout.

---

## Table of Contents

1. [Complete Login Flow](#complete-login-flow)
2. [Dashboard & Navigation Flow](#dashboard--navigation-flow)
3. [User Action Flows by Role](#user-action-flows-by-role)
4. [Logout Flow](#logout-flow)

---

## Complete Login Flow

```mermaid
flowchart TD
    Start([User Opens Application]) --> LoginScreen[Login Screen]
    LoginScreen --> Input{Input Credentials}
    
    Input -->|Email & Password| Submit[Click Login Button]
    
    Submit --> APIRequest[POST /api/auth/login]
    APIRequest --> AuthService[Auth Service]
    AuthService --> Validate{Validate Credentials}
    
    Validate -->|Invalid| Error[401 Unauthorized]
    Validate -->|Valid| UserFound[User Retrieved]
    
    Error --> LoginScreen
    
    UserFound --> JWTGenerate[JWT Service<br/>Generate Token]
    JWTGenerate --> TokenCreated[Token Created<br/>24hr Expiration]
    
    TokenCreated --> AttachUser[Attach NGO Info<br/>if NGO Role]
    AttachUser --> Response[200 OK Response]
    
    Response --> ClientToken[Store Token Locally<br/>localStorage/sessionStorage]
    ClientToken --> Redirect[Redirect to Dashboard]
    
    Redirect --> Dashboard([User Dashboard])
    
    style Start fill:#e1f5ff
    style Screen fill:#e1ffe1
    style Dashboard fill:#99ff99
    style Error fill:#ffdb4d
```

### Login Response Structure

```mermaid
graph LR
    Login[POST /api/auth/login] --> Response[200 OK Response]
    
    Response --> UserData[user object]
    Response --> NGOData[ngo object<br/>null if not NGO]
    Response --> Token[token<br/>JWT String]
    
    UserData --> UFields[id, email, name, role,<br/>organization, studentId, branchId]
    NGOData --> NFields[ngoId, name, email,<br/>registrationNumber, description,<br/>country, status]
    
    style Login fill:#e1f5ff
    style Response fill:#e1ffe1
    style UserData fill:#e1f5ff
    style NGOData fill:#fff4e1
```

---

## Dashboard & Navigation Flow

```mermaid
flowchart TD
    Dashboard([User Dashboard]) --> RoleCheck{Check User Role}
    
    RoleCheck -->|ADMIN| AdminView[Admin Dashboard<br/>System Overview]
    RoleCheck -->|NGO| NGOView[NGO Dashboard<br/>Funds & Donations]
    RoleCheck -->|STUDENT| StudentView[Student Dashboard<br/>Courses & Certificates]
    
    subgraph "Navigation Menu"
        NM1[Courses]
        NM2[Scholarships]
        NM3[Certificates]
        NM4[Profile/Settings]
        NM5[Logout]
    end
    
    AdminView --> NM1
    AdminView --> NM2
    AdminView --> NM4
    AdminView --> NM5
    AdminView -.-> NM3
    
    NGOView --> NM1
    NGOView --> NM2
    NGOView --> NM3
    NGOView --> NM4
    NGOView --> NM5
    
    StudentView --> NM1
    StudentView --> NM3
    StudentView --> NM4
    StudentView --> NM5
    StudentView -.-> NM2
    
    subgraph "Menu Actions"
        NM1 --> List[View Lists]
        NM2 --> Create[Create New]
        NM3 --> View[View Details]
        NM4 --> Edit[Edit Profile]
        NM5 --> Confirm[Confirm Logout]
    end
    
    Confirm --> LogoutFlow[Initiate Logout]
    
    style Dashboard fill:#99ff99
    style LogoutFlow fill:#ffdb4d
```

---

## User Action Flows by Role

### ADMIN User Flow

```mermaid
flowchart TD
    AdminLogin([Admin Logged In]) --> Admin[Admin Dashboard]
    
    Admin --> Action1{Select Action}
    
    Action1 -->|View Courses| Courses[View All Courses]
    Action1 -->|Create Course| NewCourse[Create New Course]
    Action1 -->|View Certs| AdminCerts[View All Certificates]
    Action1 -->|View Users| Users[Manage Users]
    Action1 -->|View Stats| AdminStats[System Statistics]
    
    Courses --> CoursesList[All Courses List]
    CoursesList --> CourseAction{Select Course}
    CourseAction -->|View| CourseDetail[Course Details]
    CourseAction -->|Edit| EditCourse[Edit Course]
    
    NewCourse --> CourseForm[Course Form]
    CourseForm --> SubmitCourse[POST /api/courses]
    SubmitCourse --> |Success| CourseSuccess[Course Created ✓]
    SubmitCourse ||Fail| CourseFail[Error ❌]
    
    CourseSuccess --> Admin
    CourseFail --> CourseForm
    
    AdminCerts --> CertsList[All Certificates List]
    CertsList --> VerifyAction[Verify Certificate]
    
    VerifyAction --> PublicLink[Open Public Link<br/>/api/verify/:certId]
    PublicLink --> VerifyResult{Valid?}
    VerifyResult -->|Yes| ValidCert[✓ Valid Certificate]
    VerifyResult -->|No| InvalidCert[✗ Invalid/Expired]
    
    Admin --> Action2{Continue or Logout?}
    Action2 -->|Continue| Admin
    Action2 -->|Logout| Logout
    
    style AdminLogin fill:#e1ffe1
    style Logout fill:#ffdb4d
    style CourseSuccess fill:#99ff99
    style CourseFail fill:#ffdb4d
```

### NGO User Flow

```mermaid
flowchart TD
    NGOLogin([NGO Logged In]) --> NGO[NGO Dashboard]
    
    NGO --> NGOMenu{Select Menu}
    
    NGOMenu -->|My Funds| MyFunds[My Scholarship Funds]
    NGOMenu -->|Create Fund| CreateFund[Create New Fund]
    NGOMenu -->|Add Donation| Donation[Add Donation]
    NGOMenu -->|Manage Funds| Manager[Manage Allocations]
    NGOMenu -->|View Certs| NGOCerts[Verified Certificates]
    NGOMenu -->|Profile| Profile[NGO Profile]
    
    MyFunds --> FundsList[My Funds List]
    FundsList --> FundSelect{Select Fund}
    FundSelect -->|View| FundDetail[Fund Details & Stats]
    FundSelect -->|Edit| EditFund[Edit Fund]
    
    CreateFund --> FundForm[Fund Creation Form]
    FundForm --> SubmitFund[POST /api/scholarships/funds<br/>Authorization: Bearer Token]
    SubmitFund --> |Success| FundSuccess[Fund Created ✓<br/>Owner Auto-Attached]
    SubmitFund ||Fail| FundFail[Error ❌]
    
    Donation --> DonationForm[Donation Form]
    DonationForm --> SubmitDon[POST /api/scholarships/donations]
    SubmitDon --> |Success| DonSuccess[Donation Recorded ✓]
    SubmitDon ||Fail| DonFail[Error ❌]
    
    Manager --> AllocsList[Allocations List]
    AllocsList --> AllocAction{Allocation Status}
    AllocAction -->|Pending| Approve[Approve Allocation]
    AllocAction -->|Approved| Disburse[Disburse Funds]
    
    Disburse --> DisburseForm[Disbursement Form]
    DisburseForm --> SubmitDisburse[POST /api/scholarships/disburse]
    SubmitDisburse --> |Success| DisbSuccess[Funds Disbursed ✓]
    SubmitDisburse ||Fail| DisbFail[Error ❌]
    
    FundSuccess --> NGO
    FundFail --> FundForm
    DonSuccess --> NGO
    DonFail --> DonationForm
    Approve --> NGO
    DisbSuccess --> NGO
    DisbFail --> DisburseForm
    
    NGO --> NGOLogout{Logout?}
    NGOLogout -->|Yes| Logout
    NGOLogout -->|No| NGOMenu
    
    style NGOLogin fill:#fff4e1
    style Logout fill:#ffdb4d
    style FundSuccess fill:#99ff99
    style FundFail fill:#ffdb4d
```

### STUDENT User Flow

```mermaid
flowchart TD
    StudentLogin([Student Logged In]) --> Student[Student Dashboard]
    
    Student --> StudentMenu{Select Menu}
    
    StudentMenu -->|Browse Courses| Browse[Browse Available Courses]
    StudentMenu -->|My Courses| MyCourses[My Enrolled Courses]
    StudentMenu -->|Progress| UpdateProg[Update Progress]
    StudentMenu -->|My Certs| StudentCerts[My Certificates]
    StudentMenu -->|My Scholarships| StudentSchols[My Scholarships]
    StudentMenu -->|Profile| StudentProfile[Student Profile]
    
    Browse --> Catalog[Course Catalog]
    Catalog --> SelectCourse{Select Course}
    SelectCourse -->|Enroll| EnrollBtn[Enroll Button]
    SelectCourse -->|Details| CourseDetails[Course Details]
    
    EnrollBtn --> EnrollAction[POST /api/courses/enroll]
    EnrollAction --> |Success| Enrolled[Enrolled ✓]
    EnrollAction ||Fail| EnrollFail[Course Full/Error]
    
    MyCourses --> EnrollList[Active Enrollments]
    EnrollList --> CourseSelect{Select Course}
    CourseSelect --> ViewProg[View Progress]
    CourseSelect --> ViewModules[View Modules]
    
    UpdateProg --> ProgForm[Progress Update Form]
    ProgForm --> SubmitProg[PUT /api/courses/{id}/progress]
    SubmitProg --> |Success| ProgSuccess[Progress Updated ✓]
    SubmitProg ||Fail| ProgFail[Error ❌]
    
    StudentSchols --> ScholarList[My Scholarships]
    ScholarList --> ScholarAction{Scholarship Status}
    ScholarAction -->|Allocated| Allocated[View Allocation Details]
    ScholarAction -->|Disbursed| ViewDisb[View Disbursement]
    
    StudentCerts --> CertPublic[Public Verification Links]
    CertPublic --> ShareAction[Share Certificate]
    
    ShareAction --> PublicLink[/api/verify/:certId]
    PublicLink --> VerifyResult[Verification Result]
    
    Enrolled --> Student
    EnrollFail --> Catalog
    ProgSuccess --> Student
    ProgFail --> ProgForm
    Allocated --> Student
    ViewDisb --> Student
    VerifyResult --> Student
    
    Student --> StudentLogout{Logout?}
    StudentLogout -->|Yes| Logout
    StudentLogout -->|No| StudentMenu
    
    style StudentLogin fill:#e1f5ff
    style Logout fill:#ffdb4d
    style Enrolled fill:#99ff99
    style ProgSuccess fill:#99ff99
```

---

## Logout Flow

```mermaid
flowchart TD
    LogoutBtn([User Clicks Logout]) --> ConfirmDialog[Confirm Logout Dialog]
    
    ConfirmDialog --> UserChoice{Confirm Action?}
    
    UserChoice -->|Cancel| Cancel[Cancel<br/>Return to Dashboard]
    UserChoice -->|Confirm| LogoutAction[Initiate Logout]
    
    Cancel --> Dashboard([Return to Dashboard])
    
    LogoutAction --> ClearToken[Clear Token<br/>localStorage/sessionStorage]
    ClearToken --> APICall[POST /api/auth/logout<br/>Authorization: Bearer Token]
    
    APICall --> Server[API Server]
    Server --> LogoutResp[Success Response]
    
    LogoutResp --> ClientClear[Clear User Data<br/>from Client State]
    ClientClear --> Redirect[Redirect to Login Screen]
    
    Redirect --> LoginScreen([Login Screen])
    Redirect --> |State| Cleared[User State Cleared]
    
    subgraph "Cleared Items"
        Items[✓ JWT Token<br/>✓ User Data<br/>✓ NGO Data<br/>✓ Cached Data<br/>✓ Session Storage]
    end
    
    ClientClear --> Items
    
    style LogoutBtn fill:#ffdb4d
    style LoginScreen fill:#e1f5ff
    style Dashboard fill:#99ff99
    style Items fill:#99ff99
```

### Logout Implementation Details

```mermaid
sequenceDiagram
    participant User as User
    participant Client as Frontend
    participant API as API Server
    participant Storage as Local Storage
    
    User->>Client: Click Logout Button
    Client->>User: Show Confirmation Dialog
    User->>Client: Confirm Logout
    
    Client->>Storage: Remove Token
    Client->>Storage: Remove User Data
    Client->>Storage: Clear Session Data
    
    Client->>API: POST /api/auth/logout<br/>Authorization: Bearer {token}
    
    Note over API: Logout is stateless<br/>Doesn't invalidate token on server<br/>Client handles cleanup
    
    API-->>Client: 200 OK<br/>message: 'Logged out successfully'
    
    Client->>Client: Clear Application State
    Client->>Client: Redirect to Login
    
    Note over Client,Storage: All user data removed<br/>Ready for fresh login
```

---

## Complete Session Lifecycle

```mermaid
stateDiagram-v2
    [*] --> NotAuthenticated: User Opens App
    
    NotAuthenticated --> Authenticating: Enters Credentials
    Authenticating --> Authenticated: Login Successful
    
    Authenticated --> SessionStart: Token Stored<br/>User Logged In
    
    SessionStart --> ActiveSession: Using Application
    
    subgraph "Possible Actions During Session"
        ActiveSession --> AdminActions: ADMIN Actions
        ActiveSession --> NGOActions: NGO Actions
        ActiveSession --> StudentActions: STUDENT Actions
        
        AdminActions --> ActiveSession
        NGOActions --> ActiveSession
        StudentActions --> ActiveSession
    end
    
    ActiveSession --> TokenExpired{Token Expired?}
    ActiveSession --> LogoutInit: User Clicks Logout
    
    TokenExpired -->|Yes| AutoLogout: Auto Logout
    TokenExpired -->|No| ActiveSession
    
    LogoutInit --> LoggingOut: Confirm Logout
    LoggingOut --> SessionEnd: Token Cleared
    AutoLogout --> SessionEnd
    
    SessionEnd --> LoggedOut: Redirect to Login
    LoggedOut --> NotAuthenticated
    
    note right of SessionStart
        Token stored in localStorage<br/>User data loaded<br/>Dashboard displayed
    end note
    
    note right of TokenExpired
        Token expires after 24 hours<br/>Next API call returns 401
    end note
    
    note right of SessionEnd
        All local storage cleared<br/>Application state reset<br/>Ready for new user
    end note
```

---

## Token Lifecycle

```mermaid
flowchart LR
    Login[Login Request] --> Generate[Generate JWT Token]
    Generate --> Store[Store Token<br/>localStorage/sessionStorage]
    
    Store --> Use[Use Token in Requests<br/>Authorization: Bearer token]
    Use --> Verify[Server Verifies Token]
    
    Verify --> Valid{Token Valid?}
    Valid -->|Yes| Success[Request Succeeds]
    Valid -->|No| Fail[401 Unauthorized]
    
    Success --> Refresh{Token Near Expiry?}
    Refresh -->|Yes| NewToken[Generate New Token<br/>Optional Refresh]
    Refresh -->|No| Use
    
    Fail --> Expired[Token Expired]
    
    Fail --> ManualLogout[User Logs Out]
    Use --> ManualLogout
    
    NewToken --> Store
    Expired --> ManualLogout
    ManualLogout --> Clear[Clear Token]
    Clear --> Login
    
    style Login fill:#e1f5ff
    style Success fill:#99ff99
    style Fail fill:#ffdb4d
    style Clear fill:#fff4e1
```

---

## Error Handling During Session

```mermaid
flowchart TD
    Actions([User Action]) --> APIRequest[API Request<br/>With Token]
    
    APIRequest --> Response{Response Status}
    
    Response -->|200 OK| Success[Success<br/>Proceed]
    Response -->|401 Unauthorized| Unauth[Token Invalid/Expired]
    Response -->|403 Forbidden| Forbidden[Insufficient Role]
    Response -->|404 Not Found| NotFound[Resource Missing]
    Response -->|500 Error| ServerError[Server Error]
    
    Unauth --> UnauthAction{Token Expired?}
    UnauthAction -->|Yes| AutoLogout[Auto Logout to Login]
    UnauthAction -->|No| PromptLogin[Show Login Modal]
    
    Forbidden --> RoleError[Show Role Error<br/>Access Denied]
    NotFound --> ShowNotFound[Show 404 Page]
    ServerError --> ShowError[Show Error Message]
    
    Success --> Continue([Continue Action])
    PromptLogin --> AuthNew[User Authenticates]
    AutoLogout --> LoginScreen
    AuthNew --> LoginScreen
    
    LoginScreen --> Actions
    
    style Success fill:#99ff99
    style Unauth fill:#ffe1e1
    style Forbidden fill:#ffdb4d
    style NotFound fill:#ffdb4d
    style ServerError fill:#ffdb4d
    style AutoLogout fill:#ff9999
```

---

## Role-Specific Login Experience

```mermaid
flowchart TD
    login([Login Screen]) --> AllRoles[All Roles Email/Password]
    
    AllRoles --> Success[Success → JWT Generated]
    
    Success --> RoleRoutes{User Role?}
    
    RoleRoutes -->|ADMIN| AdminRoute[/api/routes/admin]
    RoleRoutes -->|NGO| NGORoute[/api/routes/ngo-dashboard]
    RoleRoutes -->|STUDENT| StudentRoute[/api/routes/student-dashboard]
    
    AdminRoute --> AdminDash[Admin Dashboard]
    NGORoute --> NGODash[NGO Dashboard<br/>+ NGO Profile Loaded]
    StudentRoute --> StudentDash[Student Dashboard<br/>+ Student Profile Loaded]
    
    AdminDash --> AdminMenu
    NGODash --> NGOMenu
    StudentDash --> StudentMenu
    
    subgraph "Dashboard Features by Role"
        AdminMenu[✓ System Stats<br/>✓ User Management<br/>✓ All Resources<br/>✓ Logs & Audit]
        NGOMenu[✓ My Funds<br/>✓ Add Donation<br/>✓ Allocate Scholarships<br/>✓ View NGO Profile]
        StudentMenu[✓ My Courses<br/>✓ My Certificates<br/>✓ My Scholarships<br/>✓ Progress Tracking]
    end
    
    style login fill:#e1f5ff
    style AdminRoute fill:#e1ffe1
    style NGORoute fill:#fff4e1
    style StudentRoute fill:#e1f5ff
```

---

## Related Documentation

- [API Testing Guide](API_TESTING_GUIDE.md) - Complete login/logout API examples
- [RBAC API Documentation](RBAC_API_DOCUMENTATION.md) - Role-based access control details
- [System Flowchart](SYSTEM_FLOWCHART.md) - Complete system architecture
- [Authentication Service](../backend/services/auth.service.js) - Auth implementation
- [Auth Routes](../backend/routes/auth.routes.js) - Login/logout endpoints
