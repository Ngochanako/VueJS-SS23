<template>
   <div>
    <!-- Modal delete -->
     <div v-if="modalDelete" class="modal">
        <v-card width="400" class="formModal">
            <v-card-title primary-title>         
              <div style="display: flex;justify-content: space-between;">
                 <div> Xóa sinh viên</div>
                 <v-icon @click="closeModalDelete">mdi-close</v-icon>
              </div>
            </v-card-title>
              <v-divider></v-divider>
            <v-card-text>
              <div>Bạn có chắc chắn muốn xóa sinh viên này không?</div>
           </v-card-text>
           <v-card-actions>
              <v-btn @click="confirmDelete" color="success">Đồng ý</v-btn>
           </v-card-actions>
        </v-card>
     </div>
     <!-- Modal add -->
     <div v-if="modalAdd" class="modal">
        <v-card width="400" class="formModal">
            <v-form
        @submit.prevent="confirmAdd"
        ref="form"
      >
            <v-card-title primary-title>         
              <div style="display: flex;justify-content: space-between;">
                 <div> {{typeSubmit=='add'?'Thêm mới':'Cập nhập'}}</div>
                 <v-icon @click="closeModalAdd">mdi-close</v-icon>
              </div>
            </v-card-title>
              <v-divider></v-divider>
           <v-card-text>
              <div>Tên sinh viên</div>
              <v-text-field
              density="compact"
                variant="outlined"
                v-model="student.name"
                 :rules="nameRules"
                required
              ></v-text-field>
              <div>Email</div>
              <v-text-field
              density="compact"
                variant="outlined"
                v-model="student.email"
                :rules="emailRules"
                required
              ></v-text-field>
              <div>Số điện thoại</div>
              <v-text-field
              density="compact"
                variant="outlined"
               v-model="student.phone"
            :rules="phoneRules"
               required
              ></v-text-field>
              <div>Địa chỉ</div>
              <v-text-field
              density="compact"
                variant="outlined"
                v-model="student.address"
                :rules="addressRules"
                required
              ></v-text-field>
           </v-card-text>
           
           <v-card-actions>
              <v-btn type="submit" color="success" variant="elevated" block>Đồng ý</v-btn>
           </v-card-actions>
        </v-form>
        </v-card>
     </div>
    <header>
        <div>Quản lý sinh viên</div>
        <v-btn
      append-icon="mdi-account-circle"
      color="red"
      @click="openModalAdd"
    >

      Thêm mới sinh viên

      <template v-slot:append>
        <v-icon color="warning"></v-icon>
      </template>
    </v-btn>
    </header>
    <main>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          #
        </th>
        <th class="text-left">
         Tên sinh viên
        </th>
        <th class="text-left">
         Email
        </th>
        <th class="text-left">
         Địa chỉ
        </th>
        <th class="text-left">
         Số điện thoại
        </th>
        <th class="text-left">
         Lựa chọn
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in studentsByPage"
        :key="item.name"
      >
        <td><v-checkbox></v-checkbox></td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.address }}</td>
        <td>{{ item.phone }}</td>
        <td>
            <v-row>
                <v-col><v-icon @click="editStudent(item)" color="info">mdi-pencil</v-icon></v-col>
                <v-col><v-icon @click="deleteStudent(item.id)" color="warning">mdi-delete</v-icon></v-col>
            </v-row>
        </td>
      </tr>
    </tbody>
  </v-table>
    </main>
<footer style="padding: 50px;">
    <div>
        Hiển thị 5/10 bản ghi
    </div>
    <div  v-if="pages>3" style="display: flex;justify-content: center;">
        <v-pagination
       
      v-model="currentPage"
      :length="pages"
      rounded="circle"
      class="my4"
    ></v-pagination>
    </div>
    <div v-else>
        <v-pagination
      
      v-model="currentPage"
      :length="pages"
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"
    ></v-pagination>
    </div>
    
