import bcrypt from 'bcryptjs'
const users=[
    {
        name:'Admin User',
        email:'admin@exmaple.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true

    },
    {
        name:'Kumar Amit',
        email:'KumarAmit@exmaple.com',
        password:bcrypt.hashSync('123456',10)

    },
    {
        name:'Amit Kumar',
        email:'AmitKumar@exmaple.com',
        password:bcrypt.hashSync('123456',10)

    },
]

export default users