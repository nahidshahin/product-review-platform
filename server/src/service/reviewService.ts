import fs from 'fs';
import path from 'path';
import { ReviewsData } from '../models/review'

const initFS = (): string => {
    const dataDir = path.join(__dirname, '../data');
    const reviewsPath = path.join(dataDir, 'reviews.json');

    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }

    if (!fs.existsSync(reviewsPath)) {
        fs.writeFileSync(reviewsPath, JSON.stringify({ reviews: [] }, null, 2));
    }

    return reviewsPath;
}

export const readReviews = (): ReviewsData => {
    const reviewsPath = initFS();
    const data = fs.readFileSync(reviewsPath, 'utf-8');
    return JSON.parse(data);
};

export const writeReviews = (data: ReviewsData) => {
    const reviewsPath = initFS();
    fs.writeFileSync(reviewsPath, JSON.stringify(data, null, 2));
};
