import express from 'express';
import cors from 'cors';
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// Sample API endpoint to fetch employee data
app.get('/api/employees', (req, res) => {
  const employees = [
    {
      name: 'John Doe',
      designation: 'Software Engineer',
      department: 'IT',
      salary: 60000,
      profileImage: 'https://via.placeholder.com/150'
    },
    {
      name: 'Jane Smith',
      designation: 'Project Manager',
      department: 'Management',
      salary: 80000,
      profileImage: 'https://via.placeholder.com/150'
    }
  ];
  res.json(employees);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
