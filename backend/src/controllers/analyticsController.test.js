import request from 'supertest';
import app from '../src/index.js'; // the express app

describe('GET /api/analytics', () => {
    it('should return analytics data for valid input', async () => {
        const response = await request(app).get('/api/analytics').query({
            course_id: 'course_uuid',
            lecture_id: 'lecture_uuid',
            class_ids: ['class_uuid1'],
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('attempted_count');
        expect(response.body).toHaveProperty('not_attempted_count');
    });
});
