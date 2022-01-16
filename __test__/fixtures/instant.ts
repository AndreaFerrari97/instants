import Moment from "moment"

function getCurrentDateTime() {
    const timestamp = "YYYYMMDD_HHmmss"
    return Moment().format(timestamp)
}

export default function makeFakeInstant(overrides?: any) {
    const instant = {
        createdOn: getCurrentDateTime(),
        fileName: 'tree.jpg',
        height: getRndInt(200),
        latitude: getRndFloatPosOrNeg(90),
        longitude: getRndFloatPosOrNeg(180),
        user: 'test',
        width: getRndInt(200),
        weight: getRndInt(1000000)
    }

    return {
        ...instant,
        ...overrides
    }
}

function getRndInt(max: number): number {
    return Math.round(Math.random() * max);
}

function getRndFloatPosOrNeg(max) {
    return Math.random() * max * (Math.round(Math.random()) ? 1 : -1)
}