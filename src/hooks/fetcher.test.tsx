import App from "../App"
import fetcher from "./fetcher"
import { vi } from 'vitest'

describe('fetcher', () => {
    afterAll(() => vi.clearAllMocks())

    it('should send a request correctly', async () => {
        const mockFetch = vi.fn(() => Promise.resolve({
            ok: true,
            json: () => ({})
        }))
        //@ts-ignore
        global.fetch = mockFetch

        const url = 'https://example.com'
        const params = {
            foo: 'bar'
        }

        await fetcher(url, params)
        expect(mockFetch).toHaveBeenCalledWith(url, params)
    })

    it('should return the expected JSON response', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue(
                JSON.stringify({
                    message: 'success'
                })
            )
        })

        const url = 'https://example.com'
        const params = {
            foo: 'bar'
        }
        const response = await fetcher(url, params)

        expect(response).toBe(JSON.stringify({
            message: 'success'
        }))
    })

    it('should error when the api returns a non ok response', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: () => ({})
        })

        const url = 'https://example.com'
        const params = {
            foo: 'bar'
        }

        await expect(fetcher(url, params)).rejects.toThrow(new Error('Something went wrong'))
    })
})