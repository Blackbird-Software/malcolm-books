import {extname} from 'path';

export const editFileName = (req, file, callback) => {
    const fileExtName = extname(file.originalname);
    const randomName = Array(48)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    const currentTimestamp = new Date().getTime();

    callback(null, `${randomName}_${currentTimestamp}${fileExtName}`);
};
