function App() {
  const students = [
    { id: 1, name: "Ali", marks: 95 },
    { id: 2, name: "Ahmed", marks: 85 },
    { id: 3, name: "Sara", marks: 75 },
    { id: 4, name: "Ayesha", marks: 65 },
    { id: 5, name: "Hamza", marks: 55 },
    { id: 6, name: "Usman", marks: 45 },
  ];

  const getGrade = (marks: number) => {
    if (marks >= 90) return "A";
    if (marks >= 80) return "B";
    if (marks >= 70) return "C";
    if (marks >= 60) return "D";
    if (marks >= 50) return "E";
    return "F";
  };

  return (
    <div>
      <h1>Student Grades</h1>

      {students.map((student) => (
        <div key={student.id}>
          <h2>{student.name}</h2>
          <p>Marks: {student.marks}</p>
          <p>Grade: {getGrade(student.marks)}</p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;