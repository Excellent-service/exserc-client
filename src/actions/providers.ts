export const getServiceProviders = async ({lat, lng, category}: {lat: number, lng: number, category: string}) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `users/search/service-providers?lat=${lat}&lng=${lng}&service=${category}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log('service categories error', error)
        return {
        message: 'something went wrong!'
        }
    }
}
