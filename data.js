// Dummy data for CivicConnect application
const dummyData = {
    issues: [
        {
            id: 'CIV001',
            title: 'Pothole on Main Street',
            description: 'Large pothole causing damage to vehicles. Located near the intersection with Oak Avenue.',
            category: 'Road',
            status: 'Pending',
            location: 'Main Street, Downtown',
            date: '2024-01-15',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            timeline: [
                { status: 'Pending', date: '2024-01-15', description: 'Issue reported' },
                { status: 'In Progress', date: '2024-01-16', description: 'Under review by road maintenance team' },
                { status: 'Resolved', date: '2024-01-20', description: 'Pothole filled and road resurfaced' }
            ]
        },
        {
            id: 'CIV002',
            title: 'Garbage Collection Missed',
            description: 'Garbage collection was missed for our building this week. Trash is accumulating.',
            category: 'Garbage',
            status: 'In Progress',
            location: '123 Oak Avenue, Residential Area',
            date: '2024-01-14',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            timeline: [
                { status: 'Pending', date: '2024-01-14', description: 'Issue reported' },
                { status: 'In Progress', date: '2024-01-15', description: 'Scheduled for collection tomorrow' }
            ]
        },
        {
            id: 'CIV003',
            title: 'Water Leak in Park',
            description: 'Water fountain in Central Park has been leaking for several days, wasting water.',
            category: 'Water',
            status: 'Resolved',
            location: 'Central Park, City Center',
            date: '2024-01-10',
            image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            timeline: [
                { status: 'Pending', date: '2024-01-10', description: 'Issue reported' },
                { status: 'In Progress', date: '2024-01-11', description: 'Maintenance team dispatched' },
                { status: 'Resolved', date: '2024-01-12', description: 'Leak repaired and fountain restored' }
            ]
        },
        {
            id: 'CIV004',
            title: 'Street Light Out',
            description: 'Street light on Elm Street has been out for a week, making the area unsafe at night.',
            category: 'Electricity',
            status: 'Pending',
            location: 'Elm Street, Near School',
            date: '2024-01-18',
            image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            timeline: [
                { status: 'Pending', date: '2024-01-18', description: 'Issue reported' }
            ]
        },
        {
            id: 'CIV005',
            title: 'Broken Sidewalk',
            description: 'Large crack in sidewalk causing tripping hazard for pedestrians.',
            category: 'Road',
            status: 'In Progress',
            location: 'Pine Street, Business District',
            date: '2024-01-16',
            image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            timeline: [
                { status: 'Pending', date: '2024-01-16', description: 'Issue reported' },
                { status: 'In Progress', date: '2024-01-17', description: 'Repair scheduled for next week' }
            ]
        },
        {
            id: 'CIV006',
            title: 'Overflowing Trash Bin',
            description: 'Public trash bin at bus stop is overflowing and attracting pests.',
            category: 'Garbage',
            status: 'Resolved',
            location: 'Bus Stop, Main Street',
            date: '2024-01-12',
            image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            timeline: [
                { status: 'Pending', date: '2024-01-12', description: 'Issue reported' },
                { status: 'In Progress', date: '2024-01-13', description: 'Cleaned and emptied' },
                { status: 'Resolved', date: '2024-01-13', description: 'Issue resolved' }
            ]
        },
        {
            id: 'CIV007',
            title: 'Water Pressure Low',
            description: 'Water pressure has been very low in our apartment building for the past few days.',
            category: 'Water',
            status: 'Pending',
            location: '456 Maple Avenue, Apartment Complex',
            date: '2024-01-19',
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            timeline: [
                { status: 'Pending', date: '2024-01-19', description: 'Issue reported' }
            ]
        },
        {
            id: 'CIV008',
            title: 'Power Outage',
            description: 'Frequent power outages in our neighborhood affecting daily life.',
            category: 'Electricity',
            status: 'In Progress',
            location: 'Sunset Boulevard, Residential',
            date: '2024-01-17',
            image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            timeline: [
                { status: 'Pending', date: '2024-01-17', description: 'Issue reported' },
                { status: 'In Progress', date: '2024-01-18', description: 'Electrical team investigating' }
            ]
        }
    ],
    
    // Analytics data
    analytics: {
        categoryCounts: {
            'Road': 2,
            'Garbage': 2,
            'Water': 2,
            'Electricity': 2
        },
        statusCounts: {
            'Pending': 3,
            'In Progress': 3,
            'Resolved': 2
        }
    },
    
    // Demo users
    users: [
        {
            email: 'citizen@demo.com',
            password: 'password123',
            type: 'citizen',
            name: 'John Citizen'
        }
    ]
};

// Helper functions for data manipulation
const DataService = {
    // Get all issues
    getAllIssues: () => dummyData.issues,
    
    // Get issue by ID
    getIssueById: (id) => dummyData.issues.find(issue => issue.id === id),
    
    // Filter issues by category
    getIssuesByCategory: (category) => {
        if (!category) return dummyData.issues;
        return dummyData.issues.filter(issue => issue.category === category);
    },
    
    // Filter issues by status
    getIssuesByStatus: (status) => {
        if (!status) return dummyData.issues;
        return dummyData.issues.filter(issue => issue.status === status);
    },
    
    // Filter issues by both category and status
    getFilteredIssues: (category, status) => {
        let filtered = dummyData.issues;
        
        if (category) {
            filtered = filtered.filter(issue => issue.category === category);
        }
        
        if (status) {
            filtered = filtered.filter(issue => issue.status === status);
        }
        
        return filtered;
    },
    
    // Search issues by title or description
    searchIssues: (query) => {
        if (!query) return dummyData.issues;
        const lowercaseQuery = query.toLowerCase();
        return dummyData.issues.filter(issue => 
            issue.title.toLowerCase().includes(lowercaseQuery) ||
            issue.description.toLowerCase().includes(lowercaseQuery) ||
            issue.location.toLowerCase().includes(lowercaseQuery)
        );
    },
    
    // Add new issue
    addIssue: (issueData) => {
        const newIssue = {
            id: `CIV${String(dummyData.issues.length + 1).padStart(3, '0')}`,
            title: issueData.title,
            description: issueData.description,
            category: issueData.category,
            status: 'Pending',
            location: issueData.location,
            date: new Date().toISOString().split('T')[0],
            image: issueData.image,
            timeline: [
                { status: 'Pending', date: new Date().toISOString().split('T')[0], description: 'Issue reported' }
            ]
        };
        
        dummyData.issues.unshift(newIssue);
        return newIssue;
    },
    
    // Update issue status
    updateIssueStatus: (id, newStatus) => {
        const issue = dummyData.issues.find(issue => issue.id === id);
        if (issue) {
            issue.status = newStatus;
            issue.timeline.push({
                status: newStatus,
                date: new Date().toISOString().split('T')[0],
                description: `Status updated to ${newStatus}`
            });
            return issue;
        }
        return null;
    },
    
    // Get analytics data
    getAnalytics: () => dummyData.analytics,
    
    // Authenticate user
    authenticateUser: (email, password) => {
        return dummyData.users.find(user => 
            user.email === email && user.password === password
        );
    }
};