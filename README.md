# Web Application - Student Registration and Data Management System

## Overview

This is a lightweight web application developed as part of the Programming for Web course (PWEB). The application provides three main functionalities: student registration with form validation, Indonesian postal code search with cascading dropdown filtering, and dynamic product catalog with category-based filtering.

The project demonstrates fundamental web development concepts including form handling, data management with JSON, asynchronous data loading, and dynamic DOM manipulation using vanilla JavaScript.

## Project Structure

```
PWEB_W5_FormRegistrasi/
├── index.html              # Main HTML markup
├── css/
│   └── style.css          # Stylesheet definitions
├── js/
│   └── script.js          # Application logic
├── data/
│   ├── mahasiswa.json     # Student name database
│   ├── dosen.json         # Instructor name database
│   ├── postal.json        # Postal code reference data
│   └── products.json      # Product catalog data
└── README.md              # This file
```

## Features

### 1. Student Registration Module
- Form validation for student identification number (NIM) - 10 digit requirement
- Autocomplete functionality for student names with real-time filtering
- Autocomplete functionality for instructor selection
- Dynamic table display of registered students
- Delete and bulk clear operations on registration records
- In-memory data persistence within session

### 2. Postal Code Search Module
- Hierarchical dropdown navigation: Province → City → District
- Support for filtering by district (optional)
- Display of postal code results in tabular format
- Real-time dropdown population based on selections

### 3. Product Catalog Module
- Multi-level product filtering: Type → Brand → Series
- Dynamic product display with specifications
- Support for multiple product types (Laptop, Smartphone, Tablet)

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Data Format**: JSON
- **Architecture**: Single Page Application (SPA)
- **Async Operations**: Fetch API with async/await
- **DOM Manipulation**: Vanilla JavaScript (no framework dependencies)

## Installation

### Prerequisites
- Modern web browser with ES6 support (Chrome, Firefox, Safari, Edge)
- Local web server (recommended for proper CORS handling)

### Setup Instructions

1. Navigate to the project directory:
   ```bash
   cd PWEB_W5_FormRegistrasi
   ```

2. Start a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (with http-server package)
   npx http-server
   ```

3. Open browser and navigate to:
   ```
   http://localhost:8000
   ```

## Usage

### Student Registration

1. Fill in the student information form:
   - Enter student name (supports autocomplete from mahasiswa.json)
   - Enter NIM (must be exactly 10 digits)
   - Select semester level (1-8)
   - Enter course name
   - Enter instructor name (supports autocomplete from dosen.json)

2. Click "Daftar" to register the student
3. View registered students in the table below the form
4. Use "Hapus Semua" to clear all registrations

### Postal Code Search

1. Navigate to "Kode Pos" tab
2. Select a province from the dropdown
3. Select a city from the populated dropdown
4. Optionally select a district for detailed results
5. Click "Cari" to display postal codes
6. Results display in tabular format

### Product Catalog

1. Navigate to "Produk" tab
2. Select product type (Laptop, Smartphone, Tablet)
3. Select brand based on available type
4. Select series based on available brand
5. View product details with specifications and pricing

## Data Format Specifications

### mahasiswa.json
Array of student names for autocomplete functionality:
```json
[
  "Ahmad Fauzi",
  "Ahmad Rizki",
  "Aini Rahmawati",
  ...
]
```

### dosen.json
Array of instructor names for autocomplete functionality:
```json
[
  "Dr. Budi Santoso",
  "Prof. Siti Nurhaliza",
  "Ir. Joko Susilo",
  ...
]
```

### postal.json
Nested object structure for hierarchical postal code data:
```json
{
  "Jawa Barat": {
    "Bandung": {
      "Bandung Tengah": [
        { "kelurahan": "Cipaganti", "kodepos": "40131" },
        ...
      ]
    }
  }
}
```

### products.json
Multi-level product catalog structure:
```json
{
  "laptop": {
    "merek": {
      "asus": {
        "label": "ASUS",
        "seri": {
          "ROG Zephyrus": {
            "products": [
              {
                "name": "ROG Zephyrus G14 2024",
                "price": "Rp 22.999.000",
                "icon": "💻",
                "spec": "..."
              }
            ]
          }
        }
      }
    }
  }
}
```

## File Descriptions

### index.html (170 lines)
Main HTML document containing:
- Navigation tabs for module switching
- Form elements for student registration
- Dropdown selectors for postal code search
- Container for dynamic product display

### css/style.css (353 lines)
Stylesheet covering:
- Layout and responsive design
- Form styling and states
- Table styling and hover effects
- Dropdown and autocomplete appearance
- Mobile responsiveness (768px breakpoint)

### js/script.js (290 lines)
Application logic including:
- Data loading from JSON files using Fetch API
- Tab navigation functionality
- Form validation and submission handling
- Autocomplete filtering and selection
- Postal code cascade dropdown management
- Product catalog filtering and display
- DOM manipulation and event handling

## Browser Compatibility

- Chrome/Chromium 60+
- Firefox 55+
- Safari 10.1+
- Edge 15+

Requires ES6 support for Fetch API and arrow functions.

## Performance Considerations

- JSON files are loaded asynchronously on application initialization
- Data remains in memory during session for fast filtering
- DOM updates are performed efficiently using innerHTML
- No external dependencies reduce initial load time

## Known Limitations

- Data persistence is session-only; no server-side storage implemented
- Autocomplete limited to 5 suggestions per keystroke
- No advanced search or sorting capabilities in postal code module
- Product pricing is static and hardcoded

## Future Enhancements

- Integration with backend API for data persistence
- Database-driven postal code and product data
- Advanced search and filtering capabilities
- Export registration data to CSV or PDF
- User authentication and role-based access
- Mobile-optimized interface improvements

## Development Notes

All functionality operates client-side without server requirements. The application uses the Fetch API for asynchronous data loading, requiring a local HTTP server to avoid CORS restrictions.

## License

Educational Use - Part of PWEB Course Assignment

## Author

Farhan - Information Systems Student