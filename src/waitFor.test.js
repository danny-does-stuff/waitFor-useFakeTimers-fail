import React, { useEffect, useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'

/**
 * Displays the passed `message` after `delay`
 */
function Test({ delay, message }) {
	console.log('rendering')
	const [delayedMessage, setDelayedMessage] = useState(null)
	useEffect(() => {
		setTimeout(() => {
			setDelayedMessage(message)
		}, delay)
	}, []) // Only run once

	return <h2>{delayedMessage}</h2>
}

describe('Fake Timers and waitFor and getByRole', () => {
	test('waitFor should work when used with fake timers and a long WAIT_TIME', async () => {
		jest.useFakeTimers()
		// Decrease to make it pass, increase to make it fail
		const WAIT_TIME = 800000
		const MESSAGE = 'Displayed Message'
		render(<Test delay={WAIT_TIME} message={MESSAGE} />)

		await waitFor(
			() => {
				// Use getByRole to make it fail more often, use getByText to make it pass more often
				expect(screen.getByRole('heading', { name: MESSAGE })).toBeTruthy()
				// expect(screen.getByText(MESSAGE)).toBeTruthy()
			},
			{ timeout: WAIT_TIME + 1 }
		)

		jest.useRealTimers()
	})
})
