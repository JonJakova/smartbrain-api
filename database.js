const database = {
    users: [
        {
            id: '1',
            name: 'jon',
            email: 'jon@gmail.com',
            password: '123',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'ren',
            email: 'ren@gmail.com',
            password: 'abc',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '123',
            hash: '',
            email: 'jon@gmail.com'
        }
    ]
};

module.exports = database;
