import { createMd5Hash } from '../../src/util/md5';

describe('md5 tests', () => {
    describe('createMd5Hash tests', () => {
        it('Should return the correct MD5 hash for an input over 64 characters', () => {
            const testInput = 'abcdef609043abcdef609043abcdef609043abcdef609043abcdef609043abcdef609043';
            expect(createMd5Hash(testInput)).toBe('f6c70624f32dc7dcf94e67bc157c9d80');
        });

        it('Should return the correct MD5 hash for an input over 119 characters', () => {
            const testInput = 'abcdef609043abcdef609043abcdef609043abcdef609043abcdef609043abcdef609043abcdef609043abcdef609043abcdef609043abcdef609043';
            expect(createMd5Hash(testInput)).toBe('b8e9cf73d30cd4e65599b8072f0edb97');
        });
    });
});
