
class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser (id) {
        let user = this.getUser(id); 

        if (user) {
            this.users =this.users.filter((user) => user.id !== id);
        }

        return user;
    }
    getUser (id) {
        let user = this.users.filter((user) => user.id === id)[0];

        return user;

    }
    getUserList (room) {
        //returns an array of objects
        let users = this.users.filter((user) => {
            return user.room === room;
        });
        //convert array of objects to array of strings
        let namesArry = users.map((user) => {
            return user.name;
        });

        return namesArry;
    }
}

module.exports = {Users};