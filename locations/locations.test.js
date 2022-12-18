const locationsService = require('./locations.service')
const Location = require('./locations.model')

jest.mock('./locations.model')

beforeEach(() => {
    jest.resetAllMocks()
})

describe('Locations FindAll', () => {
    it('Should call model find', async () => {
        Location.find.mockResolvedValue([1,2,3,4])
        expect(await locationsService.findAll()).toEqual([1,2,3,4])
        expect(Location.find).toHaveBeenCalledTimes(1)
    })
})

describe('Locations FindOne', () => {
    it('Sould get a Location', async () => {
        const mockLocation = {_id: '123456789abcde', filmName: 'Bibi le Grand'}
        Location.findById.mockResolvedValue(mockLocation)

        expect(await locationsService.findOne('123456789abcde')).toEqual(mockLocation)
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })

    it('Should not get a Location', async () => {
        const mockLocation = null
        Location.findById.mockResolvedValue(mockLocation)

        expect(async () => await locationsService.findOne('123456789abcde')).rejects.toThrow()
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })
})

describe('Locations addLocation', () => {
    it('Should add a Location', async () => {
        const mockLocation = {_id: '123456789abcde', filmName: 'Bibi le Grand'}
        Location.mockImplementation(() => {
            return {
                save: jest.fn().mockResolvedValue(mockLocation),
            }
        })
        expect(await locationsService.addLocation(mockLocation)).toEqual(mockLocation)
    })

    it('Should fail to add a Location', async () => {
        const mockLocation = null
        expect(async () => await locationsService.addLocation(mockLocation)).rejects.toThrow()
    })
})

describe('Locations deleteById', () => {
    it('Should delete a Location', async () => {
        const mockLocation = {_id: '123456789abcde', filmName: 'Bibi le Grand', remove: jest.fn().mockReturnValue(true)}
        Location.findById.mockResolvedValue(mockLocation)
        expect(await locationsService.deleteById(mockLocation._id)).toEqual(true)
    })
    
    it('Should not find the location', async () => {
        const mockLocation = null
        Location.findById.mockResolvedValue(mockLocation)
        expect(async () => await locationsService.deleteById('123456789abcde')).rejects.toThrow()
    })
})

describe('Location updateLocation', () => {
    it('Should update a Location', async () => {
        const mockLocation = {_id: '123456789abcde', filmName: 'Bibi le Grand'}
        const change = {filmName: 'Bibi le Petit'}
        Location.updateOne.mockResolvedValue(true)
        expect(await locationsService.updateLocation(mockLocation._id, change)).toEqual(true)
    })
})