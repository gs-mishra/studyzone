/**
 * data.js
 * Handles data persistence using LocalStorage for the GTU CSE Portal.
 * Simulates a backend database for Semesters, Subjects, and Materials.
 */

const DB_KEYS = {
    MATERIALS: 'gtu_materials',
    ADMIN_SESSION: 'gtu_admin_session'
};

// Initial Seed Data
const INITIAL_DATA = [
    {
        id: 'mat_1',
        semester: 1,
        subject: 'Mathematics-1',
        subjectCode: '3110014',
        type: 'Notes',
        title: 'Ch-1 Matrices Notes',
        unit: 'Unit 1',
        description: 'Complete handwritten notes for Matrices including examples.',
        link: '#',
        date: '2023-10-15',
        status: 'Active',
        fileSize: '2.5 MB',
        pages: '12'
    },
    {
        id: 'mat_2',
        semester: 1,
        subject: 'Basic Electronics',
        subjectCode: '3110016',
        type: 'Books',
        title: 'B.L. Theraja Vol 1',
        unit: 'All Units',
        description: 'Standard reference book for Basic Electronics.',
        link: '#',
        date: '2023-11-02',
        status: 'Active',
        fileSize: '15.2 MB',
        pages: '450'
    },
    {
        id: 'mat_3',
        semester: 3,
        subject: 'Data Structures',
        subjectCode: '3130702',
        type: 'PYQ',
        title: 'Winter 2022 Question Paper',
        unit: 'Full Syllabus',
        description: 'Official GTU Question Paper for Winter Exam.',
        link: '#',
        date: '2024-01-10',
        status: 'Active',
        fileSize: '0.8 MB',
        pages: '4'
    },
    {
        id: 'mat_4',
        semester: 5,
        subject: 'Analysis of Algorithms',
        subjectCode: '3150703',
        type: 'Syllabus',
        title: 'GTU Syllabus 2024',
        unit: 'Syllabus',
        description: 'Official curriculum PDF.',
        link: '#',
        date: '2024-06-20',
        status: 'Active',
        fileSize: '0.5 MB',
        pages: '6'
    },
    {
        id: 'mat_5',
        semester: 4,
        subject: 'Operating System',
        subjectCode: '3140702',
        type: 'Lab Manual',
        title: 'OS Practical Manual',
        unit: 'Practical',
        description: 'List of experiments with code snippets.',
        link: '#',
        date: '2024-02-15',
        status: 'Active',
        fileSize: '3.1 MB',
        pages: '25'
    }
];

const Store = {
    init() {
        if (!localStorage.getItem(DB_KEYS.MATERIALS)) {
            localStorage.setItem(DB_KEYS.MATERIALS, JSON.stringify(INITIAL_DATA));
        }
    },

    getAll() {
        return JSON.parse(localStorage.getItem(DB_KEYS.MATERIALS) || '[]');
    },

    add(material) {
        const materials = this.getAll();
        const newMaterial = {
            id: 'mat_' + Date.now(),
            date: new Date().toISOString().split('T')[0],
            ...material
        };
        materials.push(newMaterial);
        localStorage.setItem(DB_KEYS.MATERIALS, JSON.stringify(materials));
        return newMaterial;
    },

    update(id, updatedFields) {
        let materials = this.getAll();
        const index = materials.findIndex(m => m.id === id);
        if (index !== -1) {
            materials[index] = { ...materials[index], ...updatedFields };
            localStorage.setItem(DB_KEYS.MATERIALS, JSON.stringify(materials));
            return materials[index];
        }
        return null;
    },

    getById(id) {
        return this.getAll().find(m => m.id === id);
    },

    delete(id) {
        let materials = this.getAll();
        materials = materials.filter(m => m.id !== id);
        localStorage.setItem(DB_KEYS.MATERIALS, JSON.stringify(materials));
    },

    // Filter helpers
    getBySemester(sem) {
        return this.getAll().filter(m => m.semester == sem);
    },

    getRecent(limit = 5) {
        return this.getAll().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
    },

    getStats() {
        const materials = this.getAll();
        const subjects = new Set(materials.map(m => m.subject)).size;
        // Count semesters with content
        const sems = new Set(materials.map(m => m.semester)).size;
        return {
            totalMaterials: materials.length,
            totalSubjects: subjects,
            activeSemesters: sems
        };
    }
};

const Auth = {
    login(username, password) {
        // Mock Login - in real app, verify with server
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem(DB_KEYS.ADMIN_SESSION, 'true');
            return true;
        }
        return false;
    },

    logout() {
        localStorage.removeItem(DB_KEYS.ADMIN_SESSION);
        window.location.href = 'index.html';
    },

    isAuthenticated() {
        return localStorage.getItem(DB_KEYS.ADMIN_SESSION) === 'true';
    },

    checkAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
        }
    }
};

// Initialize on load
Store.init();
