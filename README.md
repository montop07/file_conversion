# DOCX to PDF File Conversion

A simple Node.js-based application that allows users to upload `.docx` files and convert them into properly formatted PDF files.

---

## Features
- Upload `.docx` files.
- Converts `.docx` to `.pdf` with proper text formatting.
- Automatically cleans up temporary files after conversion.
- Supports Docker for easy setup and deployment.

---

## Prerequisites
Before running this project, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://www.docker.com/) (for containerized deployment)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository_url>
cd <repository_folder>


### 2. Install depedencies
```bash
npm install

### 3. Run the application
```bash
node app.js

The application will start running on http://localhost:3000
and on path /upload-docx, we can upload any docx file and click Upload, we will get a downloaded `pdf` file of the above docx file.




