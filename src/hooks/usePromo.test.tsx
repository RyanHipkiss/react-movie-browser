import { vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import usePromo from './usePromo'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const server = setupServer(
    rest.get('http://localhost:3001/promo', (req, res, ctx) => {
        return res(ctx.json([{
            title: 'This is a promo movie'
        }]))
    })
)

beforeAll(() => server.listen())
afterEach(() => {
    vi.resetAllMocks()
    server.resetHandlers()
})
afterAll(() => server.close())

describe('usePromo', () => {
    it('should return an error if the API returns a non ok response', async () => {
        server.use(
            rest.get('http://localhost:3001/promo', (req, res, ctx) => {
                return res(ctx.status(500), ctx.json({}))
            })
        )

        const { result } = renderHook(() => usePromo())

        await waitFor(() => {
            expect(result.current.promo).toStrictEqual(undefined)
            expect(result.current.promoError).toStrictEqual(new Error('Something went wrong'))
        })
    })

    it('should return a valid structure', () => {
        const { result } = renderHook(() => usePromo())
        expect(result.current).toHaveProperty('promo')
        expect(result.current).toHaveProperty('promoError')
    })

    it('should return the data when the API succeeds', async () => {
        const { result } = renderHook(() => usePromo())

        await waitFor(() => {
            expect(result.current.promo).toStrictEqual([
                { title: 'This is a promo movie'}
            ])
            expect(result.current.promoError).toBeUndefined()
        })
    })
})