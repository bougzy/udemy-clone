import React, {useContext, useReducer, useEffect} from "react";
import { GET_CATEGORIES, GET_COURSES, GET_SINGLE_COURSE } from "../actions";
import reducer from "../reducers/courses_reducer";
import courses from "../utils/data";
import PropTypes from "prop-types";

const initialState = {
    courses: [],
    single_course: {},
    categories: [],
}

const CoursesContext = React.createContext();

export const CoursesProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCourse = () => {
        dispatch({type: GET_COURSES, payload: courses})
    }

    const fetchSingleCourse = (id) => {
        const singleCourse = courses.find(course => course.id === id);
        dispatch({type: GET_SINGLE_COURSE, payload: singleCourse})
    }

    const fetchCategories = () => {
        const categories = [...new Set(courses.map(item => item.category))];
        dispatch({type: GET_CATEGORIES, payload: categories});
    }

    useEffect(() => {
        fetchCourse();
        fetchCategories();
    }, []);

    return (
        <CoursesContext.Provider value = {{
            ...state,
            fetchSingleCourse
        }}>
            {children}
        </CoursesContext.Provider>
    )
}

CoursesProvider.propTypes = {
    children: PropTypes.node.isRequired
  };

export const useCoursesContext = () => {
    return useContext(CoursesContext);
}