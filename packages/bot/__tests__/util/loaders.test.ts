import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadStructures } from '../../src/util/loaders';

const __dirname = dirname(fileURLToPath(import.meta.url));
const testDir = join(__dirname, 'test-structures');

describe('Loaders', () => {
	beforeEach(async () => {
		await mkdir(testDir, { recursive: true });
	});

	afterEach(async () => {
		try {
			await rm(testDir, { recursive: true, force: true });
		} catch (error) {
		}
	});

	it('should throw error if directory does not exist', async () => {
		const nonExistentDir = join(testDir, 'nonexistent');

		await expect(loadStructures(nonExistentDir, (s): s is any => true)).rejects.toThrow();
	});

	it('should return empty array if no valid structures found', async () => {
		await writeFile(join(testDir, 'dummy.mjs'), 'export default { invalid: true };');

		const predicate = (s: any): s is any => s.isValid === true;
		const result = await loadStructures(testDir, predicate, false);

		expect(result).toEqual([]);
	});

	it('should load valid structures', async () => {
		await writeFile(join(testDir, 'valid.mjs'), 'export default { isValid: true, name: "test" };');

		const predicate = (s: any): s is any => s.isValid === true;
		const result = await loadStructures(testDir, predicate, false);

		expect(result).toHaveLength(1);
		expect(result[0]).toEqual({ isValid: true, name: 'test' });
	});

	it('should skip index files', async () => {
		await writeFile(join(testDir, 'index.mjs'), 'export default { isValid: true };');
		await writeFile(join(testDir, 'other.mjs'), 'export default { isValid: true };');

		const predicate = (s: any): s is any => s.isValid === true;
		const result = await loadStructures(testDir, predicate, false);

		expect(result).toHaveLength(1);
	});
});
