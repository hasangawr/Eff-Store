import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@test.com',
        password: bcrypt.hashSync('admin123', 10),
        isAdmin: true
    },
    {
        name: 'Test user 1',
        email: 'testU1@test.com',
        password: bcrypt.hashSync('testU123', 10)
    },
    {
        name: 'Test user 2',
        email: 'testU2@test.com',
        password: bcrypt.hashSync('testU123', 10)
    }
]

export default users