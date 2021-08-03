/* global HTMLMediaElement */

import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Video from '../Video';

describe('VideoPlayer.Video', () => {
	beforeEach(() => {
		jest.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => true);
	});

	afterEach(() => {
		HTMLMediaElement.prototype.load.mockRestore();
	});

	describe('changing sources', () => {
		test('should not render `preloadSource` when not present', () => {
			render(
				<Video data-testid="video-id" source="abc.mp4" />
			);

			const actual = screen.getByTestId('video-id').nextElementSibling;

			expect(actual).toBeNull();
		});

		test('should use the same node when adding `preloadSource`', () => {
			const {rerender} = render(
				<Video data-testid="video-id" source="abc.mp4" />
			);

			const expected = screen.getByTestId('video-id');

			rerender(
				<Video data-testid="video-id" preloadSource="def.mp4" source="abc.mp4" />
			);

			const actual = screen.getByTestId('video-id');

			expect(actual).toBe(expected);
		});

		test('should render `preloadSource` when added', () => {
			const {rerender} = render(
				<Video data-testid="video-id" source="abc.mp4" />
			);

			rerender(
				<Video data-testid="video-id" preloadSource="def.mp4" source="abc.mp4" />
			);

			const actual = screen.getByTestId('video-id').nextElementSibling;

			expect(actual).not.toBeNull();
		});

		test('should use the same node when adding `preloadSource` the same as source', () => {
			const {rerender} = render(
				<Video data-testid="video-id" source="abc.mp4" />
			);

			const expected = screen.getByTestId('video-id');

			rerender(
				<Video data-testid="video-id" preloadSource="abc.mp4" source="abc.mp4" />
			);

			const actual = screen.getByTestId('video-id');

			expect(actual).toBe(expected);
		});

		test('should swaps nodes when swapping `source` and `preloadSource`', () => {
			const {rerender} = render(
				<Video data-testid="video-id" preloadSource="def.mp4" source="abc.mp4" />
			);

			const source = screen.getByTestId('video-id');
			const preload = screen.getByTestId('video-id').nextElementSibling;

			rerender(
				<Video data-testid="video-id" preloadSource="abc.mp4" source="def.mp4" />
			);

			const newSource = screen.getByTestId('video-id');
			const newPreload = screen.getByTestId('video-id').nextElementSibling;

			expect(newSource).toBe(preload);
			expect(newPreload).toBe(source);
		});

		test('should swap nodes when preload does not exist initially', () => {
			const {rerender} = render(
				<Video data-testid="video-id" source="abc.mp4" />
			);

			const source = screen.getByTestId('video-id');

			rerender(
				<Video data-testid="video-id" preloadSource="def.mp4" source="abc.mp4" />
			);

			const preload = screen.getByTestId('video-id').nextElementSibling;

			rerender(
				<Video data-testid="video-id" preloadSource="abc.mp4" source="def.mp4" />
			);

			const newSource = screen.getByTestId('video-id');
			const newPreload = screen.getByTestId('video-id').nextElementSibling;

			expect(newSource).toBe(preload);
			expect(newPreload).toBe(source);
		});
	});
});
