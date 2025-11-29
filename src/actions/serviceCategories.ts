export const getServiceCategories = async () => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'users/service-categories/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log('service categories error', error)
        return {
        message: 'something went wrong!'
        }
    }
}

//  The getServiceCategories function is used to fetch the service categories from the API.
//  The function is an async function that returns a promise. The function makes a GET request to the service-categories endpoint of the API and returns the response data.