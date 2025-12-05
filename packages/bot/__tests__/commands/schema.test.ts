import { describe, it, expect } from 'vitest';
import { schema, predicate } from '../../src/commands/index';

describe('Command Schema', () => {
	it('should validate correct command structure', () => {
		const validCommand = {
			data: {
				name: 'test',
				description: 'Test command',
			},
			execute: async () => {
				// Command logic
			},
		};

		expect(schema.safeParse(validCommand).success).toBe(true);
		expect(predicate(validCommand)).toBe(true);
	});

	it('should reject command without data', () => {
		const invalidCommand = {
			execute: async () => {
				// Command logic
			},
		};

		expect(schema.safeParse(invalidCommand).success).toBe(false);
		expect(predicate(invalidCommand)).toBe(false);
	});

	it('should reject command without execute function', () => {
		const invalidCommand = {
			data: {
				name: 'test',
				description: 'Test command',
			},
		};

		expect(schema.safeParse(invalidCommand).success).toBe(false);
		expect(predicate(invalidCommand)).toBe(false);
	});

	it('should accept command with data containing any properties', () => {
		const commandWithExtraData = {
			data: {
				name: 'test',
				description: 'Test command',
				extra: 'property',
				nested: {
					value: 123,
				},
			},
			execute: async () => {
				// Command logic
			},
		};

		expect(schema.safeParse(commandWithExtraData).success).toBe(true);
		expect(predicate(commandWithExtraData)).toBe(true);
	});
});
