import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import AppSearch from '../components/AppSearch'

test('search input fire change after debounce', async () => {
  const handleSearch = jest.fn()
  render(<AppSearch handleSearch={handleSearch} debounceTime={300} />)
  await fireEvent.change(screen.getByTestId('search'), {
    target: { value: 'timescale' },
  })
  await waitFor(() => expect(handleSearch).toHaveBeenCalledTimes(1))
  expect(handleSearch).toHaveBeenCalledWith('timescale')
})

test('search input value is accurate', async () => {
  const handleSearch = jest.fn()
  render(<AppSearch handleSearch={handleSearch} />)
  const input = screen.getByTestId('search') as HTMLInputElement
  userEvent.type(input, 'timescale')
  expect(input.value).toBe('timescale')
})