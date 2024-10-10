<template>
    <div>
        <h4>Bài 2</h4>
        <v-btn @click="getStudent" color="info">Get Students</v-btn>
        <h4>Bài 3</h4>
        <v-btn @click="getStudentInfo" color="info">Get Student By Id</v-btn>
        <h4>Bài 4</h4>
        <v-btn @click="removeStudent" color="info">Remove Student By Id</v-btn>
        <h4>Bài 5</h4>
        <v-btn @click="addStudent" color="info">Add Student</v-btn>
        <h4>Bài 6</h4>
        <v-btn @click="editStudent" color="info">Update Student</v-btn>
    </div>
</template>

<script setup>
import {reactive} from 'vue'
import axios from 'axios'
const students=reactive([]);
const getAllStudent=()=>{
  axios
  .get('http://localhost:3000/students')
  .then(res=>students.push(...res.data))
  .catch(err=>console.log(err))
}
const getStudent=()=>{
    getAllStudent();
    console.log(students);   
}
const getStudentById=(id)=>{
    axios
   .get(`http://localhost:3000/students/${id}`)
   .then(res=>console.log(res.data))
   .catch(err=>console.log(err))
}

const getStudentInfo=()=>{
    getStudentById(1);
}
const removeStudentById=(id)=>{
    axios
   .delete(`http://localhost:3000/students/${id}`)
   .then(res=>console.log('Xóa sản phẩm thành công',res.data))
   .catch(err=>console.log('Không tìm thấy sản phẩm'))
}
const removeStudent=()=>{
    removeStudentById(5);
}
const addStudent=()=>{
    const newStudent={
        id:new Date().getTime(),
        name:'New Student',
        email: "john@example.com",
      address: "HN",
      phone: "0987565556",
      status: true,
      created_at: "2013-01-12"
    }
    axios.post('http://localhost:3000/students',newStudent)
    .then(res=>console.log('Thêm mới sản phẩm thành công',res.data))
    .catch(err=>console.log(err))
}

const editStudent=()=>{
    const updatedStudent={
        id: 5,
        name:'Update Student',
        email: "john@example.com",
        address: "HN",
        phone: "0987565556",
        status: true,
        created_at: "2013-01-12"
    }
    axios.put(`http://localhost:3000/students/${updatedStudent.id}`,updatedStudent)
    .then(res=>console.log('Cập nhật sản phẩm thành công',res.data))
    .catch(err=>console.log(err))
}
</script>

<style>

</style>