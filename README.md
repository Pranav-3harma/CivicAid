# CivicConnect - Citizen Issue Reporting Platform

A frontend-only web application for reporting and tracking civic issues in your community.

## Features

- **Home Page**: Clean landing page with platform description and call-to-action
- **Report Issue**: Form to submit civic issues with image upload preview
- **View Issues**: Browse all reported issues with filtering by category and status
- **Complaint Tracking**: Track individual issues with status timeline
- **Admin Dashboard**: Manage all issues with analytics and search functionality
- **Login System**: Mock authentication for citizens and administrators

## File Structure

```
CivicConnect/
├── index.html          # Main HTML file with all pages
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality and routing
├── data.js             # Dummy data and data service functions
└── README.md           # This file
```

## How to Use

1. **Open the Application**: Simply open `index.html` in your web browser
2. **Navigate**: Use the navigation menu to move between different pages
3. **Report Issues**: Fill out the form on the Report Issue page
4. **View Issues**: Browse and filter issues on the View Issues page
5. **Track Complaints**: Enter a complaint ID to see its status timeline
6. **Admin Access**: Use the demo credentials to access admin features

## Demo Credentials

### Citizen Login
- Email: `citizen@demo.com`
- Password: `password123`

### Admin Login
- Email: `admin@demo.com`
- Password: `admin123`

## Sample Data

The application comes with 8 pre-loaded sample issues covering different categories:
- Road issues (potholes, broken sidewalks)
- Garbage collection problems
- Water-related issues (leaks, low pressure)
- Electrical problems (street lights, power outages)

## Features Overview

### Issue Categories
- **Road**: Potholes, broken sidewalks, road damage
- **Garbage**: Collection issues, overflowing bins
- **Water**: Leaks, low pressure, water quality
- **Electricity**: Street lights, power outages

### Issue Statuses
- **Pending**: Newly reported, awaiting review
- **In Progress**: Being worked on by relevant department
- **Resolved**: Issue has been fixed

### Admin Features
- View all issues in a table format
- Update issue statuses
- Search and filter issues
- View analytics with charts showing:
  - Issues by category (pie chart)
  - Issues by status (bar chart)

## Technical Details

- **Frontend Only**: No backend required, all data stored in JavaScript
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Chart.js Integration**: For analytics visualization
- **Image Preview**: Shows uploaded images before submission
- **Real-time Filtering**: Instant filtering of issues by category and status

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

You can easily customize the application by:
- Modifying the dummy data in `data.js`
- Updating styles in `styles.css`
- Adding new features in `script.js`
- Extending the HTML structure in `index.html`

## Future Enhancements

Potential improvements for a real-world implementation:
- Backend API integration
- Real user authentication
- Email notifications
- GPS location integration
- Photo upload to cloud storage
- Real-time status updates
- Mobile app development
















