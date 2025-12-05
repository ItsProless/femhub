import { describe, it, expect, vi } from 'vitest';
import ping from '../../src/commands/ping';

describe('Ping Command', () => {
	it('should have correct command data', () => {
		expect(ping.data.name).toBe('ping');
		expect(ping.data.description).toBe('Ping!');
	});

	it('should execute without throwing', async () => {
		const mockInteraction = {
			reply: vi.fn().mockResolvedValue(undefined),
		};

		await expect(ping.execute(mockInteraction as any)).resolves.not.toThrow();
	});

	it('should call reply with Pong!', async () => {
		const mockInteraction = {
			reply: vi.fn().mockResolvedValue(undefined),
		};

		await ping.execute(mockInteraction as any);

		expect(mockInteraction.reply).toHaveBeenCalledWith('Pong!');
	});
});
