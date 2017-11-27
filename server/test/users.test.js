const expect = require('expect');
const {Users} = require('../utils/users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users(); 
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Fam Room'
        }, {            
            id: '2',
            name: 'Julie',
            room: 'Sibs Room'
        }, {
            id: '3',
            name: 'Josh',
            room: 'Fam Room'
        }]
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: 123, 
            name: 'Jio', 
            room: 'family chat'
        }
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let userToRemove = users.removeUser('3');
        
        expect(userToRemove.id).toBe('3');
        expect(users.users.length).toBe(2);
    });

    it('it should return names for Fam Room', () => {
        let userList = users.getUserList('Fam Room');

        expect(userList).toEqual(['Mike', 'Josh']);
    });

    it('should find user', () => {
        let userID = '1';
        let user = users.getUser(userID);

        expect(user.id).toEqual(userID);
    });
})