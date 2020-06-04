import React, {useReducer} from 'react';
import axios from 'axios';
import DoctorContext from './doctorContext';
import DoctorReducer from './doctorReducer';
import {
  ADD_DOCTOR,
  GET_DOCTOR,
  UPDATE_DOCTOR,
  DELETE_DOCTOR,
  GET_ONE_DOCTOR,
} from '../type';

const DoctorState = props => {
  const initialState = {
    isAdded: '',
    isUpdated: '',
    isDeleted: '',
    doctor: [],
    oneDoctor: {},
    loading: false,
  };
  const [state, dispatch] = useReducer(DoctorReducer, initialState);
  const addDoctor = async name => {
    const res = await axios.post(
      'https://api', // api doctors
      {
        name,
      },
    );
    console.log(res.data);
    dispatch({
      type: ADD_DOCTOR,
      payload: res.data,
    });
  };

  const getDoctor = async () => {
    // setLoading();
    const res = await axios.get(
      'http://api', //api doctors
    );

    dispatch({
      type: GET_DOCTOR,
      payload: res.data,
    });
  };
  const getOneDoctor = async id => {
    const response = await axios.put(
      `https://api?user=${id}`, //api to get single doctor by id
    );
    dispatch({
      type: GET_ONE_DOCTOR,
      payload: response.data,
    });
  };

  const updateDoctor = async (id, name, newData) => {
    await axios.put(
      `https://api/${id}`, //api to update single doctor by id
      {
        name,
      },
    );
    console.log(`row ${id} has been updated`);
    // console.log(res.data);

    dispatch({
      type: UPDATE_DOCTOR,
      payload: newData,
    });
  };

  const delDoctor = async id => {
    await axios.delete(
      `http://api/${id}`, //api to delete single doctor by id
    );
    console.log(`row ${id} has been deleted`);
    // console.log(res.data);

    dispatch({
      type: DELETE_DOCTOR,
      payload: id,
    });
  };
  const setLoading = () => dispatch({type: SET_LOADING});

  return (
    <DoctorContext.Provider
      value={{
        isAdded: state.isAdded,
        isUpdated: state.isUpdated,
        isDeleted: state.isDeleted,
        loading: state.loading,
        doctor: state.doctor,
        oneDoctor: state.oneDoctor,

        getOneDoctor,
        addDoctor,
        getDoctor,
        updateDoctor,
        delDoctor,
      }}>
      {props.children}
    </DoctorContext.Provider>
  );
};
export default DoctorState;
