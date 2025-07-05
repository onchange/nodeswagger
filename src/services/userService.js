class UserService {
    constructor() {
        this.users = [
            { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 }
        ];
        this.nextId = 3;
    }

    getAllUsers() {
        return this.users;
    }

    getUserById(id) {
        const user = this.users.find(u => u.id === id);
        if (!user) {
            const error = new Error('User not found');
            error.name = 'NotFoundError';
            throw error;
        }
        return user;
    }

    createUser(userData) {
        const newUser = {
            id: this.nextId++,
            name: userData.name,
            email: userData.email,
            age: userData.age
        };
        
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id, userData) {
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            const error = new Error('User not found');
            error.name = 'NotFoundError';
            throw error;
        }

        const user = this.users[userIndex];
        if (userData.name !== undefined) user.name = userData.name;
        if (userData.email !== undefined) user.email = userData.email;
        if (userData.age !== undefined) user.age = userData.age;

        return user;
    }

    deleteUser(id) {
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            const error = new Error('User not found');
            error.name = 'NotFoundError';
            throw error;
        }

        this.users.splice(userIndex, 1);
        return { message: 'User deleted successfully' };
    }
}

module.exports = UserService;