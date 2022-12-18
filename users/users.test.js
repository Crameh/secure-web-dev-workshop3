const usersService = require('./users.service')
const User = require('./users.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock('./users.model')
jest.mock("jsonwebtoken")
jest.mock("bcrypt")

beforeEach(() => {
    jest.resetAllMocks()
})

describe('Users FindAll', () => {
    it('Should call model find', async () => {
        User.find.mockResolvedValue([1,2,3,4])
        expect(await usersService.findAll()).toEqual([1,2,3,4])
        expect(User.find).toHaveBeenCalledTimes(1)
    })
})

describe('Users FindOne', () => {
    it('Sould get a user', async () => {
        const mockUser = {_id: '123456789abcde', username: 'Bibi', password: 'Bibi'}
        User.findOne.mockResolvedValue(mockUser)
        expect(await usersService.findOne({_id: '123456789abcde'})).toEqual(mockUser)
        expect(User.findOne).toHaveBeenCalledTimes(1)
    })

    it('Should not get a User', async () => {
        const mockUser = null
        User.findById.mockResolvedValue(mockUser)
        expect(async () => await usersService.findOne('123456789abcde')).rejects.toThrow()
        expect(User.findOne).toHaveBeenCalledTimes(1)
    })
})

describe('Users checkPassword', () => {
    it('Should check the password', async () => {
        const mockUser = {_id: '123456789abcde', username: 'Bibi', password: 'Bibi'}
        User.findOne.mockResolvedValue(mockUser)
        bcrypt.compareSync.mockResolvedValue(true)
        expect(await usersService.checkPassword('1234', '1234')).toEqual(true)
        expect(User.findOne).toHaveBeenCalledTimes(1)
    })
})

describe('Users generateAuthTokenAndSaveUser', () => {
    it('Should get a token and save it to user', async () => {
        const mockUser = {_id: '123456789abcde', username: 'Bibi', password: 'Bibi', save: jest.fn()}
        const token = "abc.def.ghi"
        jwt.sign.mockResolvedValue(token)
        expect(await usersService.generateAuthTokenAndSaveUser(mockUser)).toEqual(token)
        expect(jwt.sign).toHaveBeenCalledTimes(1)
    })
})

describe('Users getUser', () => {
    it('Should get user', async () => {
        const mockUser = {_id: '123456789abcde', username: 'Bibi', password: 'Bibi'}
        User.findOne.mockResolvedValue(mockUser)
        expect(await usersService.getUser({_id: '123456789abcde'})).toEqual(mockUser)
        expect(User.findOne).toHaveBeenCalledTimes(1)
    })
    it('Should not get user', async () => {
        const mockUser = null
        User.findOne.mockResolvedValue(mockUser)
        expect(async () => await usersService.getUser({_id: '123456789abcde'})).rejects.toThrow()
        expect(User.findOne).toHaveBeenCalledTimes(1)
    })
})

describe('Users updateUser', () => {
    it('Should update the user', async () => {
        const mockUser = {_id: '123456789abcde', username: 'Bibi', password: 'Bibi'}
        const property = {username: 'Baba'}
        const mockUser2 = {_id: '123456789abcde', username: 'Baba', password: 'Bibi'}
        User.findOneAndUpdate.mockResolvedValue(mockUser2)
        expect(await usersService.updateUser(mockUser, property)).toEqual(mockUser2)
        expect(User.findOneAndUpdate).toHaveBeenCalledTimes(1)
    })
})

describe('Users deleteUser', () => {
    it('Should delete the user', async () => {
        const mockUser = {_id: '123456789abcde', username: 'Bibi', password: 'Bibi'}
        User.findByIdAndDelete.mockResolvedValue(true)
        expect(await usersService.deleteUser(mockUser)).toEqual("User deleted ! It is too late mate...")
        expect(User.findByIdAndDelete).toHaveBeenCalledTimes(1)
    })
})