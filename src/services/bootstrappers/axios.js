import axios from "axios"

export const bootstrapAxios = () => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL
    axios.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            switch (error.response.status) {
                case 0:
                case 500:
                    alert("Something went wrong")
                    break

                default:
                    break
            }

            return Promise.reject(error)
        }
    )
}
