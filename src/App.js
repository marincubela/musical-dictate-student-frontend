import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './layout/Header';
import { StudentMain } from './studentPages/StudentMain';
import { StudentAssignment } from './studentPages/StudentAssignment';
import { StudentGroups } from './studentPages/StudentGroups';
import { StudentGroup } from './studentPages/StudentGroup';
import { ResultReview } from './studentPages/ResultReview';
import { ResultReviews } from './studentPages/ResultReviews';
import { LoginStudent, RegisterStudent } from './studentPages/StudentLogin';
import { Error } from "./studentPages/Error";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="" element={<StudentMain />} />

            <Route path="/student/login" element={<LoginStudent />} />
            <Route path="/student/register" element={<RegisterStudent />} />
            <Route path="/student/main" element={<StudentMain />} />

            <Route path="/student/groups" element={<StudentGroups />} />
            <Route path="/student/groups/:groupId" element={<StudentGroup />} />

            <Route path="/student/assignments/:assignmentId" element={<StudentAssignment />} />
            <Route path="/student/assignments/:assignmentId/results" element={<ResultReviews />} />
            <Route path="/student/assignments/:assignmentId/results/:solutionId" element={<ResultReview />} />
            
            <Route path="/*" element={<Error />} />
          </Routes>
        </main>
      </BrowserRouter>

    </div>
  );
}

export default App;
