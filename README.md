# Mental Health Support Platform

A comprehensive React web application designed to provide mental health support for students. The platform offers resources, counseling services, virtual therapy session scheduling, self-help tools, and peer-support forums.

## Features

### User Roles

#### Admin
- Add/update/delete mental health resources
- Manage counseling sessions (view, approve, update)
- Manage support groups
- View platform statistics

#### Student
- View and access mental health resources
- Schedule therapy/counseling sessions
- Join support groups
- View self-help articles, videos, and tools
- Manage profile

### Pages

#### Public Pages
- **Landing Page**: Welcome page with platform overview
- **About Page**: Information about the platform
- **Login Page**: User authentication
- **Signup Page**: New user registration

#### Student Pages
- **Dashboard**: Overview of student's activities and quick actions
- **Resources**: Browse mental health resources (articles, videos, tools)
- **Book Session**: Schedule therapy sessions with available therapists
- **Support Groups**: View and join peer support groups
- **Profile**: Manage personal information

#### Admin Pages
- **Dashboard**: Platform statistics and pending approvals
- **Manage Resources**: CRUD operations for mental health resources
- **Manage Sessions**: View, approve, and manage therapy sessions
- **Manage Support Groups**: CRUD operations for support groups

## Technology Stack

- **React** 18.2.0
- **React Router** 6.20.0
- **Context API** for state management
- **Pure CSS** for styling (no Tailwind CSS)
- **LocalStorage** for data persistence (mock backend)

## Project Structure

```
mentalhealthproject/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── mockApi.js          # Mock API functions
│   ├── components/
│   │   ├── Calendar.js         # Calendar component for booking
│   │   ├── Modal.js            # Reusable modal component
│   │   ├── Navbar.js           # Navigation bar
│   │   ├── ProtectedRoute.js   # Route protection
│   │   ├── Sidebar.js          # Sidebar navigation
│   │   ├── ToastContainer.js   # Toast notifications
│   │   └── *.css               # Component styles
│   ├── context/
│   │   ├── AuthContext.js      # Authentication context
│   │   └── ToastContext.js     # Toast notifications context
│   ├── data/
│   │   └── mockData.js         # Mock data
│   ├── pages/
│   │   ├── admin/              # Admin pages
│   │   ├── public/             # Public pages
│   │   └── student/            # Student pages
│   ├── App.js                  # Main app component
│   ├── App.css                 # Global app styles
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

### Step 3: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Demo Credentials

### Admin Account
- **Email**: admin@mentalhealth.com
- **Password**: admin123

### Student Account
- **Email**: student@mentalhealth.com
- **Password**: student123

You can also create new accounts through the signup page.

## Features Overview

### Authentication
- User login and signup with form validation
- Role-based access control (Admin/Student)
- Protected routes based on user role
- Session persistence using localStorage

### Form Validation
- Email format validation
- Password strength requirements (minimum 6 characters)
- Required field validation
- Real-time error messages

### UI Components
- **Responsive Design**: Mobile-first approach, works on all devices
- **Calm Color Scheme**: Mental-health-friendly soft colors
- **Loading Spinners**: Visual feedback during data loading
- **Toast Notifications**: Success/error messages
- **Modals**: For forms and confirmations
- **Calendar**: Interactive date picker for session booking
- **Cards**: Clean card-based layouts
- **Tables**: For admin data management

### State Management
- Context API for global state (authentication, toasts)
- Local component state for UI interactions
- localStorage for data persistence (simulating backend)

### Mock Data
- Pre-populated resources, therapists, sessions, and support groups
- Data persists in browser localStorage
- All CRUD operations work with mock API

## Key Functionalities

### Student Features
1. **View Resources**: Browse articles, videos, and tools by category
2. **Book Sessions**: Select therapist, date, and time for therapy sessions
3. **Join Groups**: Join peer support groups
4. **View Dashboard**: See upcoming sessions and quick stats

### Admin Features
1. **Manage Resources**: Create, edit, and delete mental health resources
2. **Approve Sessions**: Review and approve pending therapy sessions
3. **Manage Groups**: Create and manage support groups
4. **View Statistics**: See platform-wide statistics

## Design Philosophy

The application uses a calm, anxiety-free design with:
- Soft color palette (blues, greens, purples)
- Smooth transitions and animations
- Clean, minimal layouts
- Easy navigation
- Clear visual hierarchy
- Accessible form elements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- All API calls are simulated using localStorage
- Data persists across page refreshes
- No actual backend server required
- Perfect for demonstration and development

## Future Enhancements

Potential improvements for a production version:
- Real backend API integration
- User authentication with JWT tokens
- Email notifications
- Video conferencing integration
- Payment processing
- Advanced search and filtering
- Analytics dashboard
- Multi-language support

## License

This project is created for educational purposes.

## Support

For issues or questions, please refer to the project documentation or create an issue in the repository.

---

**Note**: This is a frontend-only application with mock data. For production use, integrate with a proper backend API.

