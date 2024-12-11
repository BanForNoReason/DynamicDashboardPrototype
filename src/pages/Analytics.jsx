import React, { useState, useEffect } from 'react';
import '../styles/Analytics.css';
import apiClient from '../utils/api';

const Analytics = () => {
    const [courses, setCourses] = useState([]); // List of available courses
    const [lectures, setLectures] = useState([]); // list of available lectures
    const [classes, setClasses] = useState([]); // list of available classes
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedLecture, setSelectedLecture] = useState(null);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [analyticsData, setAnalyticsData] = useState(null); // analytics data for the selected options we are choosing
    const [loading, setLoading] = useState([]);

    // we need to fetch all of the courses when we are mounting our component
    // fetch all the courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await apiClient.get('/courses');
                setCourses(response.data);
            } catch(error) {
                console.error('Error fetching the course:', error);
            }
        };
        fetchCourses();
    }, []);

    // Fetch the lectures whenever a course is selected for those lecture
    useEffect(() => {
        if(selectedCourse) {
            const fetchLectures = async () => {
                try {
                    const response = await apiClient.get(`/courses/${selectedCourse}/lectures`);
                    setLectures(response.data);
                } catch(error) {
                    console.error('Error fetching the lectures:', error);
                }
            }
        };
        fetchLectures();
        //returning selectedCourse lectures
    }, [selectedCourse]);

    // fetching the class group whenever we are selecting a lecture, and a specific lecture is selected
    useEffect(() => {
        if(selectedLecture) {
            const fetchClasses = async () => {
                try {
                    const response = await apiClient.get(`/lectures/${selectedLecture}/class-groups`);
                    setClasses(response.data);
                } catch(error) {
                    console.error('Error fetching the class groups:', error);
                }
            }
            fetchClasses();
        };
    }, [selectedLecture]);

    // we are fetcing the analyical data for the specific made selections
    const fetchAnalytics = async () => {
        if (!selectedCourse || !selectedLecture) {
            return;
        }
        
        setLoading(true);
        try {
            const response = await apiClient.get('/analytics', {
                params: {
                    course_id: selectedCourse,
                    lecture_id: selectedLecture,
                    class_ids: selectedClasses,
                },
            });
            setAnalyticsData(response.data);
        } catch(error) {
            console.error('error fetching analytics:', error);
            setAnalyticsData(null);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="analytics">
            <header className="analytics-header">
                <h1>Insights</h1>
            <div className="course-dropdown">
                <select onChange={(e) => setSelectedClasses(e.target.value)} value={selectedCourse || ''}>
                    <option value="" disabled>
                        Courses
                    </option>
                    {courses.map((course) => (  // we are creating an array to store the course we have chosen
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="analytics-controls">
                <select
                    onChange={(e) => setSelectedLecture(e.target.value)}
                    value={selectedLecture || ''}
                    disabled={!selectedCourse}>
                    <option value="" disabled>
                        Select Lecture
                    </option>
                    {lectures.map((lecture) => (    //we are creating an temp array to store the key and value pairs of our lectures under the course we chose
                        <option key={lecture.id} value={lecture.id}>
                            {lecture.title}
                        </option>
                    ))}
                </select>

                <select
                    multiple
                    onChange={(e) => setSelectedClasses(Array.from(e.target.selectedOptions, (opt) => opt.value))} // from the array we have created earlier, we can now select the options we want for out classes
                    disabled={!selectedLecture}>
                    
                    {classes.map((classGroup) => (
                        <option key={classGroup.id} value={classGroup.id}>
                            {classGroup.name}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={fetchAnalytics} disabled={!selectedCourse || !selectedLectures}>
                Fetch Analytics
            </button>

            </header>

            <div className="analytical-legend">
                <h3>Assesment Legend</h3>
                <ul>
                    <li>Fundemental Misunderstanding</li>
                    <li>Partial Understanding</li>
                    <li>Adequete Understanding</li>
                    <li>Proficient Understanding</li>
                    <li>Exceptional Understanding</li>
                </ul>
            </div>

            <div className="analytical-content">
                {loading && <p> Loading analytical data...</p>}
                {!loading && analyticsData ? (
                    <div>
                        <p>Attempted: {analyticsData.attempted_count}</p>
                        <p>Not Attempted: {analyticsData.not_attempted_count}</p>
                        <p>Correct: {analyticsData.correct_percentage}%</p>
                        <p>Incorrect: {analyticsData.incorrect_percentage}%</p>
                    </div>
                ) : (
                    !loading && (
                        <div>
                            <p>No analytical data available</p>
                            <small> Please select a course and a lecture to view analytics</small>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Analytics;