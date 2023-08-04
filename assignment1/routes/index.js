var express = require('express');
var router = express.Router();
const app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/completedCourse', function(req, res, next) {
  res.render('completedCourse', { 
    id: ["n01", "n02", "n03",],
    name: ["Charles", "Eliza", "Harry"],
    department: ["IT", "Medicine", "Economony"],
    description: ["Computer Programming", "Specialized Surgery", "macroeconomics"],
    grades: [66, 78, 82]
    },
  );
});

app.get('/', (req, res) => {
  const student = {
    id: ["n01", "n02", "n03",],
    name: ["Charles", "Eliza", "Harry"],
    department: ["IT", "Medicine", "Economony"],
    semester: 4,
    coursesEnrolled: ['Java', 'Web Application', 'Python'],
    coursesCompleted: [ 'Data Structures', 'Operating System'], 
  };

app.get('/', (req, res) => {
  const students = [
    {
      id: ["n01"],
      name: ["Charles"],
      department: ["IT"],
      semester: ["4"],
      coursesEnrolled: ["Java", "Python"],
      coursesCompleted: ["Data Structures"]
    },
  ];
  
  const courses = [
    {
      id: ["c1"],
      name: ["Java"],
      department: ["IT"],
      description: ["Computer Programming"],
      seatsRemaining: 5
    },
    {
      id: ["c2"],
      name: ["Surgery"],
      department: ["Medicine"],
      description: ["Specialized Surgery"],
      seatsRemaining: 3
    },
    {
      id: ["c3"],
      name: ["General Macro Economy"],
      department: ["Economony"],
      description: ["macroeconomics"],
      seatsRemaining: 2
    },
  ];

app.get('/students', (req, res) => {
  res.send(students);
});

app.get('/ongoing-courses', (req, res) => {
  res.send(ongoingCourses);
});

app.get('/students/:id', (req, res) => {
  let student = students.find(student => student.id === Number(req.params.id));;
  if (!student) { 
    res.status(404).send('No Student was found in the system');
  } else {
    let averageGrade = grades((a, b) => a + b) / grades;
  res.json({student: student, averageGrade: averageGrade});
  }

app.get('/filterCourse', (req, res) => {
  res.render('filterCourse');
});

app.get('/filterform', (req, res) => {
  res.render('filterForm');
});


app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});

module.exports = router;
