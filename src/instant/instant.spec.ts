import makeFakeInstant from '../../__test__/fixtures/instant'
import makeInstant from '.'

describe('instant', () => {
    it('must have a valid created on', () => {
        let instant = makeFakeInstant({ createdOn: null })
        expect(() => makeInstant(instant)).toThrow('Instant must have a valid created on.')
    })

    it('must have a valid file name', () => {
        let instant = makeFakeInstant({ fileName: null })
        expect(() => makeInstant(instant)).toThrow('Instant must have a valid file name.')
    })

    it('file name must have a valid format', () => {
        let instant = makeFakeInstant({ fileName: "invald.txt" })
        expect(() => makeInstant(instant)).toThrow('Instant must have a valid file name format.')
    })

    it('file name must have a valid format', () => {
        let instant = makeFakeInstant({ fileName: "invald" })
        expect(() => makeInstant(instant)).toThrow('Instant must have a valid file name format.')
    })

    it('must have a valid height', () => {
        let instant = makeFakeInstant({ height: null })
        expect(() => makeInstant(instant)).toThrow('Instant must have a valid height.')
    })

    it('must have a valid latitude', () => {
        let instant = makeFakeInstant({ latitude: null })
        expect(() => makeInstant(instant)).toThrow('Instant must have a valid latitude.')
    })

    it('must have a valid longitude', () => {
        let instant = makeFakeInstant({ longitude: null })
        expect(() => makeInstant(instant)).toThrow('Instant must have a valid longitude.')
    })

    it('must have a valid user', () => {
        let instant = makeFakeInstant({ user: null })
        expect(() => makeInstant(instant)).toThrow('Instant must have a valid user.')
    })

    it('must have a valid weight', () => {
        let instant = makeFakeInstant({ weight: null })
        expect(() => makeInstant(instant)).toThrow('Instant must have a valid weight.')
    })

    it('must have a valid width', () => {
        let instant = makeFakeInstant({ width: null })
        expect(() => makeInstant(instant)).toThrow('Instant must have a valid width.')
    })


    const instant = makeFakeInstant({})

    it('has valid created on', () => {
        expect(makeInstant(instant).getCreatedOn()).toBe(instant.createdOn)
    })

    it('has valid file name', () => {
        const mockInstant = makeInstant(instant)
        expect(mockInstant.getFileName()).toBe(instant.fileName)
    })

    it('has valid height', () => {
        expect(makeInstant(instant).getHeight()).toBe(instant.height)
    })

    it('has valid latitude', () => {
        expect(makeInstant(instant).getLatitude()).toBe(instant.latitude)
    })

    it('has valid longitude', () => {
        expect(makeInstant(instant).getLongitude()).toBe(instant.longitude)
    })

    it('has valid user', () => {
        expect(makeInstant(instant).getUser()).toBe(instant.user)
    })

    it('has valid weight', () => {
        expect(makeInstant(instant).getWeight()).toBe(instant.weight)
    })

    it('has valid width', () => {
        expect(makeInstant(instant).getWidth()).toBe(instant.width)
    })
})