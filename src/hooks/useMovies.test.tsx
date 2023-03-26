import { vi } from "vitest"
import { renderHook, waitFor } from '@testing-library/react'
import useMovies from "./useMovies"
import { setupServer } from 'msw/node'
import { rest } from 'msw'
const server = setupServer(
    rest.get('http://localhost:3001/movies', (req, res, ctx) => {
        return res(ctx.json([
            {
                title: 'This is my movie'
            }
        ]))
    })
)

beforeAll(() => server.listen())
afterEach(() => {
    vi.resetAllMocks()
    server.resetHandlers()
})
afterAll(() => server.close())

describe('useMovies', () => {
    it('should return an error if the API returns a non ok response', async () => {
        server.use(
            rest.get('http://localhost:3001/movies', (req, res, ctx) => {
                return res(ctx.status(500), ctx.json({}))
            })
        )

        const { result } = renderHook(() => useMovies())

        await waitFor(() => {
            expect(result.current.movies).toStrictEqual(undefined)
            expect(result.current.moviesError).toStrictEqual(new Error('Something went wrong'))
        })
    })

    it('should return a valid structure', () => {
        const { result } = renderHook(() => useMovies())
        expect(result.current).toHaveProperty('movies')
        expect(result.current).toHaveProperty('moviesError')
    })

    it('should return the data when the API succeeds', async () => {
        const { result } = renderHook(() => useMovies())

        await waitFor(() => {
            expect(result.current.movies).toStrictEqual([
                { title: 'This is my movie'}
            ])
            expect(result.current.moviesError).toBeUndefined()
        })
    })
})