</footer>
   </div>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted, reactive, ref, watch } from "vue";
const currentPage=ref(1);
const typeSubmit=ref('add');
const form=ref();

const nameRules=ref(
    [
        v=>!!v||'Name is required'
    ]
)
const phoneRules=ref(
    [
        v=>!!v||'Phone is required'
    ]
)
const emailRules=ref(
    [
        v=>!!v||'Email is required',
        v=>(!students.find(btn=>btn.email==v))||'Email has already been registered'
    ]
)
const addressRules=ref(
    [
        v=>!!v||'Address is required'
    ]
)
const student=reactive({
    id:'',
    name:'',
    email:'',
    address:'',
    phone:'',
    status:true,
    created_at:new Date().toLocaleString().split(',')[0].split('/').reverse().join('/')
})
const modalAdd=ref(false)
const modalDelete=ref(false);
const studentsByPage=reactive([]);
const students=reactive([])
const getAllStudentByPage=(page)=>{
    studentsByPage.length=0;
  axios
  .get(`http://localhost:3000/students?_page=${page}&_limit=1`)
  .then(res=>studentsByPage.push(...res.data))
  .catch(err=>console.log(err))
}
const getAllStudent=()=>{
    students.length=0;
  axios
  .get('http://localhost:3000/students')
  .then(res=>students.push(...res.data))
  .catch(err=>console.log(err))
}
onMounted(()=>{
    getAllStudent();
})
let pages=computed(()=>{
    
    return Math.ceil(students.length/1)||4;
});
watch(currentPage,(newCurrentPage)=>{
    getAllStudentByPage(newCurrentPage);
})
//delete student
const deleteStudent =(id)=>{
    student.id=id;
    modalDelete.value=true;
}
const removeStudentById=(id)=>{
    axios
   .delete(`http://localhost:3000/students/${id}`)
   .then(res=>console.log('Xóa sản phẩm thành công',res.data))
   .catch(err=>console.log('Không tìm thấy sản phẩm'))
}
const confirmDelete=()=>{
    removeStudentById(student.id);
    modalDelete.value=false;
    students.splice(students.findIndex(btn=>btn.id==student.id),1);
    getAllStudentByPage();
}
const closeModalDelete=()=>{
    modalDelete.value=false;
    student.id='';
}
//add new student
const resetStudent=()=>{
    student.id='';
    student.name='';
    student.email='';
    student.address='';
    student.phone='';
}
const openModalAdd=()=>{
    modalAdd.value=true;
}
const closeModalAdd=()=>{
    resetStudent();
    modalAdd.value=false;
}
const addStudent=(newStudent)=>{
    axios.post('http://localhost:3000/students',newStudent)
    .then(res=>students.push(res.data))
    .catch(err=>console.log(err))
}
const updateStudentAPI=(updatedStudent)=>{
    axios.put(`http://localhost:3000/students/${updatedStudent.id}`,updatedStudent)
    .then(res=>console.log('Cập nhật sản phẩm thành công',res.data))
    .catch(err=>console.log(err))
}
const confirmAdd=async()=>{ 
    const { valid } = await form.value.validate()
    if(!valid) {
        return;
    }
    if(typeSubmit.value=='add'){
        student.id=new Date().getTime();
        addStudent({...student});
        modalAdd.value=false;
        resetStudent();
    }else{
        editStudent(student);
        students[students.findIndex(btn=>btn.id==student.id)]={...student};
        typeSubmit.value='add';
        modalAdd.value=false;
        resetStudent();
    }
    getAllStudentByPage()
}
//edit student
const editStudent=(item)=>{
    typeSubmit.value='edit';
    modalAdd.value=true;
    student.id=item.id;
    student.name=item.name;
    student.email=item.email;
    student.address=item.address;
    student.phone=item.phone;
}
//pagination 

</script>

<style scoped>
header{
    background-color:pink;
    color: white;
    padding: 10px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.modal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}
.formModal{
    margin:auto
}
</style>