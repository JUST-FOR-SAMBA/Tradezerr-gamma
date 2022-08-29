import moment from 'moment';

export const RandomIndex = (max, min) => {
    let randomIndex = (Math.random() * (max - min + 1)) + min;
    return Number.parseFloat(randomIndex).toFixed(2);
}

export const sellIndex = () => {
    const index = RandomIndex(8.3, 7.9);
    return index;
}

export const buyIndex = () => {
    const index = RandomIndex(7.3, 6.9);
    return index;

}

export const changeIndex = () => {
    return (sellIndex() - buyIndex()).toFixed(2);
}
export const changeIndexPercentage = () => {
    return (changeIndex() / 10).toFixed(2);
}


export const fetchRealTimeData = async () => {
    const response = await fetch('http://172.20.10.6:7000/data')
    return response.json();
}


export const sendRandomData = async () => {
    const currentDate = new Date();
    const showDate = moment(currentDate).format('mm:ss');
    const doc = {
        time: showDate,
        bid: RandomIndex(35.65, 12.33),
    }
    await fetch('http://172.20.10.6:7000/data', {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: { 'Content-Type': 'application/json' }
    })
}